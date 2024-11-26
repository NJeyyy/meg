var itf_s = ["home", "startg", "credits"]; //, "setg", "gdesc", "lboard"
function setpages(pagenames) {
  if (itf_s.includes(pagenames)) {
    var itf_sc = document.querySelector(pagenames + ".css");
    $.ajax({
      type: "GET", url: "sections/" + pagenames + ".html", success: (res) => {
        $("body").html(res);
      }
    });
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