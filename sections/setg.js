(async function () {
  var settingsData;
  // fetch data from server and use the saved settings
  await fetch(location.href + "main-server-handling", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "mode": "get-savedsettings" }) // send data
  }).then(res => {
    if (!res.ok) {
      throw new Error(`Network response was not ok, status: ${res.status}`);
    }
    return res.json();
  }).then(res => {
    console.log(res);
    settingsData = res["response"];
  }).catch(e => console.error("There's an error after the fetch(?), here: ", e))
  if (!settingsData) { throw new Error("fetch failed..? or what.. I DONT SEE ANY DATA IS RETRIEVED HELPPP") }
  ISE("#maxnum-option input").value = settingsData.maxnum;
  ISE("#timrec-option input[type='checkbox']").checked = settingsData.enable_timer === "True" ? true : false;
  if (settingsData.islocal === "True") {
    ISE("#save-option select").options[0].selected = true;
  } else { ISE("#save-option select").options[1].selected = true; }

  // to set the settings
  ISE("#maxnum-option input").addEventListener("change", (e)=>{
    console.log(e.target.value);
    fetch(location.href + "main-server-handling", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({mode:"set-savedsettings", maxnum: e.target.value})
    }).then(res=>{
      if(!res.ok) {throw new Error(`problems with the network, response status: ${res.status}`)}
      return res.json();
    }).then(res=> {
      console.log(res);
      alert("saved successfully!")
    }).catch(e=>console.error(`There's an error when saving the settings data: ${e}`))
  });
  ISE("#timrec-option input[type='checkbox']").addEventListener("change", (e)=>{
    console.log(e.target.checked);
    fetch(location.href + "main-server-handling", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({mode:"set-savedsettings", enable_timer: e.target.checked})
    }).then(res=>{
      if(!res.ok) {throw new Error(`problems with the network, response status: ${res.status}`)}
      return res.json();
    }).then(res=> {
      console.log(res);
      alert("saved successfully!")
    }).catch(e=>console.error(`There's an error when saving the settings data: ${e}`))
  });
  ISE("#save-option select").addEventListener("change", (e)=>{
    let islocal = e.target.selectedIndex == 0? true : false;
    fetch(location.href + "main-server-handling", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({mode:"set-savedsettings", islocal: islocal})
    }).then(res=>{
      if(!res.ok) {throw new Error(`problems with the network, response status: ${res.status}`)}
      return res.json();
    }).then(res=> {
      console.log(res);
      alert("saved successfully!")
    }).catch(e=>console.error(`There's an error when saving the settings data: ${e}`))
  });
})();