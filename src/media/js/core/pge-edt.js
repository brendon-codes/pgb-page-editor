PGB.plg.Edt         = new PGB.Bse;
PGB.plg.Edt.elms    = {};
PGB.plg.Edt.tbrs    = [];
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
    PGB.plg.Edt.setMouse();
    PGB.plg.Edt.regTbr(new PGB.plg.Edt.Tbr(context));
    return true;
};

/**
 * Sets document-wide mousedown actions
 * It is important to note that for some unknown reason we cannot safely lump
 * multiple actions into one mousedown callback.
 * 
 * @return {Bool}
 */
PGB.plg.Edt.setMouse = function() {
    PGB.doc.bind('mousedown', function(e){
        if (!PGB.plg.Edt.onToolbar(e)) {
            PGB.plg.Edt.deselectElmsEvent(e);
            PGB.plg.Edt.remDetails();
        }
        return true;
    });
    return true;    
};

/**
 * Checks if event occurred on toolbar
 * 
 * @param {Object[Event]} e
 * @return {Bool}
 */
PGB.plg.Edt.onToolbar = function(e) {
    var i, _i, t, tbr;
    t = PGB.utl.et(e);
    for (i = 0, _i = PGB.plg.Edt.tbrs.length; i < _i; i++) {
        tbr = PGB.plg.Edt.tbrs[i].elem;
        if (PGB.utl.parent(t, tbr)) {
            return true;
        }
    }
    return false;    
};

/**
 * Checks if event occurred on elm (drawn elm)
 * 
 * @param {Object[Event]} e
 * @return {Bool}
 */
PGB.plg.Edt.onElms = function(e) {
    var i, t, elm;
    t = PGB.utl.et(e);
    for (i in PGB.plg.Edt.elms) {
        elm = PGB.plg.Edt.elms[i].elem;
        if (PGB.utl.parent(t, elm)) {
            return true;
        }
    }
    return false;
};


/**
 * Removes details from toolbars
 * 
 * @return {Bool}
 */
PGB.plg.Edt.remDetails = function() {
    var i, _i;
    for (i = 0, _i = PGB.plg.Edt.tbrs.length; i < _i; i++) {
        if ($.isFunction(PGB.plg.Edt.tbrs[i].killDet)) {
            PGB.plg.Edt.tbrs[i].killDet.apply(PGB.plg.Edt.tbrs[i]);
        }
    }
    return true;
};


/**
 * Registers a toolbar
 * 
 * @param {Object[PGB.plg.Edt.Tbr]} tbr
 * @return {Bool}
 */
PGB.plg.Edt.regTbr = function(tbr) {
    PGB.plg.Edt.tbrs[PGB.plg.Edt.tbrs.length] = tbr;
    return true;
};

/**
 * Fixes body height
 * 
 * @return {Bool}
 */
PGB.plg.Edt.fixBody = function() {
    document.body.style.height = PGB.utl.a('{h}px', {h:window.innerHeight});
    return true;
};

/**
 * Wrapper function for deselectin all elms
 * 
 * @return {Bool}
 */
PGB.plg.Edt.deselectElmsEvent = function(e) {
    var t;
    t = PGB.utl.et(e);
    PGB.plg.Edt.deselectElms(t);
    return false;
};

/**
 * Deselcts all elements on page
 * 
 * @param {Object[Event]} e
 * @return {Bool}
 */
PGB.plg.Edt.deselectElms = function(t) {
    var i, _i, t, exists;
    exists = (t !== null && t !== undefined);
    //console.log(PGB.plg.Edt.elms);
    for (i in PGB.plg.Edt.elms) {
        if ($.isFunction(PGB.plg.Edt.elms[i].desel)) {
            if (!exists || PGB.plg.Edt._canDesel(t, i)){
                PGB.plg.Edt.elms[i].desel();
            }
        }
    }
    return false;
};

/**
 * Determines if elm can desel
 * 
 * @param {jQueryElement} t
 * @return {Bool}
 */
