(async function() {
  var megscore;
  await fetch(location.href + "main-server-handling", { /* Gets score data from server */
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ "mode": "get-score" })
  }).then(res=>{
    if (!res.ok){throw new Error(`Network response was not ok, status: ${res.status}`)}
    return res.json();
  }).then(res=>{
    console.log(res); megscore = res["sorted-response"];
  }).catch(e=> console.error("error is: ", e))

  for (let i=0; i < megscore.length; i++) {
    const v = megscore[i];
    let elm = document.createElement("tr");
    // Date, Time, Total Solved, Score
    elm.innerHTML = `<td>${i+1}</td><td title=${v["date_day"]}>${v["date"]}</td><td>${v["time_record"]}</td>
    <td>${v["total_solved"]}</td><td>${v["score"]}</td>`;
    ISE("#board-container table").appendChild(elm);
  }

})();