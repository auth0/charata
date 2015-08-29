TRANSFORMS=babelify
NODE=node
BROWSERIFY=$(node) node_modules/browserify/bin/cmd.js
BABEL=$(node) node_modules/babel/bin/babel.js
MOCHIFY=$(node) node_modules/mochify/bin/cmd.js
OUTDIR=lib
OUT=$(OUTDIR)/index.js
TESTDIR=tests
TESTFILE=$(TESTDIR)/charata.test.js
TESTOUT=$(TESTDIR)/charata.test.compiled.js

all: build

build: $(OUT)

test: build $(TESTOUT)
	$(MOCHIFY) $(TESTOUT)

$(OUT): lib/
	$(BABEL) src/index.js > $(OUT)

$(TESTOUT): lib/
	$(BABEL) $(TESTFILE) -o $(TESTOUT)

lib/:
	mkdir lib

clean:
	rm -r $(OUT) $(TESTOUT)
