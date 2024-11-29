// ~~~~~  prepare playgrounds
var enable_timer, isShaking; //isShaking is only applied to mobile device
fetch(location.href + "meg_stg.ini")
  .then(re => re.text())
  .then(data => {
    enable_timer = parseINIString(data).DEFAULT.enable_timer == "True" ? true : false;
    isShaking = parseINIString(data).DEFAULT.isShaking == "True" ? true : false;
  });
ISE("#gbackbtn").addEventListener("click", () => {
  clearInterval(binter); //make sure to clear the interval since it's not gonna be resetted when the page changed.
  setpages("home");
});
SE(".calcin").forEach(elm => {
  elm.addEventListener("click", (e) => {
    let vl = e.target.innerHTML;
    ISE("#p-output input").value += vl;
  });
});
ISE("#posneg").addEventListener("click", () => {
  let val = ISE("#p-output input").value;
  if (val.startsWith('-')) {
    ISE("#p-output input").value = val.slice(1);
  } else {
    ISE("#p-output input").value = '-' + val;
  }
});
ISE("#pin-del").addEventListener("click", () => {
  let elt = ISE("#p-output input"); //target element
  elt.value = elt.value.slice(0, -1);
});
document.getElementById("gpausebtn").addEventListener("contextmenu", (e) => {
  e.preventDefault(); endevalgame();
});
ISE("#p-output input").addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    ISE("#pin-enter").click();
  }
});
/*document.addEventListener("visibilitychange", () => {
  if (!document.getElementById("plygnd").hasAttribute("hidden") && !ISE("div#notstarted")) {
    document.getElementById("plygnd").setAttribute("hidden", "");
    endevalgame();
    alert("I end it!.. cuz you left me:(")
  }
});*/
ISE("#tryg").addEventListener("click", orinit);


//~~~  prepare often-used functions and variables
var tq, tf, qres, nitr, tm, binter, lsr; // total solved, total failed, correct answer, index of a question,
// binter for the stopwatch interval, lsr total reduction from using sketch
// tm is to contain the last stopwatch value, in ms
var stpw, t;
function generateprob() {
  ISE("#p-output input").value = "";
  ISE("#p-output input").removeAttribute("style");
  fetch(location.href + "genpy")
    .then(e => e.json())
    .then(e => {
      nitr++;
      ISE("#p-output p").innerHTML = `${nitr}.)&ensp;${e.n1} ${e.op} ${e.n2} = ?`;
      qres = e.res;
    })
    .catch(e => console.error("The error is: ", e));
}
function endevalgame() {
  clearInterval(binter);
  if (ISE("canvas#sketch")) { ISE("canvas#sketch").remove(); } //making sure it's deleted
  document.body.removeAttribute("style");
  ISE("#ToggleSketch").removeAttribute("lsr");
  ["div:has(>#tryg, >#savscore)", "#savscore"].forEach((eld) => { ISE(eld).removeAttribute("hidden"); });
  ["div#time_rec", "#plygnd", "#gpausebtn", "#ToggleSketch"].forEach((eld) => { ISE(eld).setAttribute("hidden", ""); });
  if (tq == 0) {
    ISE("#savscore").setAttribute("hidden", "");
  }
  ISE("#eval_ply").removeAttribute("hidden");
  ISE("#eval_ply label[evalt='score']+span").innerHTML = (Math.round((((tq - tf) / tq) * 100) * Math.pow(10, 1)) / Math.pow(10, 1)) - (lsr * 0.5);
  ISE("#eval_ply label[evalt='total_failed']+span").innerHTML = tf;
  ISE("#eval_ply label[evalt='total_solved']+span").innerHTML = tq;
  if (enable_timer) {
    ISE("label[evalt='timer']").removeAttribute("hidden");
    ISE("label[evalt='timer']+span").innerHTML = tm;
  }
}
const b = function () {
  t++;
  var hr = String(t >= 36000 ? Math.floor(t / 36000) : 0);
  var mnt = String(t >= 600 ? Math.floor((t % 36000) / 600) : 0);
  var secs = Math.round((Math.floor((t % 36000) % 600)) * Math.pow(10, 2) / 10) / Math.pow(10, 2);
  tm = `${hr.padStart(2, 0)}:${mnt.padStart(2, 0)}:${secs.toFixed(1).padStart(4, 0)}`
  ISE("div#time_rec").innerText = tm;
  ISE("div#time_rec").setAttribute("title", t);
};


