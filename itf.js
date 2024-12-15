var itf_s = ["home-js", "startg-js", "credits", "gdesc", "lboard-js"]; // "setg", "expr"

async function setpages(pagenames) {
  await waitFor(_=> document.body)
  let elementContainer = document.body;
  elementContainer.removeAttribute("style");
  elementContainer.setAttribute("style", "animation-name:to-load; animation-duration:1.7s; animation-iteration-count:1; animation-timing-function:linear;");
  const pagefiles = pagenames.replace("-js",  "")
  const fetchloadctn = function(url, type){
    fetch(url).then(resp=>{return resp.text();}).then(res=>{
      if(type=="html"){
        elementContainer.innerHTML = res;
      } else if (type=="js"){
        let runscript=new Function(res);
        runscript();
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
    fetchloadctn(`sections/${pagefiles}.html`, "html");
    if(pagenames.match(/-js$/)){
      fetchloadctn(`sections/${pagefiles}.js`, "js");
    }
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