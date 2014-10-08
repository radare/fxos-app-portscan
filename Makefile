FILES=manifest.webapp img index.html portscan.js test.js test.html

all:
	rm -f portscan.zip
	zip -r portscan.zip ${FILES}
