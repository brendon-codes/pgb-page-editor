
PGB.plg.Edt.elmP.Element = Base.extend({

    /**
     * An Element prototype
     * 
     * @constructor
     */
    constructor : function() {
        PGB.plg.Edt.registerElm(this);
        PGB.plg.Edt.stackAdd(this);
        PGB.plg.Edt.stackProcess();
        return;
    },

    /**
     * Remove action for a box
     * 
     * @class PGB.plg.Edt.elmP.Box
     * @method _remove
     * @return {Bool}
     */
    destroy : function(child) {
        PGB.plg.Edt.stackRem(this);
        if (!child) {
            PGB.plg.Edt.stackProcess();
        }
        PGB.plg.Edt.unregisterElm(this);
        return true;
    }

});
