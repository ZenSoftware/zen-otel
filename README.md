```bash
# jaeger
docker run -d --name jaeger -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 -p 5775:5775/udp -p 6831:6831/udp -p 6832:6832/udp -p 5778:5778 -p 16686:16686 -p 14250:14250 -p 14268:14268 -p 14269:14269 -p 9411:9411 jaegertracing/all-in-one:1.33
```

Browse to [Jaeger](http://localhost:16686)

```bash
# zipkin
docker run -d -p 9411:9411 openzipkin/zipkin
```

Browse to [Zipkin](http://localhost:9411/)
