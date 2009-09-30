
PGB.plg.Form.type.Select = PGB.plg.Form.type.Element.extend({

    /**
     * Form type remove constructor
     * 
     * @constructor
     * @param {Object} detCmp
     */
    constructor : function(detCmp) {
        var i, lbl;
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
        elm = $('<select>');
        for (i in detCmp.values) {
            opt = $('<option>');
            opt.val(i);
            opt.text(detCmp.values[i]);
            elm[0].add(opt[0], null);
        }
        elm.change(function() {
            var _elm;
            _elm = $(this);
            detCmp.action.apply(detCmp.instance, [_elm.val()]);
            return false;    
        });
        this.elem.append(elm);
        return;
    }

});