(async function() {
  await waitFor(_ => SE(".nav-items:not([spage='ext']), #pagecred") && SE(".nav-items:not([spage='ext']), #pagecred").length == 6)
  SE(".nav-items:not([spage='ext']), #pagecred").forEach(elm => {
    elm.addEventListener("click", (e) => {
      setpages(e.target.getAttribute("spage"));
    });
  });

  ISE(".nav-items[spage='ext']").addEventListener("click", async function () {
    await fetch("sections/exitp.html").then(resp => { return resp.text(); })
      .then(async function (res) {
        document.body.innerHTML = res;
        eval(SE("body script")[0].innerHTML);
        await sleep(1500);
        eval(SE("body script")[1].innerHTML);
      })
      .catch(err => { console.error(`error when fetching on for the exit page: ,`, err); });
  });
})();