
/**
 * Contstructs Form object
 * 
 * @constructor
 * @param {Object} det
 */
PGB.plg.Form = function(det) {
    var t, tp, e, i;
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
};

/**
 * Placeholder object
 * 
 * @return {Bool}
 */
PGB.plg.Form.type = function () {
    // nothing here
    return false;
};

/**
 * Form type remove constructor
 * 
 * @constructor
 * @param {Object} detCmp
 */
PGB.plg.Form.type.Button = function(detCmp) {
    if (detCmp.value === undefined) {
        this.elem = null;
    }
    if ($.isFunction(detCmp.action)) {
        this.elem = null;
    }
    if (detCmp.instance === undefined) {
        detCmp.instance = window;
    }
    this.elem = $('<input type="button" />');
    this.elem.val(detCmp.value);
    this.elem.click(function(){
        detCmp.action.apply(detCmp.instance);
        return false;
    });
    return;
};
