/**
 * A Box element prototype
 * 
 * @constructor
 * @param {Object[PGB.plg.Edt.cmp.Box]} boxCmp
 * @param {Object[Event]} e
 */
PGB.plg.Edt.elmP.BlockElement = PGB.plg.Edt.elmP.Element.extend({
    /**
     * Properties
     */
    _selector : null,
    STACK_OFFSET : {
        SELECTOR : 1,
        RESIZE : 2
    },

    /**
     * Selects a Box element instance
     * 
     * @class PGB.plg.Edt.elmP.Box
     * @method sel
     * @return {Bool}
     */
    sel : function() {
        this._selector = $('<div>').addClass('edt-block-selector');
        this.elem.append(this._selector);
        PGB.plg.Edt.stackProcessHelper(this, this._selector,
            this.STACK_OFFSET.SELECTOR);
        this.swell();
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
        if (this._selector !== null) {
            this.stopSwell();
            this._selector.remove();
        }
        return true;
    },

    /**
     * Swell for element
     * 
     * @param {Object} elm
     */
    swell : function() {
        var _this;
        _this = this;
        this._selector.animate({
            opacity : .1
        }, 1500, function() {
            _this._swell();
            return true;
        });
        return true;
    },

    /**
     * Reverse swell for element
     */
    _swell : function() {
        var _this;
        _this = this;
        this._selector.animate({
            opacity : 1
        }, 1500, function() {
            _this.swell();
            return true;
        });
        return true;        
    },

    /**
     * Stops element swell
     * 
     * @param {Object} elm
     */
    stopSwell : function() {
        this._selector.stop(true, false);
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



