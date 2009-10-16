PGB.utl = Base.extend(null, {

    /**
     * Gets random id
     * 
     * @param {Int} max
     * @return {Int}
     */
    rand : function(max){
      if (max === null || max === undefined) {
          max = 99999999;
      }
      return Math.floor(Math.random() * max);
    },
    
    /**
     * Determines if child is in parent chain
     * 
     * @param {Object[jQueryElement]} child
     * @param {Object[jQueryElement]} parent
     * @return {Bool}
     */
    parent : function(child, parent) {
      var c, p;
      c = child[0];
      p = parent[0];
      while (c !== undefined && c !== null) {
          if (c === p) {
              return true;
          }
          c = c.parentNode;
      }
      return false;
    },
    
    /**
     * Get event element
     * 
     * @param {Object} e
     * @return {Object[jQueryElement]}
     */
    et : function(e) {
        var t;
        if (e.srcElement !== undefined) {
            t = $(e.srcElement);
        }
        else if (e.target !== undefined) {
            //console.log(1);
            t = $(e.target);
        }
        return t;
    },

    /**
     * Gets rgb hash from string val
     * 
     * @param {Object} val
     */
    rgb : function(val) {
        var rgb, c1;
        c1 = val.match(/rgb\s*\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
        if (c1 !== null) {
            rgb = {
                r : window.parseInt(c1[1]),
                g : window.parseInt(c1[2]),
                b : window.parseInt(c1[3])
            };
        }
        else {
            rgb = this.HexToRGB(val);
        }
        return rgb;
    },

    /**
     * Convert hex string to rgb object
     * Taken from jQuery Colorpicker
     * 
     * @see http://www.eyecon.ro/colorpicker/
     * @param {Object} hex
     */
    hexToRGB : function (hex) {
        var hex;
        hex = parseInt(((hex.indexOf('#') > -1) ?
            hex.substring(1) : hex), 16);
        return {r: hex >> 16, g: (hex & 0x00FF00) >> 8, b: (hex & 0x0000FF)};
    }

});