PGB.plg.Edt._canDesel = function(t, i) {
    if (t[0].pgbMap !== undefined && t[0] !== PGB.plg.Edt.elms[i].elem[0]) {
        return true;
    }
    if (!PGB.utl.parent(t, PGB.plg.Edt.elms[i].elem)) {
        return true;
    }
    return false;
};

/**
 * Registers an drawn element
 * 
 * @param {Object[PGB.plg.Edt.elmP.Box]} elmPInstance
 * @return {Int}
 */
PGB.plg.Edt.unregisterElm = function(elmPInstance) {
    if (elmPInstance.regID !== undefined) {
        PGB.plg.Edt.elms[elmPInstance.regID] = undefined;
        delete PGB.plg.Edt.elms[elmPInstance.regID];
        return true;
    }
    else {
        return false;
    }
};

/**
 * Unregisters an drawn element
 * 
 * @param {Object[PGB.plg.Edt.elmP.Box]} elmPInstance
 * @return {Int}
 */
PGB.plg.Edt.registerElm = function(elmPInstance) {
    var i;
    if (elmPInstance.elem === undefined) {
        window.alert(
            'ERROR: You cannot registerElm() an object ' +
            'that does not have an "elem" property');
        return false;
    }
    else {
        i = PGB.utl.rand();
        //console.log(i);
        // Add reverse lookup
        elmPInstance.elem[0].pgbMap = {
            elmPInstance : elmPInstance
        };
        elmPInstance.regID = i;
        PGB.plg.Edt.elms[i] = elmPInstance;
        return i;
    }
};

/**
 * Finds an elm
 * 
 * @param {Object[jQuery]} elm
 * @return {Object[PGB.plg.Edt.elmP.Box]}
 * 
 */
PGB.plg.Edt.findElm = function(elm) {
    elm = elm[0];
    while (elm !== undefined && elm !== null) {
        if (elm.pgbMap !== undefined) {
            if (elm.pgbMap.elmPInstance !== undefined) {
                return elm.pgbMap.elmPInstance;
            }
        }
        elm = elm.parentNode;
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
    var t, tbr, tbrBtn, item, tbrBody, tbrHead, _this, tbrDetails;
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
    this._detailsBox = $('<div>');
    this._detailsBox.addClass('edt-tbr-det');
    tbr = $('<div>');
    tbr.addClass('edt-tbr');
    tbr.append(tbrHead).append(tbrBody);
    tbr.append(this._detailsBox);
    context.append(tbr);
    tbr.draggable({
        cursor : 'move',
        handle : tbrHead
    });
    this.elem = tbr;
    return;
};

/**
 * Adds details to toolbar
 * 
 * @param {Object} elm
 * @return {Bool}
 */
PGB.plg.Edt.Tbr.prototype.addDetails = function(det) {
    var detForm;
    detForm = new PGB.plg.Form(det);
    this._detailsBox.html(detForm.elem);
    return true;
};

/**
 * Removes details from toolbar
 * 
 * @param {Object} elm
 * @return {Bool}
 */
PGB.plg.Edt.Tbr.prototype.killDet = function() {
    this._detailsBox.empty();
    return true;
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
            PGB.plg.Edt.setMouse();
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
 * @private
 * @class PGB.plg.Edt.Tbr.Btn
 * @method _sel
 * @param {Event} e
 * @return {Bool}
 */
PGB.plg.Edt.Tbr.Btn.prototype._sel = function(e){
    this.sel();
    return false;
};

/**
 * Select new toolbar btn (from event)
 * 
 * @class PGB.plg.Edt.Tbr.Btn
 * @method sel
 * @return {Bool}
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
 * @class PGB.plg.Edt.Tbr.Btn
 * @method desel
 * @return {Bool}
 */
PGB.plg.Edt.Tbr.Btn.prototype.desel = function(e){
    this.elem.removeClass('tbr-btn-active');
    this._cmp.desel.apply(this._cmp, [e]);
    return true;
};


