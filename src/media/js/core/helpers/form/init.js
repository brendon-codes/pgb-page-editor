
/**
 * Contstructs Form object
 * 
 * @constructor
 * @param {Object} det
 */
PGB.plg.Form = function(det) {
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


/**
 * Form type remove constructor
 * 
 * @constructor
 * @param {Object} detCmp
 */
PGB.plg.Form.type.Select = function(detCmp) {
    var i, lbl;
    if (detCmp.values === undefined) {
        this.elem = null;
    }
    if ($.isFunction(detCmp.action)) {
        this.elem = null;
    }
    if (detCmp.instance === undefined) {
        detCmp.instance = window;
    }
    this.elem = $('<div>');
    if (detCmp.value !== undefined) {
        lbl = $('<span>').text(detCmp.value);
        this.elem.append(lbl);
    }
    elm = $('<select>');
    for (i in detCmp.values) {
        opt = $('<option>');
        opt.val(i);
        opt.text(detCmp.values[i]);
        elm[0].add(opt[0], null);
    }
    elm.change(function() {
        var _elm;
        _elm = $(this);
        detCmp.action.apply(detCmp.instance, [_elm.val()]);
        return false;    
    });
    this.elem.append(elm);
    return;
};

