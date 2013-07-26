SRC=$(shell find content public layouts -type f)

build: node_modules $(SRC)
	@node build
	@touch build

node_modules:
	@npm install

publish: clean build
	git clone git@github.com:hagerstown/hagerstown.github.io.git temp
	rm -rf temp/*
	cp -R build/ temp
	cd temp && git add -A && git commit -m'Build' && git push
	rm -rf temp

clean:
	rm -rf build node_modules

.PHONY: clean publish
