/**
 * A Box element prototype
 * 
 * @constructor
 * @param {Object[PGB.plg.Edt.cmp.Box]} boxCmp
 * @param {Object[Event]} e
 */
PGB.plg.Edt.elmP.Body = PGB.plg.Edt.elmP.Element.extend({

    constructor : function() {
        if (PGB.plg.Edt.elmP.Body._isSet) {
            throw PGB.plg.Edt.elmP.Body.ERR.SINGLETON;
            return;
        }
        else {
            PGB.plg.Edt.elmP.Body._isSet = true;
        }
        this._origParent = $(document);
        this.elem = $(document.body);
        this.elem.css({
            height : PGB.a('{h}px', {h:window.innerHeight}) 
        });
        PGB.plg.Edt.registerElm(this);
        return;
    },

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
        //console.log(this.elem.css('background-color'));
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

}, {
    
    /**
     * Static properties
     * 
     */
    _isSet : false,
    ERR : {
        SINGLETON : [
            0, 'SINGLETON',
            'Only one Body class can be created'
        ]
    }

    
});



