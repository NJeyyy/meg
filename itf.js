var itf_s = ["home", "startg", "credits"]; //, "setg", "gdesc", "lboard"

function setpages(pagenames) {
  if (itf_s.includes(pagenames)) {
    var itf_sc = document.querySelector(pagenames + ".css");
    fetch(`sections/${pagenames}.html`).then(resp=>{
      console.log("loading page, response: ",resp);
    }).then(res=>{
      document.body.innerHTML=res;
    }).catch(err=>{console.error("error when loading page: ", err);});
    if (!itf_sc) {
      var itf_sc = document.createElement("link");
      itf_sc.setAttribute("rel", "stylesheet");
      document.head.appendChild(itf_sc);
    }
    itf_sc.setAttribute("href", "sections/" + pagenames + ".css");
  } else {
    alert("That page is not exist, yet.")
    console.error("WTF ARE YOU TRYING TO DO?? There's nothing like that, idiot.")}
  return;
}

(async function () {
  if(!navigator.onLine){console.error("can't start without internet.");
    alert("Please connect to the internet!!");
  }
  setpages(itf_s[0]);
})();