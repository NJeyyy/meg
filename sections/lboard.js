(async function() {
  var megscore;
  await $.ajax({ /* Gets score data from server */
    method: 'POST',
    url: location.href + "genps",
    data: JSON.stringify({ "mode": "get-score" }),
    contentType: "application/json",
    success: (re) => {
      console.log(re); megscore = re["sorted-response"];
    },
    error: (e) => { console.error("error is: ", e); }
  });

  for (let i=0; i < megscore.length; i++) {
    const v = megscore[i];
    let elm = document.createElement("tr");
    // Date, Time, Total Solved, Score
    elm.innerHTML = `<td>${i+1}</td><td title=${v["date_day"]}>${v["date"]}</td><td>${v["time_record"]}</td>
    <td>${v["total_solved"]}</td><td>${v["score"]}</td>`;
    ISE("#board-container table").appendChild(elm);
  }

})();