import React from "react";
import "./startg.css"

const Startg = () => {
  return (<>
    <div id="gtoolbar">
      <div id="gbackbtn"><span className="material-symbols-outlined">keyboard_return</span></div>
      <div id="time_rec" hidden>00:00:00.00</div>
      <div id="gpausebtn" hidden><i className="fa-solid fa-circle-pause"></i></div>
    </div>
    <div id="plygnd">
      <div id="p-output">
        <p></p>
        <input type="number" />
      </div>
      <div id="p-input">
        <button className="calcin">1</button> <button className="calcin">2</button> <button className="calcin">3</button>
        <button className="calcin">4</button> <button className="calcin">5</button> <button className="calcin">6</button>
        <button className="calcin">7</button> <button className="calcin">8</button> <button className="calcin">9</button>
        <div style={{display:"flex", gap:".2em"}}><button id="pin-del"><i className="fa-solid fa-delete-left"></i></button><button
          id="posneg">-/+</button></div>
        <button className="calcin">0</button><button id="pin-enter"><i className="fa-solid fa-arrow-right-to-bracket"></i></button>
      </div>
    </div>
    <div id="eval_ply" hidden>
      {/* score, total failed, total solved, timer */}
      <label evalt="score">Score </label> <span></span>
      <label evalt="total_failed">Total Failed attempt(s) </label> <span></span>
      <label evalt="total_solved">Total Solved problem(s) </label> <span></span>
      <label evalt="timer" hidden>You did it in </label> <span></span>
    </div>
    <div hidden style={{display:"flex",margin:"auto",width:"20em", fontFamily:"'Lexend', sans-serif"}}>
      <div id="savscore">Save score</div>
      <div id="tryg">Try again?</div>
    </div>
    <div id="ToggleSketch" hidden>
      <i className="fa-solid fa-pen-to-square"></i>
    </div>
  </>);
};

export default Startg;