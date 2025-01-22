var itf_s = ["home-js", "startg-js", "credits", "gdesc", "lboard-js", "setg-js"]; //"expr"

async function setpages(pagenames) {
  await waitFor(_=> ISE("#main-parent"));
  var elementContainer = ISE("#main-parent");
  //elementContainer.removeAttribute("style");
  //elementContainer.setAttribute("style", "animation-name:to-load; animation-duration:1.7s; animation-iteration-count:1; animation-timing-function:linear;");
  const pagefiles = pagenames.replace("-js",  "")
  const fetchloadctn = async function(url, type){
    fetch(url).then(resp=>{return resp.text();}).then(res=>{
      if(type=="html"){
        elementContainer.innerHTML = res;
        return;
      } else if (type=="js"){
        let runscript=new Function(res);
        runscript();
        return;
      }
    }).catch(err => {console.error(`error when fetching on ${type} in ${pagenames}: `, err);});
  }
  if (itf_s.includes(pagenames)) {
    var itf_sc = ISE("link#pfiles");
    if (!itf_sc) {
      var itf_sc = document.createElement("link");
      itf_sc.setAttribute("rel", "stylesheet");
      itf_sc.setAttribute("id", "pfiles")
      document.head.appendChild(itf_sc);
    }
    itf_sc.setAttribute("href", "sections/" + pagefiles + ".css");
    await fetchloadctn(`sections/${pagefiles}.html`, "html");
    if(pagenames.match(/-js$/)){
      fetchloadctn(`sections/${pagefiles}.js`, "js");
    }
  } else {
    alert("That page is not exist, yet.")
    console.error("WTF ARE YOU TRYING TO DO?? There's nothing like that, idiot.")}
  return;
}
setpages(itf_s[0]);

/*
// THIS ONLY WORKS ON MOBILE!!
let TouchY = 0;
let TDiff = 0;
var elm = document.documentElement;
var felm = document.fullscreenElement || document.mozFullScreenElement ||
document.webkitFullscreenElement || document.msFullscreenElement || null;
function fullscreen_page(mode) {
  if (mode == true) {
    if (elm.requestFullscreen) {
      elm.requestFullscreen();
    } else if (elm.webkitRequestFullscreen) {
      // Safari
      elm.webkitRequestFullscreen();
    } else if (elm.msRequestFullscreen) {
      // IE11
      elm.msRequestFullscreen();
    }
    return;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      // Safari
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE11
      document.msExitFullscreen();
    }
    return;
  }
}
document.addEventListener("touchstart", (e)=> {
  TouchY = e.touches[0].clientY;
  felm=document.fullscreenElement || document.mozFullScreenElement ||
  document.webkitFullscreenElement || document.msFullscreenElement;
});
document.addEventListener("touchmove", (e)=> {
  const cTouchY = e.touches[0].clientY;
  TDiff = cTouchY - TouchY;
  if (TDiff > 0 && window.scrollY === 0) {
    ISE("#MobileOnly_PullFullScreen").setAttribute("shown", "");
    e.preventDefault();
    if (!felm) {
      fullscreen_page(true);
    } else {
      fullscreen_page(false);
    }
    return;
  }
  ISE("#MobileOnly_PullFullScreen").removeAttribute("shown");
});
document.addEventListener("touchend", (e)=> {
  ISE("#MobileOnly_PullFullScreen").removeAttribute("shown");
})*/