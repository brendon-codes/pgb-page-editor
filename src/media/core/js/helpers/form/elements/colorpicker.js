/**
 * Depends on the jquery color picker
 * 
 * @see http://www.eyecon.ro/colorpicker/
 */

PGB.plg.Form.type.Colorpicker = PGB.plg.Form.type.WidgetElement.extend({

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
        var i, lbl, opt, cp, _this, bgColor, rgb;
        _this = this;
        this.base(detCmp);
        this.elem = $('<div>');
        if (detCmp.value !== undefined) {
            lbl = $('<span>').text(detCmp.value);
            this.elem.append(lbl);
        }
        cp = $('<div><span></span></div>').addClass('pge-frm-inp-cp');
        if (detCmp.defaultValue !== undefined) {
            bgColor = detCmp.defaultValue;
        }
        else {
            bgColor = 'RGB(255,0,0)';
        }
        cp.css({backgroundColor : bgColor});
        this.regWidgetClick(cp, 'Color Picker', 360, function() {
            var f, cpb, tbr;
            this.cpBox = $('<div>');
            this.cpBox.ColorPicker({
                flat : true,
                onChange : function(hsb, hex, rgb) {
                    hex = '#' + hex;
                    detCmp.action.apply(detCmp.instance, [hex]);
                    cp.css({backgroundColor : hex});
                    return false;
                },
                color : PGB.utl.rgb(cp.css('background-color'))
            });
            return this.cpBox;
        }, this.cpCleanup);
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