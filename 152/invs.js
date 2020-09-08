cr.wmdata.invs_ = {
    ordahp: 0
};

setInterval(()=>{

    if(cr.wmdata.invswtime == undefined) return;
    if(cr.wmdata.invswtime >= 0) cr.wmdata.invswtime -= 1;

}, 1000);

cr.wmdata.invs_.parseAvs = function(GetUsersValue){
    GetUsersValue = (GetUsersValue);

    GetUsersValue.forEach((item)=>{
    for(let i = 0; i < cr.wmdata.invpls.length; i++){
      if(cr.wmdata.invpls[i].u == item.id) {
          cr.wmdata.invpls[i].a = item.photo_50.replace('https://vk.com/images/camera_50.png?ava=1', '').replace('https://vk.com/images/deactivated_50.png', '');
          break;
      }
    }
  });

}

cr.wmdata.invs_.callUpdateHp = function(invsndata) {
    invsndata = (invsndata);
    cr.wmdata.invs_.ordahp = invsndata.hp;
    c2.callFunction("updateInvsHp", invsndata.hp, invsndata.maxhp);
}

cr.wmdata.invs_.addDmg = function(data) {
    let find = false;
    data = (data);
    for(let i = 0; i < cr.wmdata.invpls.length; i++){
        if(cr.wmdata.invpls[i].u == data.u) {

            cr.wmdata.invpls[i].d = data.d;
            cr.wmdata.invpls[i].n = data.n;

            find = true;
            break;
        }
      }
    if(find) {
        c2.callFunction("invsPre");
        cr.wmdata.invs_.ordahp = data.ohp;
        c2.callFunction("updateInvsHp", data.ohp, data.omhp);
    }
    else {
        cr.wmdata.invpls.push({ u:data.u, n:data.n, d:data.d});
        c2.callFunction("invsEvStart");
        cr.wmdata.invs_.ordahp = data.ohp;
        c2.callFunction("updateInvsHp", data.ohp, data.omhp);
    }
    
}

cr.wmdata.invs_.getTimer = function() {
    let sec_num = cr.wmdata.invswtime;
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

cr.wmdata.invs_.prepareForAvs = function() {
    cr.wmdata.invsFrames = {};
    cr.wmdata.invsFrames[0] = "https://sun2.beltelecom-by-minsk.userapi.com/MYEc4bLFM0cKNHj7FxeM225Sko0XqHArI8E0kw/iswYRIQ9RLE.jpg";
    cr.wmdata.invsWorkFrame = 1;
    
    for(pl in cr.wmdata.invpls) {
        if(cr.wmdata.invpls[pl].a) {
            cr.wmdata.invpls[pl].wf = cr.wmdata.invsWorkFrame;
            cr.wmdata.invsFrames[cr.wmdata.invsWorkFrame] = cr.wmdata.invpls[pl].a;
            cr.wmdata.invsWorkFrame++;
        }
        else cr.wmdata.invpls[pl].wf = 0;
    }

}

cr.wmdata.invs_.getPlayerAva = function(frameIndex) {
    frameIndex = (frameIndex);
    if(cr.wmdata.invsFrames[frameIndex]) return cr.wmdata.invsFrames[frameIndex];
    else return "";
}

