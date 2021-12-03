EXIT_ON_ERROR = set -e;

#REVISION := $(shell git rev-parse HEAD)

npm: npm-marketin

npm-marketing:
	@$(EXIT_ON_ERROR) cd marketing && npm install

npm-web:
	@$(EXIT_ON_ERROR) cd marketing && npm install
