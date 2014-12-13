var deriv = require("../lib/main.js");

x_prime = deriv(function(x){return x*x}, 3, 0.1);
console.log(x_prime)
