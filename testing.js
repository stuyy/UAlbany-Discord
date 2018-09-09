var request = require('request');
var fs=require("fs");

var program = {
    script : 'public class MyClass { public static void main(String args[]) { int x=10; int y=25; int z=x+y; System.out.println("Sum of x+y = " + z); }}',
    language: "java",
    versionIndex: "0",
    clientId: "e60d503c6a9ef89737854122eb13d37f",
    clientSecret:"2ac8aeb45e201e84b7f95ab8d59f613601eb3b4c851252c4e988fd2317ac96ff"
};

request({
    url: 'https://api.jdoodle.com/execute',
    method: "POST",
    json: program
},
function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
});
