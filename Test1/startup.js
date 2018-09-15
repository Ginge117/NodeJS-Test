console.log("This is a test file");
var http = require("http");
var fs = require("fs");
http.createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    var file = fs.createReadStream("/home/ec2-user/environment/NodeJS-Test/Test1/startup.js");
    file.pipe(res);
    file.on("end", function() {
        res.close;
    });
}).listen(process.env.PORT, process.env.IP);
console.log("Server Started!");
console.log("Location :" + process.env.IP + ":" + process.env.PORT);


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
