PGB.plg.Edt.TbrDet = PGB.plg.Edt.Tbr.extend({

    /**
     * Setup the toolbar
     * 
     * @param {Object[HTMLElement]} context
     * @constructor
     */
    constructor : function(det) {
        var _this, detForm;
        _this = this;
        this.base('Details');
        detForm = new PGB.plg.Form(det);
        this.tbrBodyCont.html(detForm.elem);
        return;
    }


});


