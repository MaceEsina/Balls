var isNumeric = function (n) {
  return (!isNaN(parseFloat(n)) && isFinite(n)) || (n == undefined) ;
};

exports.isNumeric = isNumeric;