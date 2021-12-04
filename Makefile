EXIT_ON_ERROR = set -e;

#REVISION := $(shell git rev-parse HEAD)

npm: npm-web npm-api

npm-web:
	@$(EXIT_ON_ERROR) cd web && npm install

npm-api:
	@$(EXIT_ON_ERROR) cd api && npm install

web-build: npm
	@$(EXIT_ON_ERROR) cd web && npm run build-client
	@$(EXIT_ON_ERROR) cd web && npm run prebuild
	@$(EXIT_ON_ERROR) aws s3 sync ./web/bin/ s3://my-vite-webapp/

dev: web-build
	@$(EXIT_ON_ERROR) cd web && fastly compute serve

web-deploy: web-build
	@$(EXIT_ON_ERROR) cd web && npm run deploy
