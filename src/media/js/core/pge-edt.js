PGB.plg.Edt         = new PGB.Bse;
PGB.plg.Edt.elms    = [];
PGB.plg.Edt.cmp     = {};
PGB.plg.Edt.elmP    = {};

/**
 * Editor plugin initilizaer
 * 
 * @param {Object[HTMLElement]} context
 * @return {Bool}
 */
PGB.plg.Edt.init = function(context) {
    this.toolbar = new PGB.plg.Edt.Tbr(context);
    PGB.doc.mousedown(PGB.plg.Edt.deselectElms);
    return true;
};

/**
 * Deselcts all elements on page
 * 
 * @param {Object[Event]} e
 * @return {Bool}
 */
PGB.plg.Edt.deselectElms = function(e) {
    var i, _i, t;
    if (e.srcElement !== undefined) {
        t = $(e.srcElement);
    }
    else if (e.target !== undefined) {
        t = $(e.target);
    }
    e.preventDefault();
    e.stopPropagation();
    for (i = 0, _i = PGB.plg.Edt.elms.length; i < _i; i++) {
        if ($.isFunction(PGB.plg.Edt.elms[i].desel)) {
            //console.log(t[0], PGB.plg.Edt.elms[i].elem);
            if (!PGB.utl.parent(t, PGB.plg.Edt.elms[i].elem)) {
                PGB.plg.Edt.elms[i].desel();
            }
        }
    }
    return true;
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
 * Registers an drawn element
 * 
 * @param {Object[PGB.plg.Edt.elmP.Box]} elmPInstance
 * @return {Int}
 */
PGB.plg.Edt.registerElm = function(elmPInstance) {
    PGB.plg.Edt.elms[PGB.plg.Edt.elms.length] = elmPInstance;
    return PGB.plg.Edt.elms.length;
};

/**
 * Setup the toolbar
 * 
 * @param {Object[HTMLElement]} context
 * @constructor
 */
PGB.plg.Edt.Tbr = function(context) {
    var tbr, btn, item, tbrBody, tbrHead;
    tbrHead = $('<h1>');
    tbrHead.text('Tools');
    tbrBody = $('<ul>');
    for (t in PGB.plg.Edt.cmp) {
        item = $('<li>');
        item[0].id = PGB.utl.a('edt-tbr-{n}', {n:t.toLowerCase()});
        if ($.isFunction(PGB.plg.Edt.cmp[t])) {
            btn = new PGB.plg.Edt.cmp[t];
            if (btn.name !== undefined) {
                item.text(btn.name);
                if ($.isFunction(btn.sel)) {
                    item.click(function(e){
                        btn.sel.apply(btn, [e]);
                    });
                }
                tbrBody.append(item);
            }
        }
    }
    tbr = $('<div>');
    tbr[0].id = 'edt-tbr';
    tbr.append(tbrHead).append(tbrBody);
    context.append(tbr);
    tbr.draggable({
        cursor : 'move',
        handle : tbrHead
    });
    this._tbr = tbr;
    return;
};


