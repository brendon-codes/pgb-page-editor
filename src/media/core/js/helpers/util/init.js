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
            t = $(e.target);
        }
        return t;
    }

});


