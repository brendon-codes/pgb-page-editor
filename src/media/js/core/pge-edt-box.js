
/**
 * A new Editor component object
 * 
 * @constructor
 */
PGB.plg.Edt.cmp.Box = function() {
    this.name = 'Box';
    this.id = 'box';
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
PGB.plg.Edt.cmp.Box.prototype.sel = function() {
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
PGB.plg.Edt.cmp.Box.prototype.desel = function(){
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
PGB.plg.Edt.cmp.Box.prototype.act = function(e) {
    var boxElm, selectBtn;
    boxElm = new PGB.plg.Edt.elmP.Box(this, e);
    PGB.plg.Edt.registerElm(boxElm);
    selectBtn = this.btnInstance.tbrInstance.findButton('select');
    if (selectBtn !== false) {
        selectBtn.sel();
        selectBtn._cmp.action(boxElm);
    }
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
    var x, y, w, h, r, g, b;
    this._origParent = PGB.utl.et(e);
    r = Math.floor(Math.random() * 255);
    g = Math.floor(Math.random() * 255);
    b = Math.floor(Math.random() * 255);
    w = 200;
    h = 200;
    x = (e.clientX - this._origParent[0].offsetLeft) - (w / 2);
    y = (e.clientY - this._origParent[0].offsetTop) - (h / 2);
    this.elem = $('<div><span></span></div>');
    this.elem.addClass('edt-box');
    this.elem.css({
        width : PGB.utl.a('{w}px', {w:w}),
        height : PGB.utl.a('{h}px', {h:h}),
        backgroundColor : PGB.utl.a('RGB({r},{g},{b})',{r:r,g:g,b:b}),
        position : 'absolute',
        overflow : 'hidden',
        top : y,
        left : x
    });
    this.elem.draggable({
        snap : true
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
    this.elem.resizable();
    this.elem.addClass('edt-box-active');
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
    this.elem.resizable('destroy');
    this.elem.removeClass('edt-box-active');
    return true;
};

/**
 * Sets up box element instance details
 * 
 * @class PGB.plg.Edt.elmP.Box
 * @method details
 * @return {Object}
 */
PGB.plg.Edt.elmP.Box.prototype.details = function() {
    var out;
    out = {};
    out.bgcolor = {
        type: 'select',
        values: {
            'FF0000' : 'Red',
            '00FF00' : 'Green',
            '0000FF' : 'Blue'
        },
        action: this.bgColor,
        instance: this
    };
    return out;
};

/**
 * Action to change bgColor
 * 
 * 
 */
PGB.plg.Edt.elmP.Box.prototype.bgColor = function(val) {
    this.elem.css({
        backgroundColor : PGB.utl.a('#{val}', {val:val})
    });
};

/**
 * Remove action for a box
 * 
 * @class PGB.plg.Edt.elmP.Box
 * @method _remove
 * @return {Bool}
 */
PGB.plg.Edt.elmP.Box.prototype.remove = function() {
    PGB.plg.Edt.deselectElms();
    PGB.plg.Edt.remDetails();
    PGB.plg.Edt.unregisterElm(this);
    this.elem.remove();
    delete this;
    return true;
};






