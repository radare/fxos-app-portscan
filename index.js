
function addRow(timediff, state, host, port) {
	var o = document.getElementById('output');
	var str = timediff+" ("+state+") "+port+"  "+host;
	o.innerHTML += str + "<br />\n";
	//alert("pene");
}

function clearRows() {
	var o = document.getElementById('output');
	o.innerHTML = '';
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
			} else
				if (state =="done"){
					//alert("Done");
				}
		});
	} catch (e) {
		alert(e.stack);
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	var sb = document.getElementById ('scanbutton');
	sb.onclick = scanNetwork;
});
