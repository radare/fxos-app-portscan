FILES=manifest.webapp img $(shell cat files)
#index.html portscan.js test.js test.html

all: shared
	rm -f portscan.zip
	zip -r portscan.zip ${FILES}

shared:
	git clone https://github.com/buildingfirefoxos/Building-Blocks.git shared
