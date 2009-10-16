/**
 * A Box element prototype
 * 
 * @constructor
 * @param {Object[PGB.plg.Edt.cmp.Box]} boxCmp
 * @param {Object[Event]} e
 */
PGB.plg.Edt.elmP.Box = PGB.plg.Edt.elmP.Element.extend({

    constructor : function(boxCmp, e) {
        var x, y, w, h, r, g, b, o;
        this._origParent = PGB.utl.et(e);
        r = Math.floor(Math.random() * 255);
        g = Math.floor(Math.random() * 255);
        b = Math.floor(Math.random() * 255);
        w = (this._origParent.outerWidth() / 2);
        h = (this._origParent.outerHeight() / 2);
        o = this._origParent.offset();
        x = (e.clientX - o.left) - (w / 2);
        y = (e.clientY - o.top) - (h / 2);
        this.elem = $('<div><span></span></div>');
        this.elem.addClass('edt-box');
        this.elem.css({
            width : PGB.a('{w}px', {w:w}),
            height : PGB.a('{h}px', {h:h}),
            backgroundColor : PGB.a('RGB({r},{g},{b})',{r:r,g:g,b:b}),
            position : 'absolute',
            overflow : 'hidden',
            top : y,
            left : x
        });
        this.elem.draggable({
            snap : true,
            containment : 'parent',
            opacity : .9
        });
        this._origParent.append(this.elem);
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
        this.elem.resizable({
            containment : 'parent'
        });
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
        this.elem.resizable('destroy');
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
     * Available properties for the details toolbar
     * 
     * 
     */
    availActions : function() {
        var out;
        out = {};
        out.remove = {
            type: 'button',
            value: 'Remove',
            action: this.destroy,
            instance: this
        };
        /*
        out.sendBackward = {
            type : 'button',
            value : 'Send Backward',
            action : this.sendBackward,
            instance : this
        };
        */
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
    },
    
    /**
     * Remove action for a box
     * 
     * @class PGB.plg.Edt.elmP.Box
     * @method _remove
     * @return {Bool}
     */
    destroy : function(child) {
        var _this;
        _this = this;
        PGB.plg.Edt.deselectElms();
        PGB.plg.Edt.remDetails();
        // Recusively remove child elements
        (function(elm){
            var i, _i, c, d;
            for (i = 0, _i = elm.childNodes.length; i < _i; i++) {
                c = elm.childNodes[i];
                d = $(c).data('pgb');
                if (d !== undefined && d.elmPInstance !== undefined) {
                    if ($.isFunction(d.elmPInstance.destroy)) {
                        d.elmPInstance.destroy(true);
                    }
                }
                arguments.callee(c);
            }
        })(this.elem[0]);
        PGB.plg.Edt.unregisterElm(this);
        // Sub element
        if (child === true) {
            this.elem.remove();
            delete this;
        }
        // Top element
        else {
            this.elem.hide('fast', function() {
                $(this).remove();
                delete _this;
                return true;
            });
        }
        return true;
    }

});



