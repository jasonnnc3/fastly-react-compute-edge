EXIT_ON_ERROR = set -e;

#REVISION := $(shell git rev-parse HEAD)

npm: npm-marketingapp

npm-marketingapp:
	@$(EXIT_ON_ERROR) cd marketingapp && npm install
