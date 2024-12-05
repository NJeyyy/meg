import React from "react";
import "./home.css";
import {setpg} from "../itf.js"
const Hom = () => {
  const pagesplc = [
    {spage: "startg", innerTxt: "Play!"},
    {spage: "setg", innerTxt: "Settings"},
    {spage: "lboard", innerTxt: "Leaderboard"},
    {spage: "gdesc", innerTxt: "About"}
  ];
  const navbtn = (e)=> {
    setpg(e.target.getAttribute("spage"));
  };

  return (
    <div id="page_main">
      <h1>MEG</h1>
      <h4>Math Exuberance Games</h4>
      <div id="navbtn">
        {pagesplc.map(i => (
          <div key={i.spage} className="nav-items" spage={i.spage}
            onClick={navbtn}>{i.innerTxt}</div>
        ))}
      </div>
      {/*<div id="test">gada yah.</div>*/}
      <div id="pagecred" spage="credits">Credits</div>
    </div>
  );
};

export default Hom;