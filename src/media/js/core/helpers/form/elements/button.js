
PGB.plg.Form.type.Button = PGB.plg.Form.type.Element.extend({

    /**
     * Form type remove constructor
     * 
     * @constructor
     * @param {Object} detCmp
     */
    constructor : function(detCmp) {
        if (detCmp.value === undefined) {
            this.elem = null;
        }
        if ($.isFunction(detCmp.action)) {
            this.elem = null;
        }
        if (detCmp.instance === undefined) {
            detCmp.instance = window;
        }
        this.elem = $('<input type="button" />');
        this.elem.val(detCmp.value);
        this.elem.click(function(){
            detCmp.action.apply(detCmp.instance);
            return false;
        });
        return;
    }

});