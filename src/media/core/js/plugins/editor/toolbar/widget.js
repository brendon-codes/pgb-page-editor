PGB.plg.Edt.TbrWidget = PGB.plg.Edt.Tbr.extend({
    
    _cleanupCallback : null,
    _cleanupInstance : null,

    /**
     * Setup the toolbar
     * 
     * @param {Object[HTMLElement]} context
     * @constructor
     */
    constructor : function(name, bdy, width) {
        var _this;
        _this = this;
        this.base(name, {
            closeBtn : true,
            width : width
        });
        this.tbrBodyCont.html(bdy);
        return;
    },

    /**
     * Registers cleanup function
     * 
     * 
     */
    registerCleanup : function(cb, instance) {
        this._cleanupCallback = cb;
        this._cleanupInstance = instance;
        return true;
    },

    /**
     * Destroyer
     * 
     */
    destroy : function() {
        if ($.isFunction(this._cleanupCallback) &&
                this._cleanupInstance !== null) {
            this._cleanupCallback.apply(this._cleanupInstance);
        }
        this.base();
        return true;
    }

});


