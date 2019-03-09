install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js -f json __tests__/__fixtures__/initial/before.json __tests__/__fixtures__/initial/after.json

test:
	npm test

publish:
	npm publish

lint:
	npx eslint .
