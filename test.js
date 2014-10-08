
function addRow(timediff, state, host, port) {
setTimeout (function () {
	var o = document.getElementById('scanlist');
	var item = "<li>";
	item += "<a id='btn-action-menu' href='#'>";
	item += "<p><b style='padding:5px;background-color:green;color:white'>open</b> ";
	item += "<b style='padding:5px;background-color:yellow;color:black'>"+port+"</b>&nbsp;"+host+"&nbsp;&nbsp;<em>"+timediff+"ms</em></p>";
        item += "</a>";
	item += "</li>";
	o.innerHTML += item;
}, 10);
}

function clearRows() {
	var o = document.getElementById('scanlist');
	o.innerHTML = '<ul>';
}

var isScanning = false;

function scanStart() {
	if (isScanning) {
		alert ("Please wait");
		// TODO: shall we stop scan here?
	}
	isScanning = true;
	document.getElementById ('scanbutton').innerHTML = "Scanning...";
	document.getElementById ('spinner').innerHTML = '<img src=spin.gif></img>';
}

function scanEnd() {
	isScanning = false;
	document.getElementById ('spinner').innerHTML = '';
	updateScanButton ();
}

function scanNetwork() {
	var hosts = document.getElementById('host').value
	var ports = document.getElementById('port').value

	try {
		var first = new Date().getTime();
		var options = {
			fast: true,
			known: false,
			timeout: 10000
		}
		clearRows();
		var scan = Scanner (hosts, ports, options, function (state, h, p) {
			if (state == 'open' || state =='opened'|| state =='closing') {
				//alert ("OPEN "+h+":"+p);
				var now = new Date().getTime();
				addRow (now-first,state,h,p);
			} else if (state =="done"){
				scanEnd ();
			}
		});
	} catch (e) {
		alert(e.stack);
	}
}

function updateScanButton () {
	if (isScanning)
		return;
	var hosts = document.getElementById('host').value
	var ports = document.getElementById('port').value
	// TODO: identify local lan IP address
	var b = document.getElementById ('scanbutton');
	b.innerHTML="Scan "+hosts+":"+ports;
	b.onclick = function() {
		scanStart();
		setTimeout (scanNetwork, 400);
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	updateScanButton ();
	b = document.getElementById ('scanLan');
	b.onclick = function() {
		document.getElementById('host') = '192.168.1.*';
		document.getElementById('port') = '22,23,80';
		updateScanButton();
	}
	b = document.getElementById ('optHosts');
	b.onclick = function() {
		var host = document.getElementById('host');
		var res = prompt ("Hosts", host.value);
		if (res) host.value = res;
		updateScanButton();
	}
	b = document.getElementById ('optPorts');
	b.onclick = function() {
		var port = document.getElementById('port');
		var res = prompt ("Ports", port.value);
		if (res) port.value = res;
		updateScanButton();
	}
	b = document.getElementById ('optAbout');
	b.onclick = function() {
		alert ("Portscan utility for FxOS\n"+
			"by pancake@nopcode.org");
	}
});

