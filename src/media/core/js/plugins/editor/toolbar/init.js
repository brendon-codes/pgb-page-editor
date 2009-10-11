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
        var _this, code, coords;
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
        if (coords = PGB.plg.Edt.getTbrCoords(code)) {
            this.elem.css({
                top : PGB.a('{y}px', {y:coords.top}),
                left : PGB.a('{x}px', {x:coords.left})
            });
        }
        this.elem.mousedown(function() {
           return false; 
        });
        PGB.plg.Edt.regTbr(this);
        return;
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


