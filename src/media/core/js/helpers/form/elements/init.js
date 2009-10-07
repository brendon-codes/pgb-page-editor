
PGB.plg.Form.type.Element = Base.extend({

    /**
     * Form type remove constructor
     * 
     * @constructor
     * @param {Object} detCmp
     */
    constructor : function(detCmp) {
        if (detCmp.values === undefined) {
            this.elem = null;
        }
        if ($.isFunction(detCmp.action)) {
            this.elem = null;
        }
        if (detCmp.instance === undefined) {
            detCmp.instance = window;
        }
        return;
    }
    
});
