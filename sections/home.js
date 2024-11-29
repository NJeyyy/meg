SE(".nav-items, #pagecred").forEach(elm => {
  elm.addEventListener("click", (e) => {
    setpages(e.target.getAttribute("spage"));
  });
});