EXIT_ON_ERROR = set -e;

#REVISION := $(shell git rev-parse HEAD)

npm: npm-web

npm-web:
	@$(EXIT_ON_ERROR) cd web && npm install

type-check: npm
	@$(EXIT_ON_ERROR) cd web && npm run type-check

web-build: npm
	@$(EXIT_ON_ERROR) cd web && npm run webpack
	@$(EXIT_ON_ERROR) aws s3 sync ./web/dist/ s3://my-vite-webapp/

dev: web-build type-check
	@$(EXIT_ON_ERROR) cd web && fastly compute serve

web-deploy: web-build type-check
	@$(EXIT_ON_ERROR) cd web && npm run deploy
