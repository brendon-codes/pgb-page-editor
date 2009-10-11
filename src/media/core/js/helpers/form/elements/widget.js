
PGB.plg.Form.type.WidgetElement = PGB.plg.Form.type.Element.extend({

    /**
     * Propeties
     * 
     */
    _active : false,
    _tbr : null,

    /**
     * Constructor
     */
    constructor : function(detCmp) {
        this.base(detCmp);
        return;
    },

    /**
     * Registers an action for a widget element
     * 
     * @param {Object} actionCB
     */
    regWidgetClick : function(btn, name, width, actionCB, cleanup) {
        var _this;
        _this = this;
        btn.click(function() {
            var wdgt;
            if (!_this.active) {
                wdgt = actionCB.apply(_this);
                _this._tbr = new PGB.plg.Edt.TbrWidget(name, wdgt, width);
                if ($.isFunction(cleanup)) {
                    _this._tbr.registerCleanup(cleanup, _this);
                }
                _this.active = true;
            }
            else {
                _this._tbr.destroy();
                _this.active = false;
            }
            return true;
        });
        return true;
    }
    
});
