FILES=manifest.webapp img index.html portscan.js test.js test.html

all: shared
	rm -f portscan.zip
	zip -r portscan.zip ${FILES}

shared:
	git clone https://github.com/buildingfirefoxos/Building-Blocks.git shared
