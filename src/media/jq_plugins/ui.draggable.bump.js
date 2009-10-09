$.ui.draggable.prototype._init_orig = $.ui.draggable.prototype._init;
$.ui.draggable.prototype.destroy_orig = $.ui.draggable.prototype.destroy;
$.ui.draggable._bumpElms = {};

/**
 * Adds bump attribute to draggable
 * 
 * @param {Object} event
 * @param {Object} ui
 */
$.ui.plugin.add("draggable", "bump", {

    /**
     * hook drag
     * 
     */
    drag: function(event, ui) {
        var group, i, elm, src, dst, c, pos, elmBump, d;
        group = this.data('bump').group;
        src = {};
        dst = {};
        pos = {};
        c = [];
        d = this.data('draggable');
        src.Width = d.helperProportions.width;
        src.Height = d.helperProportions.height;
        src.Offset = this.offset();
        src.Left = src.Offset.left;
        src.Top = src.Offset.top;
        src.Right = src.Offset.left + src.Width;
        src.Btm = src.Offset.top + src.Height;
        pos.Offset = d.positionAbs;
        pos.Left = pos.Offset.left;
        pos.Right = pos.Offset.left + src.Width;
        pos.Top = pos.Offset.top;
        pos.Btm = pos.Offset.top + src.Height;
        for (i in $.ui.draggable._bumpElms) {
            elm = $.ui.draggable._bumpElms[i];
            // Is not same element
            if (elm[0] === this[0]) {
                continue;
            }
            elmBump = elm.data('bump');
            if (elmBump === undefined || group !== elmBump.group) {
                continue;
            }
            dst.Width = elm.outerWidth();
            dst.Height = elm.outerHeight();
            dst.Offset = elm.offset();
            dst.Left = dst.Offset.left;
            dst.Right = dst.Offset.left + dst.Width;
            dst.Top = dst.Offset.top;
            dst.Btm = dst.Offset.top + dst.Height;
            // Criterias  
            c[0] = (pos.Left >= dst.Left && pos.Left <= dst.Right);
            c[1] = (pos.Right >= dst.Left && pos.Right <= dst.Right);
            c[2] = (pos.Left <= dst.Left && pos.Right >= dst.Right);
            c[3] = (pos.Top >= dst.Top && pos.Top <= dst.Btm);
            c[4] = (pos.Btm >= dst.Top && pos.Btm <= dst.Btm);
            // Test
            if ((c[0] || c[1] || c[2]) && (c[3] || c[4])) {
                // Snap criteria
                if (src.Top > (dst.Btm - (dst.Height / 2))) {
                    ui.position.top -= (pos.Top - dst.Btm);
                }
                else if (src.Btm < (dst.Top + (dst.Height / 2))) {
                    ui.position.top -= (pos.Btm - dst.Top);
                }
                if (src.Left > (dst.Right - (dst.Width / 2))) {
                    ui.position.left -= (pos.Left - dst.Right);
                }
                else if (src.Right < (dst.Left + (dst.Width / 2))) {
                    ui.position.left -= (pos.Right - dst.Left);
                }
                return;
            }
        }
    }

});

$.ui.draggable.prototype._init = function() {
    var id;
    if (this.options.bump !== undefined) {
        id = Math.floor(Math.random() * 999999);
        this.element.data('bump', {
            id : id,
            group : this.options.bump
        });
        $.ui.draggable._bumpElms[id] = this.element;
    }
    return $.ui.draggable.prototype._init_orig.apply(this, arguments);
};

$.ui.draggable.prototype.destroy = function() {
    var bump;
    if (this.options.bump !== undefined) {
        bump = this.element.data('bump');
        if (bump !== undefined) {
            this.element.removeData('bump');
            delete $.ui.draggable._bumpElms[bump.id];
        }
    }
    return $.ui.draggable.prototype.destroy_orig.apply(this, arguments);
};
