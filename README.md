# Ethereum exporter

[![](https://images.microbadger.com/badges/image/4ops/ethereum-exporter.svg)](https://hub.docker.com/r/4ops/ethereum-exporter 'View on Docker Hub') [![install size](https://packagephobia.now.sh/badge?p=ethereum-exporter)](https://packagephobia.now.sh/result?p=ethereum-exporter)

Collects statistics from parity or geth node via JSON-RPC and exports it in prometheus metrics format.

Example [metrics data](https://github.com/4ops/ethereum-exporter/blob/master/examples/).

# Compatibility

Tested with ethereum RPC clients:

- Geth `v1.8.27`
- Parity-Ethereum `v2.5.5`

# Installation

## Docker

Put in your `docker-compose.yml`

```YAML
  exporter:
    image: 4ops/ethereum-exporter:v0.1.0
    ports:
      - '9133:9133'
    environment:
      ETHEREUM_API_URL: http://geth:8545
```

See full example in [docker](https://github.com/4ops/ethereum-exporter/tree/master/examples/docker) directory.

## Kubernetes

Example spec for `ethereum-exporter` container:

```YAML
- env:
    - name: ETHEREUM_API_URL
      valueFrom:
        secretKeyRef:
          name: geth-credentials
          key: ETHEREUM_API_URL
  image: 4ops/ethereum-exporter:v0.1.0
  readinessProbe:
    httpGet:
      path: /metrics
      port: http-metrics
    timeoutSeconds: 3
    initialDelaySeconds: 5
    periodSeconds: 10
  name: metrics-exporter
  ports:
    - containerPort: 9144
      name: http-metrics
      protocol: TCP
  resources:
    requests:
      cpu: 100m
      memory: 200Mi
    limits:
      cpu: 100m
      memory: 200Mi
  securityContext:
    allowPrivilegeEscalation: false
    runAsGroup: 1000
    runAsUser: 1000
    procMount: Default
```

See full example in [kubernetes](https://github.com/4ops/ethereum-exporter/tree/master/examples/kubernetes) directory.

# Configuration

Ethereum exporter reads environments variables at startup. No more config files are required.

## Ethereum node options

- `ETHEREUM_API_URL` - path to http(s) api interface.

## Metrics options

- `METRICS_URL` - path for prometheus scrapes. Default: `/metrics`
- `METRICS_PORT` - metrics server port number. Default: `9144`
- `METRICS_PREFIX` - prefix for naming metrics. Default: `ethereum_`

## Logging

- `LOG_LEVEL` - logging verbosity level. Maybe on of: `debug`, `info`, `notice`, `warn`, `warning`, `error`.
- `LOG_TIME` - timestamp format in logs. Default - none. Any non-empty value prints timestamps (ISO 8601 format).
