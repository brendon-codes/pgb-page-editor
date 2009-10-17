PGB.include('core', 'helpers.util', 1);
PGB.include('editor', 'toolbar', 1);
PGB.include('editor', 'toolbar.primary', 2);
PGB.include('editor', 'toolbar.form', 2);
PGB.include('editor', 'toolbar.widget', 2);
PGB.include('editor', 'elements', 1);
PGB.include('editor', 'elements.block', 2);
PGB.include('editor', 'elements.body', 2);
PGB.include('editor', 'components.selection', 1);
PGB.include('editor', 'components.box', 1);



PGB.plg.Edt = Base.extend(null, {

    /**
     * Properties
     */
    elms : {},
    tbrs : {},
    _elmStack : [],
    _tbrCoords : {},
    cmp : {},
    elmP : {},
    _activeElm : null,
    ERR : {
        ELM_NO_ELEM : [
            0, 'ELM_NO_ELEM',
            'You cannot register an elm ' +
                'that does not have an "elem" property'
        ],
        ELM_NO_REGID : [
            1, 'ELM_NO_REGID',
            'Trying to unregister an elm without a regID'
        ],
        TBR_NO_REGID : [
            2, 'TBR_NO_REGID',
            'Trying to unregister a toolbar without a regID'
        ]
    },
    
    /**
     * Editor plugin initilizaer
     * 
     * @param {Object[HTMLElement]} context
     * @return {Bool}
     */
    go : function(context) {
        var bodyElm, primTbr, detTbr;
        this.context = context;
        // Need to set a body element
        bodyElm = new PGB.plg.Edt.elmP.Body();
        this.setMouse();
        primTbr = new this.TbrPrim();
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
            var t, a;
            t = PGB.utl.et(e);
            a = _this.findElm(t);
            // If not on a toolbar and not on the active element
            if (!_this.onToolbar(t) &&
                    (a === false || !_this.onActiveElm(a))) {
                _this.regActiveElm(null);
                _this.deselectElmsEvent(e);
                _this.remDetails();
            }
            return true;
        });
        return true;    
    },
    
    /**
     * Adds a stack item
     * 
     */
    stackAdd : function(elm) {
        var regID;
        regID = null;
        if (!isNaN(elm)) {
            regID = window.parseInt(elm);
        }
        else if (elm instanceof PGB.plg.Edt.elmP.Element) {
            regID = elm.regID;
        }
        if (regID !== null) {
            this._elmStack.push(elm.regID);
            return this._elmStack.length;
        }
        else {
            return false;
        }
    },

    /**
     * Removes an item from the stack
     * 
     * @param {Object} tbr
     */
    stackRem : function(elm) {
        var pos;
        pos = this.stackGetPosition(elm);
        if (pos !== false) {
            delete this._elmStack[pos];
            this.stackTrim();
            return this._elmStack.length;
        }
        return false;
    },

    /**
     * Removes an item from the stack
     * 
     * @param {Object} tbr
     */
    stackRemIndex : function(pos) {
        delete this._elmStack[pos];
        this.stackTrim();
        return this._elmStack.length;
    },

    /**
     * Gets elements position in stack
     * 
     * 
     */
    stackGetPosition : function(elm) {
        var regID, i, _i;
        regID = null;
        if (!isNaN(elm)) {
            regID = window.parseInt(elm);
        }
        else if (elm instanceof PGB.plg.Edt.elmP.Element) {
            regID = elm.regID;
        }
        if (regID !== null) {
            for (i = 0, _i = this._elmStack.length; i < _i; i++) {
                if (this._elmStack[i] === regID) {
                    return i;
                }
            }
        }
        return false;
    },

    /**
     * Sends an element back
     * 
     * @param {Object} elm
     */
    stackBack : function(elm) {
        var par, siblingPos, i, j, _j, pos, thisSibPos, thisRegID;
        pos = this.stackGetPosition(elm);
        siblingPos = null;
        par = elm.elem[0].parentNode;
        for (i in this.elms) {
            if (this.elms[i].elem[0].parentNode === par) {
                thisRegID = this.elms[i].regID;
                thisSibPos = this.stackGetPosition(thisRegID);
                if (thisSibPos === false || thisSibPos >= pos) {
                    continue;
                }
                if (siblingPos === null || thisSibPos > siblingPos) {
                    siblingPos = thisSibPos;
                }
                // Quit if found right below
                if (siblingPos === (pos - 1)) {
                    break;
                }
            }
        }
        if (siblingPos !== null) {
            //console.log(siblingPos, elm.regID, this._elmStack);
            this.stackRemIndex(pos);
            this.stackInsert(siblingPos, elm.regID);
            //console.log(this._elmStack);
            this.stackProcess();
            return this._elmStack.length;
        }
        else {
            return false;
        }
    },

    /**
     * Inserts item into position in stack
     * 
     */
    stackInsert : function(pos, regID) {
        this._elmStack.splice(pos, 0, regID);
        return this._elmStack.length;
    },

    /**
     * Trim the stack after it has been altered
     * 
     */
    stackTrim : function() {
        var o, i, _i;
        o = [];
        for (i = 0, _i = this._elmStack.length; i < _i; i++) {
            if (this._elmStack[i] !== undefined) {
                o.push(this._elmStack[i]);
            }
        }
        this._elmStack = o;
        return o.length;
    },

    /**
     * Processes stack
     * 
     * @param {Object} tbr
     */
    stackProcess : function() {
        var start, inc, i, _i, regID, z;
        start = 100;
        inc = 10;
        for (i = 0, _i = this._elmStack.length; i < _i; i++) {
            regID = this._elmStack[i];
            // Set zIndex
            z = start + (inc * i);
            this.elms[regID].elem.css('z-index', z);
        }
        return this._elmStack.length;
    },

    /**
     * Processes a stack helper element
     * 
     */
    stackProcessHelper : function(elm, helper, offset) {
        var z, regID, i;
        if (!isNaN(elm)) {
            regID = window.parseInt(elm);
            elm = this.elms[regID];
        }
        z = elm.elem.css('z-index');
        if (!isNaN(z)) {
            z = window.parseInt(z) + offset;
            helper.css('z-index', z);
            return true;
        }
        else {
            return false;
        }
    },

    /**
     * Register the active element
     * 
     * 
     */
    regActiveElm : function(elmPInstance) {
        this._activeElm = elmPInstance;
        return true;
    },

    /**
     * Checks if is on active element
     * 
     */
    onActiveElm : function(elmPInstance) {
        return (this._activeElm !== null &&
            elmPInstance.elem[0] === this._activeElm.elem[0]);
    },

    /**
     * Registers a toolbars last coordinates
     */
    setTbrCoords : function(code, top, left) {
        this._tbrCoords[code] = {top:top, left:left};
        return true;
    },

    /**
     * Gets toolbar coords
     * 
     * @param {Object} code
     */
    getTbrCoords : function(code) {
        if (this._tbrCoords[code] !== undefined) {
            return this._tbrCoords[code];
        }
        else {
            return false;
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
        var d;
        elm = elm[0];
        while (elm !== undefined && elm !== null) {
            d = $(elm).data('pgb');
            if (d !== undefined) {
                if (d.elmPInstance !== undefined) {
                    return d.elmPInstance;
                }
            }
            elm = elm.parentNode;
        }
        return false;
    },
    
    /**
     * Checks if event occurred on toolbar
     * 
     * @param {Object[Event]} e
     * @return {Bool}
     */
    onToolbar : function(t) {
        var i, _i, tbr;
        for (i in this.tbrs) {
            tbr = this.tbrs[i].elem;
            if (PGB.utl.parent(t, tbr)) {
                return true;
            }
        }
        return false;    
    },

    /**
     * Gets smallest toolbar
     * 
     */
    getSmallestTbr : function() {
        var i, sm, w, h, nw, nh;
        w = 0;
        h = 0;
        sm = null;
        for (i in this.tbrs) {
            if (sm === null) {
                sm = this.tbrs[i];
            }
            nw = this.tbrs[i].elem.outerWidth();
            nh = this.tbrs[i].elem.outerHeight();
            if ((w === 0 || h === 0) || ([nw,nh] <= [w,h])) {
                w = nw;
                h = nh;
                sm = this.tbrs[i];
            }
        }
        return sm;
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
        for (i in this.tbrs) {
            if (!(this.tbrs[i] instanceof PGB.plg.Edt.TbrPrim) &&
                    $.isFunction(this.tbrs[i].destroy)) {
                this.tbrs[i].destroy();
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
        tbr.regID = PGB.utl.rand();
        this.tbrs[tbr.regID] = tbr;
        return true;
    },
    
    /**
     * Unregisters a toolbar
     * 
     * @param {Object[PGB.plg.Edt.Tbr]} tbr
     */
    unregisterTbr : function(tbr) {
        if (tbr.regID !== undefined) {
            this.tbrs[tbr.regID] = undefined;
            delete this.tbrs[tbr.regID];
            return true;
        }
        else {
            throw this.ERR.TBR_NO_REGID;
            return false;
        }
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
        if (t.data('pgb') !== undefined && t[0] !== this.elms[i].elem[0]) {
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
    unregisterElm : function(elmPInstance, reStack) {
        if (elmPInstance.regID !== undefined) {
            this.elms[elmPInstance.regID] = undefined;
            delete this.elms[elmPInstance.regID];
            return true;
        }
        else {
            throw this.ERR.ELM_NO_REGID;
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
            throw this.ERR.ELM_NO_ELEM;
            return false;
        }
        else {
            i = PGB.utl.rand();
            // Enable this next line only for debug
            //elmPInstance.elem.text(i);
            //console.log(i);
            // Add reverse lookup
            elmPInstance.elem.data('pgb', {
                elmPInstance : elmPInstance
            });
            elmPInstance.regID = i;
            this.elms[i] = elmPInstance;
            return i;
        }
    }
    
});


