PGB.plg.Edt.TbrForm = PGB.plg.Edt.Tbr.extend({

    /**
     * Setup the toolbar
     * 
     * @param {Object[HTMLElement]} context
     * @constructor
     */
    constructor : function(name, det) {
        var _this, detForm;
        _this = this;
        this.base(name);
        this.detForm = new PGB.plg.Form(det);
        this.tbrBodyCont.html(this.detForm.elem);
        return;
    },

    /**
     * Destroy the toolbar
     * 
     * 
     */
    destroy : function() {
        this.detForm.cleanupAll();
        this.base();
    }


});


