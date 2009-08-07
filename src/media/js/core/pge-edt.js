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
            if (!PGB.utl.parent(t, PGB.plg.Edt.elms[i].elem)) {
                PGB.plg.Edt.elms[i].desel();
            }
        }
    }
    return true;
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
    var t, tbr, tbrBtn, item, tbrBody, tbrHead, _this;
    _this = this;
    this._activeBtn = null;
    this._buttons = {};
    tbrHead = $('<h1>');
    tbrHead.text('Tools');
    tbrBody = $('<ul>');
    for (t in PGB.plg.Edt.cmp) {
        tbrBtn = new PGB.plg.Edt.Tbr.Btn(PGB.plg.Edt.cmp[t], this);
        this.regButton(tbrBtn);
        tbrBody.append(tbrBtn.elem);
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

/**
 * Registers a button
 */
PGB.plg.Edt.Tbr.prototype.findButton = function(btnID) {
    return this._buttons[btnID];
};


/**
 * Deselcts all elements on page
 * 
 * @param {Object[Event]} e
 * @return {Bool}
 */
PGB.plg.Edt.Tbr.prototype.deselectBtns = function(e) {
    var i, _i, t;
    for (i in this._buttons) {
        if ($.isFunction(this._buttons[i].desel)) {
            this._buttons[i].desel();
        }
    }
    return true;
};

/**
 * Registers a button
 */
PGB.plg.Edt.Tbr.prototype.regButton = function(tbrBtn) {
    this._buttons[tbrBtn._cmp.id] = tbrBtn;
    return tbrBtn._cmp.id;
};

/**
 * Initilizes a new button on the toolbar
 * 
 * @constructor
 */
PGB.plg.Edt.Tbr.Btn = function(tItem, tbrInstance) {
    var item, btn, _this;
    _this = this;
    this.tbrInstance = tbrInstance;
    if ($.isFunction(tItem)) {
        this._cmp = new tItem;
        this._cmp.btnInstance = this;
        this.elem = $('<li>');
        this.elem[0].id = PGB.utl.a('edt-tbr-{n}', {n:this._cmp.id});
        if (this._cmp.name !== undefined) {
            this.elem.text(this._cmp.name);
            if ($.isFunction(this._cmp.sel)) {
                this.elem.click(function(e){
                    _this._sel.apply(_this, [e]);
                });
            }
        }
    }
    return;
};

/**
 * Select new toolbar btn (from event)
 * 
 */
PGB.plg.Edt.Tbr.Btn.prototype._sel = function(e){
    e.preventDefault();
    e.stopPropagation();
    this.sel();
    return true;
};

/**
 * Select new toolbar btn (from event)
 * 
 */
PGB.plg.Edt.Tbr.Btn.prototype.sel = function(){
    this.tbrInstance.deselectBtns();
    this.elem.addClass('tbr-btn-active');
    this._cmp.sel.apply(this._cmp);
    return true;
};


/**
 * Select new toolbar btn
 * 
 * @constructor
 */
PGB.plg.Edt.Tbr.Btn.prototype.desel = function(e){
    this.elem.removeClass('tbr-btn-active');
    this._cmp.desel.apply(this._cmp, [e]);
};


