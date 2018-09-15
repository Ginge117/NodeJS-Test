function doAThing(val, callback) {
    var start = new Date();
    var error;
    var result;
    if (val % 2 == 0) {
        result = val * 2;
    } else {
        error = new Error("An error occured");
    }
    var timer = Math.random() * 100;
    setTimeout(callback, timer, error, result, ((new Date().getMilliseconds() + timer) - start.getMilliseconds()).toFixed(0));
}


function handleResults(error, value, time) {
    if (error) {
        console.log(error + " (" + time + "ms)");
    } else {
        console.log("Value: " + value + " (" + time + "ms)");
    }
}

function doWhatIwant(callback) {
    doAThing(1, handleResults);
    doAThing(2, handleResults);
    doAThing(3, handleResults);
    doAThing(4, handleResults);
}
