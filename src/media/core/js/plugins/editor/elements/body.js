/**
 * A Box element prototype
 * 
 * @constructor
 * @param {Object[PGB.plg.Edt.cmp.Box]} boxCmp
 * @param {Object[Event]} e
 */
PGB.plg.Edt.elmP.Body = PGB.plg.Edt.elmP.BlockElement.extend({

    constructor : function() {
        if (PGB.plg.Edt.elmP.Body._isSet) {
            throw PGB.plg.Edt.elmP.Body.ERR.SINGLETON;
            return;
        }
        else {
            PGB.plg.Edt.elmP.Body._isSet = true;
        }
        this._origParent = $(document);
        this.elem = $(document.body);
        if (this.elem.css('background-color') === 'transparent') {
            this.elem.css({backgroundColor : '#F00'});
        }
        this.elem.css({height : PGB.a('{h}px', {h:window.innerHeight}) });
        this.base();
        return;
    }

}, {
    
    /**
     * Static properties
     * 
     */
    _isSet : false,
    ERR : {
        SINGLETON : [
            0, 'SINGLETON',
            'Only one Body class can be created'
        ]
    }

    
});



