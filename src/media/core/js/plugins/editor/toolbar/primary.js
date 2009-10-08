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
        this.elem.addClass('edt-tbr-prim');
        this._activeBtn = null;
        this._buttons = {};
        tbrBody = $('<ul>');
        for (t in PGB.plg.Edt.cmp) {
            tbrBtn = new PGB.plg.Edt.Tbr.Btn(PGB.plg.Edt.cmp[t], this);
            this.regButton(tbrBtn);
            tbrBody.append(tbrBtn.elem);
        }
        tbrBtnPrim = $('<div>');
        tbrBtnPrim.append(tbrBody);
        this.tbrBodyCont.append(tbrBtnPrim);
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


