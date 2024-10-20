# Your favorite decision maker
## Now in React and with many more options

### Deploy

Add .env file to application directory on EC2 instance.

Make 'nginx-relaod.sh' executable.
```sh
chmod +x ./scripts/nginx-reload.sh
```

Reload nginx after renewing certificate
```sh
./scripts/nginx-reload.sh
```

Run docker-compose up:
```sh
docker compose up -d
```