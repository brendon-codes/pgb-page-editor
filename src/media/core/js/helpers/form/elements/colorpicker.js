/**
 * Depends on the jquery color picker
 * 
 * @see http://www.eyecon.ro/colorpicker/
 */

PGB.plg.Form.type.Colorpicker = PGB.plg.Form.type.Element.extend({

    /**
     * Form type remove constructor
     * 
     * @constructor
     * @param {Object} detCmp
     */
    constructor : function(detCmp) {
        var i, lbl, opt, cp, _this;
        _this = this;
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
        cp = $('<div>').text('FOO');
        cp.click(function() {
            var f, cpb;
            PGB.plg.Edt.context.ColorPicker({
                flat : true,
                onChange : function(hsb, hex, rgb) {
                    //console.log(hsb, hex, rgb);
                    detCmp.action.apply(detCmp.instance, [hex]);
                    return false;
                }
            });
            f = PGB.plg.Edt.context.data('colorpickerId');
            _this.cpBox = $(PGB.a('#{cpid}', {cpid:f}));
            PGB.plg.Form.regSubWidget(_this.cpBox);
            return true;
        });
        this.elem.append(cp);
        return;
    },
    
    /**
     * Cleanup hook
     */
    cleanup : function() {
        var id, cpBox;
        //id = this._cp.data('colorpickerId');
        //cpBox = $('#' + id);
        //cpBox[0].pgbMap = {
        //    destroy : true
        //};
        return true;
    }

});