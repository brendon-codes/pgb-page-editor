window.PGB     = new Object;
PGB.plg        = new Object;
PGB.utl        = new Object;
PGB.Bse        = new Function;
PGB.hlp        = new Object;
PGB.doc        = null;

/**
 * Initializer
 * 
 * @return {Int}
 */
PGB.init = function() {
    var context, i, p;
    PGB.doc = $(document);
    context = $(document.body);
    i = 0;
    for (p in PGB.plg) {
        if (PGB.plg[p] !== undefined &&
                $.isFunction(PGB.plg[p].init)) {
            PGB.plg[p].init.apply(PGB.plg[p], [context]);
            i++;
        }
    }
    return i;
};

/**
 * Gets random id
 * 
 * @param {Int} max
 * @return {Int}
 */
PGB.utl.rand = function(max){
  if (max === null || max === undefined) {
      max = 99999999;
  }
  return Math.floor(Math.random() * max);
};

/**
 * Gets data args into string
 * 
 * @param {String} str
 * @param {Object} args
 * @return {String}
 */
PGB.utl.a = function(str, args) {
  var arg, key, val, out;
  out = str;
  for(arg in args) {
    key = new RegExp("\{" + arg + "\}", "ig");
    out = out.replace(key, args[arg]);
  }
  return out;
};

/**
 * Determines if child is in parent chain
 * 
 * @param {Object[jQueryElement]} child
 * @param {Object[jQueryElement]} parent
 * @return {Bool}
 */
PGB.utl.parent = function(child, parent) {
  var c, p;
  c = child[0];
  p = parent[0];
  while (c !== undefined && c !== null) {
      if (c === p) {
          return true;
      }
      c = c.parentNode;
  }
  return false;
};

/**
 * Get event element
 * 
 * @param {Object} e
 * @return {Object[jQueryElement]}
 */
PGB.utl.et = function(e) {
    var t;
    if (e.srcElement !== undefined) {
        t = $(e.srcElement);
    }
    else if (e.target !== undefined) {
        t = $(e.target);
    }
    return t;
};

/**
 * Returns dummy data
 * 
 * @return {Int}
 */
PGB.Bse.prototype.test = function() {
    return 1;
};

$(PGB.init);