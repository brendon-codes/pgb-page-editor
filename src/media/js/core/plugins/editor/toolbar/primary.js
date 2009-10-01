PGB.plg.Edt.TbrPrim = PGB.plg.Edt.Tbr.extend({

    /**
     * Setup the toolbar
     * 
     * @param {Object[HTMLElement]} context
     * @constructor
     */
    constructor : function() {
        var _this, tbrBody, t, tbrBtn, tbrBtnPrim;
        _this = this;
        this.base('Tools');
        this._activeBtn = null;
        this._buttons = {};
        tbrBody = $('<ul>');
        for (t in PGB.plg.Edt.cmp) {
            tbrBtn = new PGB.plg.Edt.Tbr.Btn(PGB.plg.Edt.cmp[t], this);
            this.regButton(tbrBtn);
            tbrBody.append(tbrBtn.elem);
        }    
        this._detailsBox = $('<div>');
        this._detailsBox.addClass('edt-tbr-det');
        tbrBtnPrim = $('<div>');
        tbrBtnPrim.addClass('edt-tbr-prim');
        tbrBtnPrim.append(tbrBody);
        this.tbrBodyCont.append(tbrBtnPrim);
        this.tbrBodyCont.append(this._detailsBox);
        return;
    },
    
    /**
     * Sets active btn
     * 
     * @param {Object[PGB.plg.Edt.Tbr.Btn]} btn
     * @param {Bool}
     */
    setActiveBtn : function(btn) {
        this._activeBtn = btn;
        return true;
    },
    
    /**
     * Gets active btn
     * 
     * @return {Object[PGB.plg.Edt.Tbr.Btn]}
     */
    getActiveBtn : function() {
        return this._activeBtn;
    },
    
    /**
     * Adds details to toolbar
     * 
     * @param {Object[PGB.plg.Edt.cmp.FOO]} edtCmp
     * @param {Object} elm
     * @return {Bool}
     */
    addDetails : function(edtCmp, det) {
        var detForm, x, y;
        detForm = new PGB.plg.Form(det);
        this._detailsBox.html(detForm.elem);
        y = edtCmp.btnInstance.elem.position().top;
        x = -this._detailsBox.outerWidth();
        this._detailsBox.css({
            top : PGB.a('{y}px', {y:y}),
            right : PGB.a('{x}px', {x:x})
        });
        return true;
    },
    
    /**
     * Removes details from toolbar
     * 
     * @param {Object} elm
     * @return {Bool}
     */
    killDet : function() {
        this._detailsBox.empty();
        return true;
    },
    
    /**
     * Finds a button
     * 
     * @param {String} btnID
     * @return {Object[PGB.plg.Edt.Tbr.Btn]}
     */
    findButton : function(btnID) {
        if (this._buttons[btnID] === undefined) {
            return false;
        }
        else {
            return this._buttons[btnID];
        }
    },
    
    
    /**
     * Deselcts all elements on page
     * 
     * @param {Object[Event]} e
     * @return {Bool}
     */
    deselectBtns : function(e) {
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
    },
    
    /**
     * Registers a button
     * 
     * @param {Object[PGB.plg.Edt.Tbr.Btn]} tbrBtn
     * @return {String}
     */
    regButton : function(tbrBtn) {
        this._buttons[tbrBtn._cmp.id] = tbrBtn;
        return tbrBtn._cmp.id;
    }

});


