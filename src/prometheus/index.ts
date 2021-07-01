import * as client from 'prom-client';
const register = new client.Registry();

const collectDefaultMetrics = client.collectDefaultMetrics;
const prefix = 'api_gateway_';
collectDefaultMetrics({ prefix });

collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP request in microseconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});

register.registerMetric(httpRequestDurationMicroseconds);

export default register;
