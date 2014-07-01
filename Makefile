FILES=manifest.webapp img index.html portscan.js

all:
	rm -f portscan.zip
	zip -r portscan.zip ${FILES}
