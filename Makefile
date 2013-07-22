SRC=$(shell find content public layouts -type f)

build: node_modules $(SRC)
	@node build
	@touch build

node_modules:
	@npm install

publish: clean build
	@rsync -azxuvh --delete --progress build <dest>

clean:
	rm -rf build node_modules

.PHONY: clean publish