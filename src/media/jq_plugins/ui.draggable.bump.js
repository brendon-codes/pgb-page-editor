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
        var group, i, elm, src, dst, c1, c2, c3, c4, elmBump;
        group = this.data('bump').group;
        src = {};
        dst = {};
        src.Width = ui._dragInst.helperProportions.width;
        src.Height = ui._dragInst.helperProportions.height;
        src.Offset = ui._dragInst.positionAbs;
        src.Left = src.Offset.left;
        src.Right = src.Offset.left + src.Width;
        src.Top = src.Offset.top;
        src.Btm = src.Offset.top + src.Height;
        for (i in $.ui.draggable._bumpElms) {
            elm = $.ui.draggable._bumpElms[i];
            // Is not same element
            if (elm[0] !== this[0]) {
                elmBump = elm.data('bump');
                // Is part of same bump group
                if (elmBump !== undefined &&
                        group === elmBump.group) {
                    dst.Width = elm.outerWidth();
                    dst.Height = elm.outerHeight();
                    dst.Offset = elm.offset();
                    dst.Left = dst.Offset.left;
                    dst.Right = dst.Offset.left + dst.Width;
                    dst.Top = dst.Offset.top;
                    dst.Btm = dst.Offset.top + dst.Height;
                    // Criterias  
                    c1 = (src.Left >= dst.Left && src.Left <= dst.Right);
                    c2 = (src.Right >= dst.Left && src.Right <= dst.Right);
                    c3 = (src.Top >= dst.Top && src.Top <= dst.Btm);
                    c4 = (src.Btm >= dst.Top && src.Btm <= dst.Btm);
                    //console.log(src, dst);
                    // Test
                    if ((c1 || c2) && (c3 || c4)) {
                        ui._dragInst._shouldCancelDrag = true;
                        return;
                    }
                }
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

$.ui.draggable.prototype._mouseDrag = function(event, noPropagation) {
    //Compute the helpers position
    this.position = this._generatePosition(event);
    this.positionAbs = this._convertPositionTo("absolute");
    this._shouldCancelDrag = false;
    //Call plugins and callbacks and use the resulting position if
    // something is returned
    if (!noPropagation) {
        var ui = this._uiHash();
        ui._dragInst = this;
        this._trigger('drag', event, ui);
        this.position = ui.position;
    }
    if (!this._shouldCancelDrag) {
        if (!this.options.axis || this.options.axis != "y") 
            this.helper[0].style.left = this.position.left + 'px';
        if (!this.options.axis || this.options.axis != "x") 
            this.helper[0].style.top = this.position.top + 'px';
        if ($.ui.ddmanager) 
            $.ui.ddmanager.drag(this, event);
    }
    return false;
};
