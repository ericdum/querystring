-BIN_MOCHA := ./node_modules/.bin/mocha

-TESTS := $(shell find . -type f -name 'test*')

test:
	@$(-BIN_MOCHA) \
		--reporter tap \
		$(-TESTS)
