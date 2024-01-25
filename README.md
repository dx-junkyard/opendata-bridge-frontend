# Opendata Bridge Frontend

Opendata bridge のフロントエンド機能を提供するシステム

## Run with Docker

```bash
$ docker build -t opendata-bridge-frontend .

$ docker run -it --env-file=.env.production.local --rm --name opendata-bridge-frontend -p 3000:3000 opendata-bridge-frontend
```
