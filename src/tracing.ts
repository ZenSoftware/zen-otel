import { NodeTracerProvider } from '@opentelemetry/node';
import { SimpleSpanProcessor } from '@opentelemetry/tracing';
import { Resource } from '@opentelemetry/resources';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

registerInstrumentations({
  instrumentations: [new HttpInstrumentation() as any, new ExpressInstrumentation()],
});

const provider = new NodeTracerProvider({
  resource: Resource.default().merge(
    new Resource({
      'service.name': 'zen-optel',
    })
  ),
});

const zipkinExporter = new ZipkinExporter({ serviceName: 'zen-optel' });

provider.addSpanProcessor(new SimpleSpanProcessor(zipkinExporter));

provider.register();

console.log('Started OpenTelemetry...');
