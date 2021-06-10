const tl = new TimelineMax();
 const slider = $(".slider");
 const yesbtn=$(".btn-yes");
 const nobtn=$(".btn-no");
 const votetext = $(".vote-title");
 const votetext2 = $(".vote-title2");
 const votetext3 = $(".vote-title3");
  const votetext4 = $(".vote-title4");
 const input = $("#grouptype");
 const subbtn = $(".btn-sub");


setTimeout(function() {
  //tl.fromTo(slider, 1, {y: "-100%"}, {y: "-200%"});
  tl.fromTo(slider, 1, {y: "0%"}, {y: "-100%"});


//slider.remove();
}, 1000);
setTimeout(function() {

slider.css("display", "none");
 //tl.fromTo(menu, 1, {opacity: 0}, {opacity: 1}, "+=1");
}, 2000);
nobtn.click(function(){
  window.scrollTo(0,0);
  slider.css("display", "block");
  tl.fromTo(slider, 1, {y: "100%"}, {y: "0%"});
    setTimeout(function() {
      window.location.href="/candidates";
      //slider.css("display", "none");

  }, 2000);
});
yesbtn.click(function(){

  window.scrollTo(0,0);
  yesbtn.css("display", "none");
  nobtn.css("display", "none");
  subbtn.css("opacity", 1);
  input.css("opacity", 1);
votetext.css("display", "none");
votetext2.css("display", "block");
votetext3.css("display", "block");
votetext4.css("display", "block");

//tl.fromTo(votetext, 1, {y: "100%"}, {y: "0%"});
  votetext.text("Confirm your house one last time")



});

subbtn.click(function(){

  votetext3.css("display", "none");
subbtn.css("display", "none");
votetext4.css("display", "none");
input.css("display", "none");
votetext2.text("Voting begins in....");
tl.fromTo(votetext2, 1, {y: "100%"}, {y: "0%"});

  setTimeout(function() {
votetext2.text("3");

}, 1500);
setTimeout(function() {
votetext2.text("2");

}, 3000);

setTimeout(function() {
votetext2.text("1");

}, 4500);
setTimeout(function() {




window.location.href="/vote";
//slider.css("display", "none");

},6000);
});
