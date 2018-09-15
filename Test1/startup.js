var http = require("http");
var fs = require("fs");
var mapping = fs.readFileSync("./mapping.json");
mapping = JSON.parse(mapping.toString());
mapping.maps.push(new PathMap("/firstpath", respondWithFile));
http.createServer(function(req, res) {
    mapResponse(req, res);
}).listen(process.env.PORT, process.env.IP);


console.log("Server Started!");
console.log("Location: " + process.env.IP + ":" + process.env.PORT);

function mapResponse(req, res) {
    console.log("Mapping Request: " + req.url);
    var map;
    var found = false;
    for (var i = 0; i < mapping.maps.length; i++) {
        map = mapping.maps[i];
        console.log("Adding Mapping: " + map.path);
        console.log(req.url);
        if (req.url === map.path) {
            console.log("Found");
            var found = true;
            map.method(req, res);
        }
    }
    if (!found) {
        console.log("Not Found");
        res.writeHead(404, { "Content-Type": "text/html" });
        var html = fs.createReadStream("./404.html");
        html.pipe(res);
    }
}

function readFile(filePath, callback) {
    fs.readFile(filePath, function(err, contents) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, contents);
        }
    });
}

function respondWithFile(req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    var file = fs.createReadStream("./page.html");
    file.pipe(res);
    file.on("end", function() {
        res.close;
    });
}

function PathMap(path, method) {
    this.path = path;
    this.method = method;
}
