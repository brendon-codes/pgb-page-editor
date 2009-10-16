
PGB.plg.Edt.elmP.Element = Base.extend({

    /**
     * An Element prototype
     * 
     * @constructor
     */
    constructor : function() {
        PGB.plg.Edt.registerElm(this);
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
        PGB.plg.Edt.unregisterElm(this);
        return true;
    }

});
