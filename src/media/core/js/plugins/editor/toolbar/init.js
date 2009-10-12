PGB.include('toolbar', 'button', 2);
PGB.include('toolbar', 'form', 2);
PGB.include('core', 'helpers.form', 1);
PGB.include('helpers.form', 'elements', 1);
PGB.include('form.elements', 'widget', 2);
PGB.include('form.elements', 'button', 2);
PGB.include('form.elements', 'select', 2);
PGB.include('form.elements', 'colorpicker', 2);



PGB.plg.Edt.Tbr = Base.extend({

    /**
     * Setup the toolbar
     * 
     * @param {Object[HTMLElement]} context
     * @constructor
     */
    constructor : function(headText) {
        var _this, code, coords, p;
        _this = this;
        this.tbrHead = $('<h1>');
        this.tbrHead.text(headText);
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
            bump : 'pgb_tbr',
            stop : function(event, ui) {
                PGB.plg.Edt.setTbrCoords(code,
                    ui.position.top, ui.position.left);
                return true;
            }
        });
        // Not-first time this tbr has shown
        if (coords = PGB.plg.Edt.getTbrCoords(code)) {
            this.elem.css({
                top : PGB.a('{y}px', {y:coords.top}),
                left : PGB.a('{x}px', {x:coords.left})
            });
        }
        // First time this tbr has shown
        else {
            p = this.elem.position();
            PGB.plg.Edt.setTbrCoords(code, p.top, p.left);
        }
        this.elem.mousedown(function() {
           return false; 
        });
        PGB.plg.Edt.regTbr(this);
        return;
    },

    /**
     * Sets position of new toolbar
     * 
     * 
     */
    setPosition : function() {
        var i, elm, elmBump, group;
        group = this.data('bump').group;
        for (i in PGB.plg.Edt.tbrs) {
            elm = PGB.plg.Edt.tbrs[i];
            elmBump = elm.data('bump');
            if (elmBump === undefined || group !== elmBump.group) {
                continue;
            }
            dst.Width = elm.outerWidth();
            dst.Height = elm.outerHeight();
            dst.Offset = elm.offset();
            dst.Left = dst.Offset.left;
            dst.Right = dst.Offset.left + dst.Width;
            dst.Top = dst.Offset.top;
            dst.Btm = dst.Offset.top + dst.Height;
            // Criterias  
            c[0] = (pos.Left >= dst.Left && pos.Left <= dst.Right);
            c[1] = (pos.Right >= dst.Left && pos.Right <= dst.Right);
            c[2] = (pos.Left <= dst.Left && pos.Right >= dst.Right);
            c[3] = (pos.Top >= dst.Top && pos.Top <= dst.Btm);
            c[4] = (pos.Btm >= dst.Top && pos.Btm <= dst.Btm);
            // Test
            if ((c[0] || c[1] || c[2]) && (c[3] || c[4])) {
                // Snap criteria
                if (src.Top > (dst.Btm - (dst.Height / 2))) {
                    ui.position.top -= (pos.Top - dst.Btm);
                }
                else if (src.Btm < (dst.Top + (dst.Height / 2))) {
                    ui.position.top -= (pos.Btm - dst.Top);
                }
                if (src.Left > (dst.Right - (dst.Width / 2))) {
                    ui.position.left -= (pos.Left - dst.Right);
                }
                else if (src.Right < (dst.Left + (dst.Width / 2))) {
                    ui.position.left -= (pos.Right - dst.Left);
                }
                return;
            }
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
        delete this;
        return true;
    }
    
});


