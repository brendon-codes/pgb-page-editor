PGB.include('editor', 'elements.box', 2);


PGB.plg.Edt.cmp.Box = Base.extend({

    /**
     * A new Editor component object
     * 
     * @constructor
     */
    constructor : function() {
        this.name = 'Box';
        this.id = 'box';
        return;
    },

    /**
     * Selects Box component
     * 
     * @class PGB.plg.Edt.cmp.Box
     * @method sel
     * @param {Object[Event]} e
     * @return {Bool}
     */
    sel : function() {
        var doc, _this;
        _this = this;
        this._actHandler = function(e) {
            _this.act(e);
            return false;
        };
        PGB.doc.unbind('mousedown', this._actHandler);
        PGB.doc.bind('mousedown', this._actHandler);
        return true;
    },
    
    /**
     * Deselects Box component
     * 
     * @class PGB.plg.Edt.cmp.Box
     * @method desel
     * @return {Bool}
     */
    desel : function(){
        PGB.doc.unbind('mousedown', this._actHandler);
        return true;
    },
    
    /**
     * Activate Box component
     * 
     * @class PGB.plg.Edt.cmp.Box
     * @method act
     * @param {Object[Event]} e
     * @return {Bool}
     */
    act : function(e) {
        var boxElm, selectBtn;
        boxElm = new PGB.plg.Edt.elmP.Box(this, e);
        PGB.plg.Edt.registerElm(boxElm);
        selectBtn = this.btnInstance.tbrInstance.findButton('select');
        if (selectBtn !== false) {
            selectBtn.sel();
            selectBtn._cmp.action(boxElm);
        }
        return true;
    }
    
});


