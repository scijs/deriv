var deriv = require("../lib/main.js");

var g = function(x){
  return 4*Math.pow(x,2) + 3*x + 4;
}

console.log(deriv(g,3,0.1));
