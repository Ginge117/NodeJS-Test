var fs = require("fs");

function startTheThing(callback) {
    fs.readdir("./pages", function(err, contents) {
        if (err) {
            console.error(err);
        } else {
            console.log(contents);
        }
    });
}

module.exports = startTheThing;
