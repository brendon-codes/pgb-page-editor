
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
        var t, det, detElm, elmPInstance;
        t = PGB.utl.et(e);
        elmPInstance = PGB.plg.Edt.findElm(t);
        if (elmPInstance !== false) {
            if (!PGB.plg.Edt.onActiveElm(elmPInstance)) {
                this.action(elmPInstance);
                return true;
            }
        }
        return false;
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
        var availProps, availActions, tbrDet;
        // Register active element with editor
        PGB.plg.Edt.regActiveElm(elmPInstance);
        // selection action
        if ($.isFunction(elmPInstance.sel)) {
            elmPInstance.sel();
        }
        // available properties
        if ($.isFunction(elmPInstance.availProps)) {
            availProps = elmPInstance.availProps();
            new PGB.plg.Edt.TbrForm('Properties', availProps);
        }
        // available actions
        if ($.isFunction(elmPInstance.availActions)) {
            availActions = elmPInstance.availActions();
            new PGB.plg.Edt.TbrForm('Actions', availActions);
        }
        return true;
    }

});
