install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js ../../test/before.json ../../test/after.json

test:
	npm test

publish:
	npm publish

lint:
	npx eslint .
