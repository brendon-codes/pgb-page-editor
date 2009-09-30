PGB.include('core', 'helpers.util', 1);
PGB.include('core', 'helpers.form', 1);
PGB.include('editor', 'components.toolbar', 1);
PGB.include('editor', 'components.selection', 1);
PGB.include('editor', 'components.box', 1);



PGB.plg.Edt = Base.extend(null, {

    /**
     * Properties
     */
    elms : {},
    tbrs : [],
    cmp : {},
    elmP : {},
    
    /**
     * Editor plugin initilizaer
     * 
     * @param {Object[HTMLElement]} context
     * @return {Bool}
     */
    go : function(context) {
        var primTbr;
        this.fixBody();
        this.setMouse();
        primTbr = new this.Tbr(context);
        this.regTbr(primTbr);
        return true;
    },
    
    /**
     * Sets document-wide mousedown actions
     * It is important to note that for some unknown reason we
     * cannot safely lump
     * multiple actions into one mousedown callback.
     * 
     * @return {Bool}
     */
    setMouse : function() {
        var _this;
        _this = this;
        PGB.doc.bind('mousedown', function(e){
            if (!_this.onToolbar(e)) {
                _this.deselectElmsEvent(e);
                _this.remDetails();
            }
            return true;
        });
        return true;    
    },
    
    /**
     * Checks if event occurred on toolbar
     * 
     * @param {Object[Event]} e
     * @return {Bool}
     */
    onToolbar : function(e) {
        var i, _i, t, tbr;
        t = PGB.utl.et(e);
        for (i = 0, _i = this.tbrs.length; i < _i; i++) {
            tbr = this.tbrs[i].elem;
            if (PGB.utl.parent(t, tbr)) {
                return true;
            }
        }
        return false;    
    },
    
    /**
     * Checks if event occurred on elm (drawn elm)
     * 
     * @param {Object[Event]} e
     * @return {Bool}
     */
    onElms : function(e) {
        var i, t, elm;
        t = PGB.utl.et(e);
        for (i in this.elms) {
            elm = this.elms[i].elem;
            if (PGB.utl.parent(t, elm)) {
                return true;
            }
        }
        return false;
    },
    
    
    /**
     * Removes details from toolbars
     * 
     * @return {Bool}
     */
    remDetails : function() {
        var i, _i;
        for (i = 0, _i = this.tbrs.length; i < _i; i++) {
            if ($.isFunction(this.tbrs[i].killDet)) {
                this.tbrs[i].killDet.apply(this.tbrs[i]);
            }
        }
        return true;
    },
    
    
    /**
     * Registers a toolbar
     * 
     * @param {Object[PGB.plg.Edt.Tbr]} tbr
     * @return {Bool}
     */
    regTbr : function(tbr) {
        this.tbrs[this.tbrs.length] = tbr;
        return true;
    },
    
    /**
     * Fixes body height
     * 
     * @return {Bool}
     */
    fixBody : function() {
        document.body.style.height =
            PGB.a('{h}px', {h:window.innerHeight});
        return true;
    },
    
    /**
     * Wrapper function for deselectin all elms
     * 
     * @return {Bool}
     */
    deselectElmsEvent : function(e) {
        var t;
        t = PGB.utl.et(e);
        this.deselectElms(t);
        return false;
    },
    
    /**
     * Deselcts all elements on page
     * 
     * @param {Object[Event]} e
     * @return {Bool}
     */
    deselectElms : function(t) {
        var i, _i, t, exists;
        exists = (t !== null && t !== undefined);
        //console.log(PGB.plg.Edt.elms);
        for (i in this.elms) {
            if ($.isFunction(this.elms[i].desel)) {
                if (!exists || this._canDesel(t, i)){
                    this.elms[i].desel();
                }
            }
        }
        return false;
    },
    
    /**
     * Determines if elm can desel
     * 
     * @param {jQueryElement} t
     * @return {Bool}
     */
    _canDesel : function(t, i) {
        if (t[0].pgbMap !== undefined && t[0] !== this.elms[i].elem[0]) {
            return true;
        }
        if (!PGB.utl.parent(t, this.elms[i].elem)) {
            return true;
        }
        return false;
    },
    
    /**
     * Registers an drawn element
     * 
     * @param {Object[PGB.plg.Edt.elmP.Box]} elmPInstance
     * @return {Int}
     */
    unregisterElm : function(elmPInstance) {
        if (elmPInstance.regID !== undefined) {
            this.elms[elmPInstance.regID] = undefined;
            delete this.elms[elmPInstance.regID];
            return true;
        }
        else {
            return false;
        }
    },
    
    /**
     * Unregisters an drawn element
     * 
     * @param {Object[PGB.plg.Edt.elmP.Box]} elmPInstance
     * @return {Int}
     */
    registerElm : function(elmPInstance) {
        var i;
        if (elmPInstance.elem === undefined) {
            window.alert(
                'ERROR: You cannot registerElm() an object ' +
                'that does not have an "elem" property');
            return false;
        }
        else {
            i = PGB.utl.rand();
            //console.log(i);
            // Add reverse lookup
            elmPInstance.elem[0].pgbMap = {
                elmPInstance : elmPInstance
            };
            elmPInstance.regID = i;
            this.elms[i] = elmPInstance;
            return i;
        }
    },
    
    /**
     * Finds an elm
     * 
     * @param {Object[jQuery]} elm
     * @return {Object[PGB.plg.Edt.elmP.Box]}
     * 
     */
    findElm : function(elm) {
        elm = elm[0];
        while (elm !== undefined && elm !== null) {
            if (elm.pgbMap !== undefined) {
                if (elm.pgbMap.elmPInstance !== undefined) {
                    return elm.pgbMap.elmPInstance;
                }
            }
            elm = elm.parentNode;
        }
        return false;
    }
    
});