// ~~~~~~~~ action
async function orinit() {
  // reset the value if reinitiate
  tq = tf = nitr = lsr = t = 0;
  qres = {}; tm = "";
  ISE("#gpausebtn").classList.remove("fa-circle-pause"); // ↓↓
  ISE("#gpausebtn").classList.add("fa-circle-play"); // just to make sure the button interface gonna be correct
  if (ISE("canvas#sketch")) { ISE("canvas#sketch").remove(); } // to make sure it's gone, cuz idk what else to do..hehe :3c
  document.body.removeAttribute("style");
  ISE("#ToggleSketch").removeAttribute("lsr");
  ISE("#plygnd").removeAttribute("hidden");
  ["#time_rec", "#gpausebtn", "#eval_ply", "div:has(>#tryg, >#savscore)", "#ToggleSketch"].forEach((eld) => { ISE(eld).setAttribute("hidden", ""); });
  ["#p-output p", "#p-output input",
    "#eval_ply label[evalt='total_solved']+span", "#eval_ply label[evalt='total_failed']+span",
    "#eval_ply label[evalt='score']+span", "label[evalt='timer']+span"
  ].forEach((eld) => { ISE(eld).innerHTML = ""; });

  // actual init
  let strt = false; stpw = true;
  let elm = document.createElement("div");
  elm.id = "notstarted"
  elm.setAttribute("style", `width:80vw;height:80vh;background:rgb(0 0 0 / 50%);position:fixed;top:10%;left:10%;border-radius:10px;display:grid;justify-content:center;align-items:center;user-select:none;`);
  elm.innerHTML = `<i style="font-size:6rem; color:#FCB860; filter:drop-shadow(2px 3px 6px rgb(10 10 10 / 60%)); cursor:pointer;" class="fa-solid fa-play"></i>`;
  document.body.appendChild(elm);
  elm.querySelector("i").addEventListener("click", () => { elm.remove(); strt = true; });
  await waitFor(_ => strt)
  generateprob();
  ISE("#ToggleSketch").removeAttribute('hidden', "");
  if (enable_timer) {
    [ISE("div#time_rec"), document.getElementById("gpausebtn")].forEach((elm) => { elm.removeAttribute("hidden"); });
    clearInterval(binter);
    binter = setInterval(b, 100);
  }
}
document.getElementById("gpausebtn").addEventListener("click", (e) => {
  if (!stpw) {
    clearInterval(binter);
    binter = setInterval(b, 100);
    stpw = true;
    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-circle-pause");
  } else {
    clearInterval(binter);
    stpw = false;
    e.target.classList.remove("fa-circle-pause");
    e.target.classList.add("fa-circle-play");
  }
});
ISE("#pin-enter").addEventListener("click", () => {
  if (ISE("#p-output input").value.length != 0) {
    const usrans = parseFloat(ISE("#p-output input").value);
    if (!isNaN(usrans)) {
      if (usrans == qres) {
        if (ISE("#ToggleSketch").hasAttribute("lsr")) { lsr++; }
        ISE("#ToggleSketch").removeAttribute("lsr");
        generateprob();
        tq++;
      } else {
        ISE("#p-output input").setAttribute("style", `border:solid 2px red; box-shadow:0 0 10px 0 red;`);
        tf++;
      }
      ISE("#p-output input").value = "";
    } else {
      alert("Please only use an appropriate answer.")
    }
  } else {
    endevalgame();
  }
});
ISE("#ToggleSketch").addEventListener("click", function (e) {
  let sketchcont = ISE("canvas#sketch");
  const pelm = ISE("#ToggleSketch");
  document.body.removeAttribute("style");
  if (sketchcont) {
    pelm.removeAttribute("used");
    sketchcont.remove();
  } else {
    pelm.setAttribute("lsr", "");
    if (!isShaking) { document.body.setAttribute("style", "touch-action:none;") }
    pelm.setAttribute("used", "");
    sketchcont = document.createElement("canvas");
    sketchcont.setAttribute("style", "z-index:210500;width:100vw;height:100vh;background:rgb(0 0 0 / 10%);top:0;left:0;position:fixed;");
    sketchcont.id = "sketch";
    document.body.appendChild(sketchcont);
    const sketchctx = sketchcont.getContext("2d");
    let costro = { x: 0, y: 0, w: 2, color: "#0ff" };
    let isStroking = false;
    whenresize();
    function whenresize() {
      sketchctx.canvas.width = window.innerWidth;
      sketchctx.canvas.height = window.innerHeight;
    }
    sketchcont.addEventListener("mousedown", (e) => { sketching("down", e); });
    sketchcont.addEventListener("mouseup", (e) => { sketching("up", e); });
    sketchcont.addEventListener("mousemove", (e) => { sketching("move", e); });
    sketchcont.addEventListener("touchstart", (e) => { sketching("down", e); });
    sketchcont.addEventListener("touchend", (e) => { sketching("up", e); });
    sketchcont.addEventListener("touchcancel", (e) => { sketching("up", e); });
    sketchcont.addEventListener("touchmove", (e) => { sketching("move", e); });

    function sketching(mode, e) {
      const findxy = function (e) {
        costro.x = (e.clientX || e.touches[0].clientX) - sketchcont.offsetLeft;
        costro.y = (e.clientY || e.touches[0].clientY) - sketchcont.offsetTop;
      }
      if (mode == "down") {
        findxy(e);
        isStroking = true;
      } else if (mode == "move") {
        if (isStroking) {
          sketchctx.beginPath();
          sketchctx.lineWidth = costro.w;
          sketchctx.lineCap = "round";
          sketchctx.strokeStyle = costro.color;
          sketchctx.moveTo(costro.x, costro.y);
          findxy(e);
          sketchctx.lineTo(costro.x, costro.y);
          sketchctx.stroke();
        }
      } else if (mode == "up") {
        isStroking = false;
      }
    }
  }
});
ISE("#savscore").addEventListener("click", () => {
  $.ajax({
    method: 'POST',
    url: location.href + "genps",
    data: JSON.stringify({
      "isplay": false,
      "time_record": tm,
      "total_solved": tq,
      "score": (Math.round((((tq - tf) / tq) * 100) * Math.pow(10, 1)) / Math.pow(10, 1)) - (lsr * 0.5)
    }),
    cache: false,
    contentType: "application/json",
    success: (re) => {
      console.log(re);
    }, error: (e) => { console.error("error is: ", e); }
  });
});
orinit();