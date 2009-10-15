PGB.include('toolbar', 'button', 2);
PGB.include('toolbar', 'form', 2);
PGB.include('core', 'helpers.form', 1);
PGB.include('helpers.form', 'elements', 1);
PGB.include('form.elements', 'widget', 2);
PGB.include('form.elements', 'button', 2);
PGB.include('form.elements', 'select', 2);
PGB.include('form.elements', 'colorpicker', 2);



PGB.plg.Edt.Tbr = Base.extend({
    
    _active : false,

    /**
     * Setup the toolbar
     * 
     * @param {Object[HTMLElement]} context
     * @constructor
     */
    constructor : function(headText, options) {
        var _this, code, closer;
        options = $.extend({
            closeBtn : false
        }, options);
        _this = this;
        this.tbrHead = $('<h1>');
        this.tbrHead.text(headText);
        if (options.closeBtn) {
            closer = $('<div>').text('X');
            closer.addClass('edt-tbr-btn-close');
            closer.click(function() {
                if ($.isFunction(_this.constructor.destroy)) {
                    _this.constructor.destroy();
                }
                else {
                    _this.destroy();
                }
                return true;
            });
            this.tbrHead.append(closer);
        }
        this.tbrBodyCont = $('<div>');
        this.tbrBodyCont.addClass('edt-tbr-bdycnt');
        this.elem = $('<div>');
        this.elem.addClass('edt-tbr');
        this.elem.append(this.tbrHead);
        this.elem.append(this.tbrBodyCont);
        PGB.plg.Edt.context.append(this.elem);
        code = headText.replace(/[^a-z0-9]+/ig, '').toLowerCase();
        this.elem.draggable({
            cursor : 'move',
            snap : false,
            containment : PGB.plg.Edt.context,
            handle : this.tbrHead,
            // See custom plugin 'jq_plugins/ui.draggable.bump.js'
            bump : 'pgb_tbr',
            stop : function(event, ui) {
                PGB.plg.Edt.setTbrCoords(code,
                    ui.position.top, ui.position.left);
                return true;
            }
        });
        this.createPosition(code);
        this.elem.mousedown(function() {
           return false; 
        });
        PGB.plg.Edt.regTbr(this);
        this._active = true;
        return;
    },

    /**
     * create position
     */
    createPosition : function(code) {
        var coords, resetTbrPos, p;
        // Not-first time this tbr has shown
        if (coords = PGB.plg.Edt.getTbrCoords(code)) {
            // no new toolbars exist in this place
            if (this.findPosFromXY(coords.left, coords.top) !== false) {
                this.setPosition(coords.left, coords.top);
                resetTbrPos = false;
            }
            else {
                resetTbrPos = true;                
            }
        }
        // First time this tbr has shown
        else {
            resetTbrPos = true;
        }
        if (resetTbrPos) {
            // See if we can find position
            p = this.getPosition();
            if (p !== false) {
                this.setPosition(p.left, p.top);
            }
            // Go with default position
            else {
                p = this.elem.position();
            }
            PGB.plg.Edt.setTbrCoords(code, p.top, p.left);
        }
        return true;
    },

    /**
     * Sets position of new toolbar
     * 
     * 
     */
    getPosition : function() {
        var j, k, i, elm, elmBump, group, w, h, cntX, cntY, props, p,
            xVal, yVal, found, ret;
        group = this.elem.data('bump').group;
        w = this.elem.outerWidth();
        h = this.elem.outerHeight();
        cntX = Math.floor((window.innerWidth / w) / 2);
        cntY = Math.floor(window.innerHeight / h);
        // left/right
        for (p = 0; p <= 1; p++) {
            // x-axis
            for (j = 0; j < cntX; j++) {
                // Magic secret sauce
                if (p === 0) {
                    xVal = (w * j);
                }
                else {
                    xVal = window.innerWidth - (w * (j + 1));
                }
                // y-axis
                for (k = 0; k < cntY; k++) {
                    yVal = (h * k);
                    ret = this._findPosFromXY(w, h, xVal, yVal);
                    if (ret !== false) {
                        return ret;
                    }
                }
            }
        }
        return false;
    },

    /**
     * Find pos from XY
     * 
     */
    findPosFromXY : function(xVal, yVal) {
        var w, h;
        w = this.elem.outerWidth();
        h = this.elem.outerHeight();
        return this._findPosFromXY(w, h, xVal, yVal);
    },

    /**
     * Find pos from XY
     * 
     * @param {Object} w
     * @param {Object} h
     * @param {Object} xVal
     * @param {Object} yVal
     */
    _findPosFromXY : function(w, h, xVal, yVal) {
        var found, i;
        // Search all toolbars
        found = false;
        for (i in PGB.plg.Edt.tbrs) {
            if (this.findTbrPosition(
                    PGB.plg.Edt.tbrs[i], w, h,
                    xVal, yVal)) {
                found = true;
                break;
            }
        }
        // No toolbars found in this region
        if (!found) {
            return {
                left : xVal,
                top : yVal
            };
        }
        else {
            return false;
        }
    },

    /**
     * Sets position
     * 
     */
    setPosition : function(x, y) {
        //console.log(this, x, y);
        this.elem.css({
            top : PGB.a('{y}px', {y:y}),
            left : PGB.a('{x}px', {x:x})
        });
        return true;
    },

    /**
     * Helper to set position for toolbar
     * 
     * @param {Object} tbr
     * @param {Object} w
     * @param {Object} h
     * @param {Object} x
     * @param {Object} y
     */
    findTbrPosition : function(tbr, w, h, x, y) {
        var tbrBump, c, group;
        c = tbr.elem.data('pgb_coords');
        group = this.elem.data('bump').group;
        if (c === undefined) {
            c = {
                w : tbr.elem.outerWidth(),
                h : tbr.elem.outerHeight(),
                o : tbr.elem.offset()                
            };
            tbr.elem.data('pgb_coords', c);
        }
        tbrBump = tbr.elem.data('bump');
        if (tbrBump === undefined || group !== tbrBump.group) {
            return false;
        }
        return this._findTbrPosition(w, h, x, y, c);
    },
    
    /**
     * Helper to find tbr position
     * 
     */
    _findTbrPosition : function(w, h, x, y, c) {
        var dst, pos, t;
        t = [];
        //console.log(arguments, this);
        dst = {};
        dst.Width = c.w;
        dst.Height = c.h;
        dst.Left = c.o.left;
        dst.Right = c.o.left + dst.Width;
        dst.Top = c.o.top;
        dst.Btm = c.o.top + dst.Height;
        pos = {};
        pos.Width = w;
        pos.Height = h;
        pos.Left = x + 1;
        pos.Right = pos.Left + pos.Width;
        pos.Top = y + 1;
        pos.Btm = pos.Top + pos.Height;
        // Criterias  
        t[0] = (pos.Left >= dst.Left && pos.Left <= dst.Right);
        t[1] = (pos.Right >= dst.Left && pos.Right <= dst.Right);
        t[2] = (pos.Left <= dst.Left && pos.Right >= dst.Right);
        t[3] = (pos.Top >= dst.Top && pos.Top <= dst.Btm);
        t[4] = (pos.Btm >= dst.Top && pos.Btm <= dst.Btm);
        // Test
        if ((t[0] || t[1] || t[2]) && (t[3] || t[4])) {
            return true;
        }
        else {
            return false;
        }
    },

    /**
     * Destructor for this toolbar
     * 
     * @return {Bool}
     * @destructor
     */
    destroy : function() {
        PGB.plg.Edt.unregisterTbr(this);
        this.elem.remove();
        this._active = false;
        return true;
    },

    /**
     * Determines if toolbar is active
     * 
     */
    isActive : function() {
        return this._active;
    }
    
});


