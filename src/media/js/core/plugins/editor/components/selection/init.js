
/**
 * A new Editor component object
 * 
 * @constructor
 */
PGB.plg.Edt.cmp.Select = Base.extend({

    constructor : function() {
        this.name = 'Select';
        this.id = 'select';
        return;
    },

    /**
     * Selects Select component
     * 
     * @class PGB.plg.Edt.cmp.Select
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
        var t, det, detElm;
        t = PGB.utl.et(e);
        elmPInstance = PGB.plg.Edt.findElm(t);
        if (elmPInstance !== false) {
            this.action(elmPInstance);
        }
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
    action : function(elmPInstance) {
        var det;
        // selection action
        if ($.isFunction(elmPInstance.sel)) {
            elmPInstance.sel();
        }
        // details action
        if ($.isFunction(elmPInstance.details)) {
            det = this.detailsDef(elmPInstance);
            det = $.extend(det, elmPInstance.details());
            //this.btnInstance.tbrInstance.addDetails(this, det);
            new PGB.plg.Edt.Tbr('Details');
        }
        return true;
    },
    
    /**
     * Gets default details items for an elmP
     * 
     * @param {Object} elmPInstance
     * @reutn {Object}
     */
    detailsDef : function(elmPInstance){
        var out;
        out = {};
        if ($.isFunction(elmPInstance.remove)) {
            out.remove = {
                type: 'button',
                value: 'Remove',
                action: elmPInstance.remove,
                instance: elmPInstance
            };
        };
        return out;
    }

});
