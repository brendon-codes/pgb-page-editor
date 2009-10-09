/**
 * Depends on the jquery color picker
 * 
 * @see http://www.eyecon.ro/colorpicker/
 */

PGB.plg.Form.type.Colorpicker = PGB.plg.Form.type.Element.extend({

    /**
     * Properties
     * 
     */
    cpBox : null,

    /**
     * Form type remove constructor
     * 
     * @constructor
     * @param {Object} detCmp
     */
    constructor : function(detCmp) {
        var i, lbl, opt, cp, _this;
        _this = this;
        this.base(detCmp);
        this.elem = $('<div>');
        if (detCmp.value !== undefined) {
            lbl = $('<span>').text(detCmp.value);
            this.elem.append(lbl);
        }
        cp = $('<div>').text('CHANGE');
        cp.click(function() {
            var f, cpb, tbr;
            _this.cpBox = $('<div>');
            _this.cpBox.ColorPicker({
                flat : true,
                onChange : function(hsb, hex, rgb) {
                    detCmp.action.apply(detCmp.instance, [hex]);
                    return false;
                }
            });
            tbr = new PGB.plg.Edt.TbrWidget('Color Picker', _this.cpBox, 360);
            tbr.registerCleanup(_this.cpCleanup, _this);
            return true;
        });
        this.elem.append(cp);
        return;
    },
    
    /**
     * Cleanup hook
     */
    cpCleanup : function() {
        this.cpBox.removeData('colorpickerId');
        return true;
    }

});