[![NPM version](https://badge.fury.io/js/deriv.svg)](http://badge.fury.io/js/deriv)
[![Build Status](https://travis-ci.org/scijs/deriv)](https://travis-ci.org/scijs/deriv)

deriv
==========

numerical derivatives of one-variable functions

# Installation and Usage

Installation via npm:
```
npm install deriv
```

Requiring the function takes one line:
```
var deriv = require("deriv");
```

Evaluating a derivative also:

```
x_prime = deriv(function(x){return x*x}, 3, 0.1);
console.log(x_prime)
```

Output:
```
{ res: 5.999999999999166, err: 0.15000000000437436 }
```

# deriv(fun, x, h, [type])

The first parameter is the function for which the derivative should be evaluated. The function should have only one parameter, expecting a numeric value. The second parameter `x` is the value at which the derivative should be calculated, whereas `h` is an appropriately chosen step size. `type` is an optional string parameter, which can take either the value `forward` or `central`. Specifically, this module implements the algorithms used in the numerical differentiation functions of the [GSL library](https://www.gnu.org/software/gsl/manual/html_node/Numerical-Differentiation-functions.html) and  described in the book "S.D. Conte and Carl de Boor, Elementary Numerical Analysis: An Algorithmic Approach, McGraw-Hill, 1972".
