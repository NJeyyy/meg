SE(".nav-items:not([spage='ext']), #pagecred").forEach(elm => {
  elm.addEventListener("click", (e) => {
    setpages(e.target.getAttribute("spage"));
  });
});

ISE(".nav-items[spage='ext']").addEventListener("click", () => {
  $.ajax({
    method: 'POST',
    url: location.href + "genps",
    data: JSON.stringify({ "mode": "exit-game" }),
    contentType: "application/json",
    success: (re)=>{ console.log(re); 
      window.top.close()
    },
    error: (e) => { console.error("error is: ", e); }
  });
}, {once:true});