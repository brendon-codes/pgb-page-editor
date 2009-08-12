
/**
 * A new Editor component object
 * 
 * @constructor
 */
PGB.plg.Edt.cmp.Select = function() {
    this.name = 'Select';
    this.id = 'select';
    return;
};

/**
 * Selects Select component
 * 
 * @class PGB.plg.Edt.cmp.Select
 * @method sel
 * @param {Object[Event]} e
 * @return {Bool}
 */
PGB.plg.Edt.cmp.Select.prototype.sel = function() {
    var doc, _this;
    _this = this;
    this._actHandler = function(e) {
        _this.act(e);
        return false;
    };
    PGB.doc.unbind('mousedown', this._actHandler);
    PGB.doc.bind('mousedown', this._actHandler);
    return true;
};

/**
 * Deselects Box component
 * 
 * @class PGB.plg.Edt.cmp.Box
 * @method desel
 * @return {Bool}
 */
PGB.plg.Edt.cmp.Select.prototype.desel = function(){
    PGB.doc.unbind('mousedown', this._actHandler);
    return true;
};

/**
 * Activate Box component
 * 
 * @class PGB.plg.Edt.cmp.Box
 * @method act
 * @param {Object[Event]} e
 * @return {Bool}
 */
PGB.plg.Edt.cmp.Select.prototype.act = function(e) {
    var t;
    t = PGB.utl.et(e);
    elmPInstance = PGB.plg.Edt.findElm(t);
    if (elmPInstance !== false) {
        if ($.isFunction(elmPInstance.sel)) {
            elmPInstance.sel();
        }
    } 
    return true;
};

