# [Backstage](https://backstage.io)

Configs:
- add .env file to root directory
- start docker desktop kubernetes cluster or change kubernetes url in app-config.production.yaml

Docker compose:
- create directory for database
- add "volumes: postgresql/data:/var/lib/postgresql/data" to docker-compose.yml

Start:
- docker compose -f .\docker\docker-compose.yml up -d