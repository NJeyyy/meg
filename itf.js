var itf_s="home"
var itf_sc=document.querySelector(itf_s+".css")
$.ajax({type: "GET", url:"sections/"+itf_s+".html", success: (res)=>{
  $("body").html(res);
}});
if(!itf_sc) {
  var itf_sc = document.createElement("link");
  itf_sc.setAttribute("rel", "stylesheet");
  document.head.appendChild(itf_sc)
}
itf_sc.setAttribute("href", "sections/"+itf_s+".css")