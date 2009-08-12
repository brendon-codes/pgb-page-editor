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
    PGB.plg.Edt.fixBody();
    PGB.doc.bind('mousedown', PGB.plg.Edt.deselectElms);
    this.toolbar = new PGB.plg.Edt.Tbr(context);
    return true;
};

PGB.plg.Edt.fixBody = function() {
    document.body.style.height = PGB.utl.a('{h}px', {h:window.innerHeight});
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
    //console.log(1);
    t = PGB.utl.et(e);
    for (i = 0, _i = PGB.plg.Edt.elms.length; i < _i; i++) {
        if ($.isFunction(PGB.plg.Edt.elms[i].desel)) {
            if (
                (t[0].pgbMap !== undefined &&
                 t[0] !== PGB.plg.Edt.elms[i].elem[0]) ||
                !PGB.utl.parent(t, PGB.plg.Edt.elms[i].elem)
            ) {
                PGB.plg.Edt.elms[i].desel();
            }
        }
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
    if (elmPInstance.elem === undefined) {
        window.alert(
            'ERROR: You cannot registerElm() an object ' +
            'that does not have an "elem" property');
    }
    else {
        // Add reverse lookup
        elmPInstance.elem[0].pgbMap = {
            elmPInstance : elmPInstance
        };
    }
    PGB.plg.Edt.elms[PGB.plg.Edt.elms.length] = elmPInstance;
    return PGB.plg.Edt.elms.length;
};

/**
 * Finds an elm
 * 
 * 
 * @param {Object} elm
 */
PGB.plg.Edt.findElm = function(elm) {
    if (elm[0].pgbMap !== undefined) {
        if (elm[0].pgbMap.elmPInstance !== undefined) {
            return elm[0].pgbMap.elmPInstance;
        }
    }
    return false;
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
    tbr.mousedown(function(e) {
        return false;
    });
    this._tbr = tbr;
    return;
};

/**
 * Finds a button
 * 
 * @param {String} btnID
 * @return {Object[PGB.plg.Edt.Tbr.Btn]}
 */
PGB.plg.Edt.Tbr.prototype.findButton = function(btnID) {
    if (this._buttons[btnID] === undefined) {
        return false;
    }
    else {
        return this._buttons[btnID];
    }
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
            // Not sure why this is needed,
            // but we need to sometimes reset the document event handler
            PGB.doc.bind('mousedown', PGB.plg.Edt.deselectElms);
        }
    }
    return true;
};

/**
 * Registers a button
 * 
 * @param {Object[PGB.plg.Edt.Tbr.Btn]} tbrBtn
 * @return {String}
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
    this.sel();
    return false;
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


