
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
    tbr.mousedown(function() {
       return false; 
    });
    this.elem = tbr;
    return;
};

/**
 * Sets active btn
 * 
 * @param {Object[PGB.plg.Edt.Tbr.Btn]} btn
 * @param {Bool}
 */
PGB.plg.Edt.Tbr.prototype.setActiveBtn = function(btn) {
    this._activeBtn = btn;
    return true;
};

/**
 * Gets active btn
 * 
 * @return {Object[PGB.plg.Edt.Tbr.Btn]}
 */
PGB.plg.Edt.Tbr.prototype.getActiveBtn = function() {
    return this._activeBtn;
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
