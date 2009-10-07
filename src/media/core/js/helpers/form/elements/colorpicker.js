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
            var f, cpb;
            PGB.plg.Edt.context.ColorPicker({
                flat : true,
                onChange : function(hsb, hex, rgb) {
                    //console.log(hsb, hex, rgb);
                    detCmp.action.apply(detCmp.instance, [hex]);
                    return false;
                }
            });
            cpid = PGB.plg.Edt.context.data('colorpickerId');
            _this.cpBox = $(PGB.a('#{cpid}', {cpid:cpid}));
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
        //console.log(this.cpBox);
        if (this.cpBox !== null && this.cpBox !== undefined) {
            this.cpBox.remove();
        }
        PGB.plg.Edt.context.removeData('colorpickerId');
        return true;
    }

});