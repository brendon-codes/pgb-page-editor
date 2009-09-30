
/**
 * Initilizes a new button on the toolbar
 * 
 * @constructor
 */
PGB.plg.Edt.Tbr.Btn = function(tItem, tbrInstance) {
    var item, btn, _this;
    _this = this;
    this.tbrInstance = tbrInstance;
    this.isSelected = false;
    if ($.isFunction(tItem)) {
        this._cmp = new tItem;
        this._cmp.btnInstance = this;
        this.elem = $('<li>');
        this.elem[0].id = PGB.a('edt-tbr-{n}', {n:this._cmp.id});
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
    if (this.tbrInstance.getActiveBtn() !== this) {
        this.tbrInstance.setActiveBtn(this);
        PGB.plg.Edt.remDetails();
        this.tbrInstance.deselectBtns();
        this.elem.addClass('tbr-btn-active');
        this._cmp.sel.apply(this._cmp);
        return true;
    }
    else {
        return false;
    }
};


/**
 * UnSelect toolbar btn
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


