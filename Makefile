EXIT_ON_ERROR = set -e;

#REVISION := $(shell git rev-parse HEAD)

npm:
	@$(EXIT_ON_ERROR) cd web && npm install

type-check: npm
	@$(EXIT_ON_ERROR) cd web && npm run type-check

build: npm
	@$(EXIT_ON_ERROR) cd web && npm run webpack
	@$(EXIT_ON_ERROR) aws s3 sync ./web/dist/ s3://my-vite-webapp/

dev: npm
	@$(EXIT_ON_ERROR) cd web && npm run dev

preview: build type-check
	@$(EXIT_ON_ERROR) cd web && fastly compute serve

deploy: build type-check
	@$(EXIT_ON_ERROR) cd web && npm run deploy
