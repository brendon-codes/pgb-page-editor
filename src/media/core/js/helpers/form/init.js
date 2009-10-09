

PGB.plg.Form = Base.extend({

    /**
     * Properties
     */
    _items : {},

    /**
     * Contstructs Form object
     * 
     * @constructor
     * @param {Object} det
     */
    constructor : function(det) {
        var t, tp, e, i, f, r;
        this.elem = $('<ul>');
        for (f in det) {
            if (det[f].type !== undefined) {
                t = det[f].type.toLowerCase();
                tp = t.split('');
                tp[0] = tp[0].toUpperCase();
                t = tp.join('');
                if ($.isFunction(PGB.plg.Form.type[t])) {
                    r = PGB.utl.rand();
                    this._items[r] = new PGB.plg.Form.type[t](det[f]);
                    if (this._items[r].elem !== undefined &&
                            this._items[r].elem !== null) {
                        i = $('<li>');
                        i.append(this._items[r].elem);
                        this.elem.append(i);
                    }
                }
            }
        }
        return;
    },

    /**
     * Runs cleanup hooks on form elements
     * 
     */
    cleanupAll : function() {
        var r;
        for (r in this._items) {
            if ($.isFunction(this._items[r].cleanup)) {
                this._items[r].cleanup();
            }
        }
        return true;
    }

},{
    
    /**
     * Used for elements
     */
    type : {}
    
});



