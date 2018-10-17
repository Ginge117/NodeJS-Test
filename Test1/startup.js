var http = require("http");
var fs = require("fs");
var xmlParser = require("xml2js");


function startTheThing(callback) {
    fs.readdir("./pages", function(err, contents) {
        if (err) {
            console.error(err);
        } else {
            callback(contents);
        }
    });
}

function main() {
    startTheThing(createWebServer);
}

function createWebServer(mappings) {
    console.log(mappings);
    http.createServer(function(req, res) {
        mapResponse(req, res, mappings);
    }).listen(process.env.PORT, process.env.IP);
    console.log("Server Started!");
    console.log("Location: " + process.env.IP + ":" + process.env.PORT);
}

function mapResponse(req, res, mapping) {
    console.log("Mapping Request: " + req.url);
    var map;
    var found = false;
    for (var i = 0; i < mapping.length; i++) {
        map = mapping[i];
        console.log("Adding Mapping: " + map);
        console.log(req.url);
        if (req.url == "/" + map) {
            console.log("Found");
            var found = true;
            respondWithFile(req, res, map);
        }
    }
    if (!found) {
        console.log("Not Found");
        res.writeHead(404, { "Content-Type": "text/html" });
        var html = fs.createReadStream("./errorpages/404.html");
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

function respondWithFile(req, res, path) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    var file = fs.createReadStream("./pages/" + path);
    file.pipe(res);
    file.on("end", function() {
        res.close;
    });
}

function PathMap(path, method) {
    this.path = path;
    this.method = method;
}

main();
