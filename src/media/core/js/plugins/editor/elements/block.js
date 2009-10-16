/**
 * A Box element prototype
 * 
 * @constructor
 * @param {Object[PGB.plg.Edt.cmp.Box]} boxCmp
 * @param {Object[Event]} e
 */
PGB.plg.Edt.elmP.BlockElement = PGB.plg.Edt.elmP.Element.extend({

    /**
     * Selects a Box element instance
     * 
     * @class PGB.plg.Edt.elmP.Box
     * @method sel
     * @return {Bool}
     */
    sel : function() {
        this.elem.addClass('edt-box-active');
        return true;
    },

    /**
     * Deselects a Box element instance
     * 
     * @class PGB.plg.Edt.elmP.Box
     * @method desel
     * @return {Bool}
     */
    desel : function() {
        this.elem.removeClass('edt-box-active');
        return true;
    },

    /**
     * Sets up box element instance details
     * 
     * @class PGB.plg.Edt.elmP.Box
     * @method details
     * @return {Object}
     */
    availProps : function() {
        var out;
        out = {};
        out.bgcolor = {
            type: 'colorpicker',
            value: 'BG Color',
            defaultValue : this.elem.css('background-color'),
            action: this.bgColor,
            instance: this
        };
        return out;
    },

    /**
     * Action to change bgColor
     * 
     * 
     */
    bgColor : function(val) {
        this.elem.css({
            backgroundColor : val
        });
    }

});



