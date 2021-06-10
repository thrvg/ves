const slider = $(".slider");
const tl = new TimelineMax();
tl.fromTo(slider, 1, {y: "0%"}, {y: "-100%"});
setTimeout(function() {
  window.location.href="/election";
  //slider.css("display", "none");

}, 1000);
setTimeout(function() {

slider.css("display", "none");

}, 1100);
