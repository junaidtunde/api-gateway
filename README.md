# Microservice API Gateway
[![codecov](https://codecov.io/gh/Cars45/micro-api-gateway/branch/develop/graph/badge.svg?token=CPMAUIQRZA)](https://codecov.io/gh/Cars45/micro-api-gateway) ![Test Status](https://github.com/Cars45/micro-api-gateway/workflows/Test%20Status/badge.svg)


## Description
The  microservice start kit is based on [Nestjs](https://github.com/nestjs/nest). Nestjs Documentation can be found [here](https://docs.nestjs.com/).

### Requirements
- [Nodejs](https://nodejs.org/en/download/current/)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Micorservices
- [micro user service](#)
- [micro authorization service](#)
- [micro inventory service](#)
- [micro order service](#)
- [micro auction service](#)


## Order of starting application
The the aplication in the folowwing order
- micro inventory service
- micro user service
- micro authorization service
- micro api gatewway
