var http = require('http');
var url = require('url');
var data = {
	1111 : {
		"id":1111,
		"deviceName":"samsung galaxy s8",
		"percentage":3
	},
	2222: {
		"id":2222,
		"deviceName":"samsung note 8",
		"percentage":45
	},
	3333: {
		"id":3333,
		"deviceName":"iphone 7",
		"percentage":56
	}
};
var port = 8000


http.createServer(function (req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  res.writeHead(200, {'Content-Type': 'text/plain'});

  console.log(query.type)
  if(query.type === 'getDevices') {
	  var newData = getDevices(query)
	res.end(JSON.stringify(newData));
  } else if(query.type === 'getDevice') {
		var newData = getDevice(query);
		res.end(JSON.stringify(newData));
  }else if(query.type === 'addDevice') {
		var newData = addDevice(query);
		res.end(JSON.stringify(newData));
  }else if(query.type === 'removeDevice') {
		var newData = removeDevice(query);
		res.end(JSON.stringify(newData));
 } else {
	  saveData(query);
  	  res.end(JSON.stringify(query));
  }

}).listen(port, '127.0.0.1');
console.log(`Server running at http://127.0.0.1:${port}/`);


function getDevices(query) {
	var ids = JSON.parse(query.ids);
	var devices = [];
	for(var i = 0; i < ids.length; i++) {
		var device = data[ids[i]];
		if (device) {
			devices.push(device);
		}
	}
	return devices;
}


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

function getDevice(query) {
	var id = query.id;
	if(data[id]) {
		var device = data[id];
		return {
			id: id,
			deviceName: device.deviceName,
			percentage: device.percentage
		}
	} else {
		return {
			error: "not found"
		}
	}
}

function addDevice(query) {
	delete query.type;
	var id = query.id;
	data[id] = query;
	return query;
}

function removeDevice(query) {
	var id = query.id;
	delete data[id]
	return query;
}

