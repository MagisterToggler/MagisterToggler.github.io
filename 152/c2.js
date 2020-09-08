
let C2 = function() {
    let included_scripts = [];

    let Object = function(object) {

        this.object = object;
        this.act = act;
        this.var = variable;
        
    }

    let act = function(action, params) {
        let allargs = [];

        if(this.act.arguments.length > 1) 
            if(typeof this.act.arguments[1] == "object") allargs = params;
            else for(let a = 0; a < this.act.arguments.length-1; a++) allargs.push(this.act.arguments[a+1]);

        let act_ = this.object.type.plugin.acts[action];
        if (!act_) return false;
        console.log(allargs);
        act_.apply(this.object, allargs);
        
        return true;
    }

    let variable = function(name, value) {
        let fvar;
        if(!this.object.instance_var_names || !this.object.instance_vars) return undefined;

        for(fn in this.object.instance_var_names)
            if(this.object.instance_var_names[fn] == name) {fvar = fn; break;}

        if(fvar != undefined) {
            if(value != undefined) return this.object.instance_vars[fvar] = value;
            else return this.object.instance_vars[fvar];
        }
        return undefined;
    }

    this.callFunction = function(name, args) {
        let allargs = [];

        if(this.callFunction.arguments.length > 1) 
            if(typeof this.callFunction.arguments[1] == "object") allargs = args;
            else for(let a = 0; a < this.callFunction.arguments.length-1; a++) allargs.push(this.callFunction.arguments[a+1]);

        return c2_callFunction(name, allargs);
    }

    this.getObjectByUid = function(uid) {
        let object = cr_getC2Runtime().objectsByUid[uid];
        if(object) return new Object(object);
        return false;
    }

    this.loadScript = function(file) {
        if(included_scripts.includes(file)) return false;
        if($("head").append("<script src='"+file+"'></script>")) 
            included_scripts.push(file);
        else 
            return false;

        return true;
    }

    this.copyToClipboard = (text) => {
        try {
            let value = document.createElement('input');
            value.id = 'copycplipboardtext';
            value.value = text;
            document.body.appendChild(value);
            let pickedValue = document.getElementById('copycplipboardtext')
            pickedValue.select();
            pickedValue.setSelectionRange(0, 99999);
            document.execCommand('copy');
            document.body.removeChild(pickedValue);
            this.callFunction("onCopiedToClipboard", text);
        } catch (e) {}
    }
}

if(!window.c2) {
    window.c2 = new C2();
    c2.callFunction("c2ready");
}

