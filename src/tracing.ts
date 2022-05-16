import { NodeTracerProvider } from '@opentelemetry/node';
import { BatchSpanProcessor } from '@opentelemetry/tracing';
import { Resource } from '@opentelemetry/resources';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

export default {
  start() {
    registerInstrumentations({
      instrumentations: [new HttpInstrumentation() as any, new ExpressInstrumentation()],
    });

    const provider = new NodeTracerProvider({
      resource: Resource.default().merge(
        new Resource({
          'service.name': '@zen/api',
        })
      ),
    });

    provider.addSpanProcessor(new BatchSpanProcessor(new ZipkinExporter()));

    provider.register();

    console.log('Started OpenTelemetry...');
  },
};
