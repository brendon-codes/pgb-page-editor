
/**
 * A new Editor component object
 * 
 * @constructor
 */
PGB.plg.Edt.cmp.Box = function() {
    this.name = 'Box';
    return;
};

/**
 * Selects Box component
 * 
 * @class PGB.plg.Edt.cmp.Box
 * @method sel
 * @param {Object[Event]} e
 * @return {Bool}
 */
PGB.plg.Edt.cmp.Box.prototype.sel = function(e) {
    var doc, _this;
    _this = this;
    e.preventDefault();
    e.stopPropagation();
    this._actHandler = function(e) {
        e.preventDefault();
        e.stopPropagation();
        _this.act(e);
    };
    PGB.doc.unbind('click', this._actHandler);
    PGB.doc.bind('click', this._actHandler);
    return true;
};

/**
 * Deselects Box component
 * 
 * @class PGB.plg.Edt.cmp.Box
 * @method desel
 * @return {Bool}
 */
PGB.plg.Edt.cmp.Box.prototype.desel = function(){
    PGB.doc.unbind('click', this._actHandler);
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
PGB.plg.Edt.cmp.Box.prototype.act = function(e) {
    var boxElm;
    this.desel();
    boxElm = new PGB.plg.Edt.elmP.Box(this, e);
    PGB.plg.Edt.registerElm(boxElm);
    boxElm.sel();
    return true;
};

/**
 * A Box element prototype
 * 
 * @constructor
 * @param {Object[PGB.plg.Edt.cmp.Box]} boxCmp
 * @param {Object[Event]} e
 */
PGB.plg.Edt.elmP.Box = function(boxCmp, e) {
    var x, y, w, h;
    if (e.srcElement !== undefined) {
        this._origParent = $(e.srcElement);
    }
    else if (e.target !== undefined) {
        this._origParent = $(e.target);
    }
    w = 200;
    h = 200;
    x = (e.clientX - this._origParent[0].offsetLeft) - (w / 2);
    y = (e.clientY - this._origParent[0].offsetTop) - (h / 2);
    this.elem = $('<div><span></span></div>');
    this.elem.css({
        border : '1px solid #F00',
        backgroundColor : '#CCC',
        width : PGB.utl.a('{w}px', {w:w}),
        height : PGB.utl.a('{h}px', {h:h}),
        position : 'absolute',
        overflow : 'hidden',
        top : y,
        left : x
    });
    this._origParent.append(this.elem);
    return;
};

/**
 * Selects a Box element instance
 * 
 * @class PGB.plg.Edt.elmP.Box
 * @method sel
 * @return {Bool}
 */
PGB.plg.Edt.elmP.Box.prototype.sel = function() {
    this.elem.draggable({
        snap : true
    });
    this.elem.resizable();
    return true;
};

/**
 * Deselects a Box element instance
 * 
 * @class PGB.plg.Edt.elmP.Box
 * @method desel
 * @return {Bool}
 */
PGB.plg.Edt.elmP.Box.prototype.desel = function() {
    this.elem.draggable('destroy');
    this.elem.resizable('destroy');
    return true;
};









