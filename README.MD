## Requirements

- [Node.js](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

Clone the repository, install the dependencies.

```bash
cd <application-name>

cp .env.example .env
```

Start the application.

```bash
npm run build

npm run start # For production

npm run dev # For development
```

## Tests

```bash
npm run test
```

## Run in Docker container

```bash
docker-compose build

docker-compose --env-file .env up 
```