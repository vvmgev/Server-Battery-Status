var http = require('http');
var url = require('url');
var data = {};


http.createServer(function (req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  res.writeHead(200, {'Content-Type': 'text/plain'});

  if(query.query === 'getData') {
		var newData = getData(query);
		res.end(JSON.stringify(newData));
  } else {
	  saveData(query);
  	  res.end(JSON.stringify(query));

  }
  console.log(data);
}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');



function saveData(query) {
	var id = query.id,
		percentage = query.percentage;
	if(data[id]) {
		data[id] = percentage;
	} else {
		if(id && percentage) {
			data[id] = percentage;
		}
	}
}

function getData(query) {
	var id = query.id;
	if(data[id]) {
		var percentage = data[id];
		return {
			id: id,
			percentage: percentage
		}
	} else {
		return {
			error: "not found"
		}
	}
}
function getNewDevice(query) {
	var id = query.id;
	if(data[id]) {
		return {
			id: id,
			percentage: data[id]
		}
	} else {
		return {
			error: "not found"
		}
	}
}

