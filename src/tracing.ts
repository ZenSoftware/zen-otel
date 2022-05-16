import { NodeTracerProvider } from '@opentelemetry/node';
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/tracing';
import { Resource } from '@opentelemetry/resources';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql';

registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation() as any,
    new ExpressInstrumentation(),
    new GraphQLInstrumentation(),
  ],
});

const provider = new NodeTracerProvider({
  resource: Resource.default().merge(
    new Resource({
      'service.name': 'zen-api',
    })
  ),
});

provider.addSpanProcessor(new BatchSpanProcessor(new ZipkinExporter()));
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

provider.register();

console.log('Started OpenTelemetry...');
