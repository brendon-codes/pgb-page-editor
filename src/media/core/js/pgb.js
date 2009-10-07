
var PGB = Base.extend(null, {

    /**
     * Properties
     * 
     */
    hlp : {},
    doc : null,
    plg : {},
    _modules : {},
    _corePath : null,
    ERR : {
        INC_BAD_ROOT : [0, 'INC_BAD_ROOT', 'Bad root provided for include'],
        INC_BAD_TYPE : [1, 'INC_BAD_TYPE', 'Bad type provided for include'],
        LIB_NO_JQUERY : [2, 'LIB_NO_JQUERY', 'jQuery lib not found']
    },

    /**
     * Preliminary checks
     * 
     */
    init : function() {
        var _this;
        _this = this;
        if (window.jQuery === undefined) {
            throw this.ERR.LIB_NO_JQUERY;
            return false;
        }
        $(function(){
            _this.go();
        });
        return true;
    },

    /**
     * 
     * onload
     * 
     * @return {Int}
     */
    go : function() {
        var context, i, p;
        this.doc = $(document);
        context = $(document.body);
        i = 0;
        for (p in this.plg) {
            if ($.isFunction(this.plg[p].go)) {
                this.plg[p].go(context);
                i++;
            }
        }
        return i;
    },
    
    /**
     * Gets data args into string
     * 
     * @param {String} str
     * @param {Object} args
     * @return {String}
     */
    a : function(str, args) {
      var arg, key, val, out;
      out = str;
      for(arg in args) {
        key = new RegExp("\{" + arg + "\}", "ig");
        out = out.replace(key, args[arg]);
      }
      return out;
    },
    
    /**
     * Sets the core module path
     * 
     * @param {String} path
     */
    setCore : function(path) {
        this._modules['core'] = path;
        return true;
    },

    /**
     * Includes a js file
     * 
     * @param {String} root
     * @param {String} path
     * @param {Int} type
     */
    include : function(root, path, type) {
        var pathParts, rootParts, rootMod, modParts, found, j, newMod,
            newPath, inc, revRootParts, revModParts, mainFound;
        pathParts = path.split(/\./ig);
        rootParts = root.split(/\./ig);
        revRootParts = rootParts.slice(0).reverse();
        mainFound = false;
        for (rootMod in this._modules) {
            found = true;
            modParts = rootMod.split(/\./ig);
            revModParts = modParts.slice(0).reverse();
            for (j in revRootParts) {
                if (revModParts[j] !== revRootParts[j]) {
                    found = false;
                    break;
                }
            }
            if (found) {
                mainFound = true;
                break;
            }
        }
        if (!mainFound) {
            throw this.ERR.INC_BAD_ROOT;
            return false;
        }
        newMod = (modParts.concat(pathParts)).join('.');
        newPath = [this._modules[rootMod],pathParts.join('/')].join('/');
        this._modules[newMod] = newPath;
        if (type === 1) {
            inc = [newPath,'init'].join('/');
        }
        else if (type === 2) {
            inc = newPath;
        }
        else {
            throw this.ERR.INC_BAD_TYPE;
            return false;
        }
        inc = [inc,'js'].join('.');
        this._writeInclude(inc);
        return true;
    },

    
    /**
     * Writes the actual js include
     */
    _writeInclude : function(inc) {
        var o;
        o = this.a('<script type="text/javascript" src="{path}"></script>',{
            path : inc
        });
        document.write(o);
        return true;
    }

});


