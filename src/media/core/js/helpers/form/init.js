

PGB.plg.Form = Base.extend({

    /**
     * Contstructs Form object
     * 
     * @constructor
     * @param {Object} det
     */
    constructor : function(det) {
        var t, tp, e, i, f;
        this.elem = $('<ul>');
        for (f in det) {
            if (det[f].type !== undefined) {
                t = det[f].type.toLowerCase();
                tp = t.split('');
                tp[0] = tp[0].toUpperCase();
                t = tp.join('');
                if ($.isFunction(PGB.plg.Form.type[t])) {
                    e = new PGB.plg.Form.type[t](det[f]);
                    if (e.elem !== undefined && e.elem !== null) {
                        i = $('<li>');
                        i.append(e.elem);
                        this.elem.append(i);
                    }
                }
            }
        }
        return;
    }

},{
    
    /**
     * Used for elements
     */
    type : {}
    
});



