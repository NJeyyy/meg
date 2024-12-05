// importing
import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import "./itf.css";
import { ISE, waitFor } from "./ToolScript_Global.js"
import Hom from "./sections/home.jsx"
import Startg from "./sections/startg.jsx"


const itf_s = ["home", "startg", "credits"]; //, "setg", "gdesc", "lboard"
const rootel = ReactDOM.createRoot(ISE("#base"));
/*export const initpages = () => {
  const [cpage, setcpage] = useState("home");
  const setpages = (npg) => { setcpage(npg); };
  return { cpage, setpages };
}*/
export const setpg = (npg) => {
  let Dompages;
  switch (npg) {
    case "home": Dompages = <Hom />; break;
    case "startg": Dompages = <Startg />; break;
    default:
      alert("this page isn't exist!");
      console.error("this page is not exist yet! or maybe just not.");
      Dompages = <Hom />;
      break;
  }
  rootel.render(Dompages);
};

(async function () {
  await waitFor(_ => document.readyState == "complete");
  if (!navigator.onLine) {
    console.error("can't start without the internet.");
    alert("Please connect to the internet!!");
    rootel.render(<div>
      <h1>Please turn on your internet to access the website</h1>
      <p>this website uses some dependencies that require an internet connection. so, please.</p>
    </div>);
  } else {
    let maip = "home";
    /*const Manrea = () => {
      //const { cpage, setpages } = initpages();
      //useEffect(() => {}, [a]);
      return setpg(maip);
    };*/
    setpg(maip)
    ISE("#base").setAttribute("cpage", maip);
  }
})();
