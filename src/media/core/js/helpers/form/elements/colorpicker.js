
PGB.plg.Form.type.Colorpicker = PGB.plg.Form.type.Element.extend({

    /**
     * Form type remove constructor
     * 
     * @constructor
     * @param {Object} detCmp
     */
    constructor : function(detCmp) {
        var i, lbl, elm, opt;
        if (detCmp.values === undefined) {
            this.elem = null;
        }
        if ($.isFunction(detCmp.action)) {
            this.elem = null;
        }
        if (detCmp.instance === undefined) {
            detCmp.instance = window;
        }
        this.elem = $('<div>');
        if (detCmp.value !== undefined) {
            lbl = $('<span>').text(detCmp.value);
            this.elem.append(lbl);
        }
        elm = $('<div>').addClass('colorSelector');
        $(elm).ColorPicker({
            onChange : function(hsb, hex, rgb) {
                detCmp.action.apply(detCmp.instance, [rgb]);
                return false;
            }
        });
        this.elem.append(elm);
        return;
    }

});