EXIT_ON_ERROR = set -e;

#REVISION := $(shell git rev-parse HEAD)

npm: npm-marketing npm-web

npm-marketing:
	@$(EXIT_ON_ERROR) cd marketing && npm install

npm-web:
	@$(EXIT_ON_ERROR) cd web && npm install

marketing-build: npm
	@$(EXIT_ON_ERROR) cd marketing && npm run prebuild
	@$(EXIT_ON_ERROR) aws s3 sync ./marketing/bin/ s3://my-vite-webapp/

marketing-dev: marketing-build
	@$(EXIT_ON_ERROR) cd marketing && fastly compute serve

marketing-deploy: marketing-build
	@$(EXIT_ON_ERROR) cd marketing && npm run deploy
