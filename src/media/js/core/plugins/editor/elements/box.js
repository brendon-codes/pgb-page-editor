/**
 * A Box element prototype
 * 
 * @constructor
 * @param {Object[PGB.plg.Edt.cmp.Box]} boxCmp
 * @param {Object[Event]} e
 */
PGB.plg.Edt.elmP.Box = Base.extend({

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
    details : function() {
        var out;
        out = {};
        out.bgcolor = {
            type: 'select',
            value: 'BG Color',
            values: {
                'FF0000' : 'Red',
                '00FF00' : 'Green',
                '0000FF' : 'Blue'
            },
            action: this.bgColor,
            instance: this
        };
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
            backgroundColor : PGB.a('#{val}', {val:val})
        });
    },
    
    /**
     * Remove action for a box
     * 
     * @class PGB.plg.Edt.elmP.Box
     * @method _remove
     * @return {Bool}
     */
    destroy : function() {
        PGB.plg.Edt.deselectElms();
        PGB.plg.Edt.remDetails();
        // Recusively remove child elements
        (function(elm){
            var i, _i, c;
            for (i = 0, _i = elm.childNodes.length; i < _i; i++) {
                c = elm.childNodes[i];
                if (c.pgbMap !== undefined &&
                        c.pgbMap.elmPInstance !== undefined) {
                    if ($.isFunction(c.pgbMap.elmPInstance.destroy)) {
                        c.pgbMap.elmPInstance.destroy();
                    }
                }
                arguments.callee(c);
            }
        })(this.elem[0]);
        PGB.plg.Edt.unregisterElm(this);
        this.elem.remove();
        delete this;
        return true;
    }

});



