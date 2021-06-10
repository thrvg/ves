const slider = $(".slider-down");
const hb=$(".homebtn");
const vb=$(".votebtn");
const hb2=$(".homebtn2");
const tl = new TimelineMax();
hb.click(function(){
  window.scrollTo(0,0);
  slider.css("display", "block");
  tl.fromTo(slider, 1, {y: "0%"}, {y: "-100%"});
    setTimeout(function() {
      window.location.href="/election";

  }, 2000);
});
hb2.click(function(){
  window.scrollTo(0,0);
  slider.css("display", "block");
  tl.fromTo(slider, 1, {y: "0%"}, {y: "-100%"});
    setTimeout(function() {
      window.location.href="/candidates";

  }, 2000);
});
vb.click(function(){
  window.scrollTo(0,0);
  slider.css("display", "block");
  tl.fromTo(slider, 1, {y: "0%"}, {y: "-100%"});
    setTimeout(function() {
      window.location.href="/letsvote";

  }, 2000);
});
