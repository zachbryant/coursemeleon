class dumbreader {
readTextFile() {   
    var fs = require("fs");
    // Asynchronous read
    fs.readFile('C:\Users\rujul\temp\coursemeleon\src\assets\grades.txt', function (err, data) {
       if (err) {
        return console.error(err);
       }
    console.log("Asynchronous read: " + data.toString());
    }); 
}
}

export default dumbreader;