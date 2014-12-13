module.exports = function(){

  EPSILON = 2.2204460492503130808472633361816E-16;

  function _calcCentralDeriv(f, x, h){

    var fm1 = f(x - h);
    var fp1 = f(x + h);

    var fmh = f(x - h / 2);
    var fph = f(x + h / 2);

    var r3 = 0.5 * (fp1 - fm1);
    var r5 = (4.0 / 3.0) * (fph - fmh) - (1.0 / 3.0) * r3;

    var e3 = (Math.abs(fp1) + Math.abs(fm1)) * EPSILON;
    var e5 = 2.0 * (Math.abs(fph) + Math.abs(fmh)) * EPSILON + e3;

    var dx = Math.max(Math.abs(r3 / h), Math.abs(r5 / h)) *(Math.abs(x) / h) * EPSILON;

    ret = {};
    ret.result = r5 / h;
    ret.trunc = Math.abs((r5 - r3) / h);
    ret.round = Math.abs(e5 / h) + dx;
    return ret;
  }

  function _calcForwardDeriv(fun, x, h){

    var f1 = fun(x + h / 4.0);
    var f2 = fun(x + h / 2.0);
    var f3 = fun(x + (3.0 / 4.0) * h);
    var f4 = fun(x + h);

    var r2 = 2.0*(f4 - f2);
    var r4 = (22.0 / 3.0) * (f4 - f3) - (62.0 / 3.0) * (f3 - f2) +
      (52.0 / 3.0) * (f2 - f1);

    var e4 = 2 * 20.67 * (Math.abs(f4) + Math.abs(f3) + Math.abs(f2) + Math.abs(f1)) * EPSILON;
    var dx = Math.max(Math.abs(r2 / h), Math.abs(r4 / h)) * Math.abs(x / h) * EPSILON;

    var ret = {};
    ret.result = r4 / h;
    ret.trunc = Math.abs((r4 - r2) / h);
    ret.round = Math.abs(e4 / h) + dx;
    return ret;
  }

  function derivative(fun, x, h, type){
    var r_0, round, o;
    var type = type || "forward";

    if(type == "forward"){
      o = _calcForwardDeriv(fun, x, h);
    } else if(type == "central"){
      o = _calcCentralDeriv(fun, x, h);
    }

    r_0 = o.result
    error = o.round + o.trunc;

    if (o.round < o.trunc && (o.round > 0 && o.trunc > 0)){
        var error_opt;

        var h_opt = h * Math.pow(round / (o.trunc), 1.0 / 2.0);
        var o_opt = _calcForwardDeriv(fun, x, h_opt);
        error_opt = o_opt.round + o_opt.trunc;

        if (error_opt < error && Math.abs(o_opt.result - o.result) < 4.0 * error){
            r_0 = o_opt.result;
            error = error_opt;
          }
    }

    ret = {};
    ret.res = r_0;
    ret.err = error;
    return ret;
  }

  return derivative;
}();
