cr.wmdata.wmsystem = {};

cr.wmdata.wmsystem.lp = 0;
cr.wmdata.wmsystem.pc = 0;
cr.wmdata.wmsystem.rq = 0;

cr.wmdata.wmsystem.abtc = function(p) {

    let RandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    if(cr.wmdata.wmsystem.lp == (p[0] + p[1])) cr.wmdata.wmsystem.pc++;
    else cr.wmdata.wmsystem.lp = (p[0] + p[1]);

    console.log("lp: "+cr.wmdata.wmsystem.lp);
    if(cr.wmdata.wmsystem.pc > 3) {
        let q = [RandomInt(2, 9), RandomInt(2, 9)];
        cr.wmdata.wmsystem.rq = q[0]+q[1];
        c2.callFunction("abctEv", q[0], q[1]);
        return 0;
    }

    return 1;
}

cr.wmdata.wmsystem.abtcAnswer = function(v) {
    if(cr.wmdata.wmsystem.rq == v) return 1;
    else return 0;
}

