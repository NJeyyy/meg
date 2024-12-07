var itf_s = ["home", "startg", "credits"]; //, "setg", "gdesc", "lboard", "expr"

function setpages(pagenames) {
  const fetchloadctn = function(url, type){
    fetch(url).then(resp=>{return resp.text();}).then(res=>{
      if(type=="html"){
        document.body.innerHTML = res;
      } else if (type=="js"){eval(res);}
    }).catch(err => {console.error(`error when fetching on ${type},`, err);});
  }
  if (itf_s.includes(pagenames)) {
    var itf_sc = ISE("link#pfiles");
    if (!itf_sc) {
      var itf_sc = document.createElement("link");
      itf_sc.setAttribute("rel", "stylesheet");
      itf_sc.setAttribute("id", "pfiles")
      document.head.appendChild(itf_sc);
    }
    itf_sc.setAttribute("href", "sections/" + pagenames + ".css");
    fetchloadctn(`sections/${pagenames}.html`, "html");
    fetchloadctn(`sections/${pagenames}.js`, "js");
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