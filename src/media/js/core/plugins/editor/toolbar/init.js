PGB.include('toolbar', 'button', 2);
PGB.include('toolbar', 'details', 2);
PGB.include('core', 'helpers.form', 1);
PGB.include('form', 'elements', 1);
PGB.include('form.elements', 'button', 2);
PGB.include('form.elements', 'select', 2);


PGB.plg.Edt.Tbr = Base.extend({

    /**
     * Setup the toolbar
     * 
     * @param {Object[HTMLElement]} context
     * @constructor
     */
    constructor : function(context, headText) {
        var _this;
        _this = this;
        this.tbrHead = $('<h1>');
        this.tbrHead.text(headText);
        this.tbrBodyCont = $('<div>');
        this.tbrBodyCont.addClass('edt-tbr-bdycnt');
        this.elem = $('<div>');
        this.elem.addClass('edt-tbr');
        this.elem.append(this.tbrHead);
        this.elem.append(this.tbrBodyCont);
        context.append(this.elem);
        this.elem.draggable({
            cursor : 'move',
            handle : this.tbrHead
        });
        this.elem.mousedown(function() {
           return false; 
        });
        return;
    }
    
});


