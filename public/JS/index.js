

const slider = $(".slider");
const topsec = $("#top");
const secondsec = $("#second");
const thirdsec = $("#f");
const topmosth1 = $(".toph1");
const tl = new TimelineMax();
const btnk = $("#btn-kyc");
const btnv = $("#btn-vt");
// tl.fromTo(slider, 1, {y: "-100%"}, {y: "-100%"});
// topsec.css("opacity", "1");
// secondsec.css("opacity", "1");
// thirdsec.css("opacity", "1");
//tl.fromTo(slider, 1, {y: "0%"}, {y: "-100%"});

 // tl.fromTo(topsec, 2, {opacity: "0"}, {opacity: "1"});
 // tl.fromTo(secondsec, 2, {opacity: "0"}, {opacity: "1"}, "-=2");
 // tl.fromTo(thirdsec, 2, {opacity: "0"}, {opacity: "1"}, "-=4");
 btnk.click(function(){
   window.scrollTo(0,0);
   slider.css("display", "block");
   tl.fromTo(slider, 1, {y: "100%"}, {y: "0%"});
     setTimeout(function() {
       window.location.href="/candidates";
       //slider.css("display", "none");

   }, 1000);
   setTimeout(function() {

     //slider.css("display", "none");

 }, 1100);
  });
 btnv.click(function(){
   window.scrollTo(0,0);
   slider.css("display", "block");
   tl.fromTo(slider, 1, {y: "100%"}, {y: "0%"});
     setTimeout(function() {
       window.location.href="/letsvote";
       //slider.css("display", "none");

   }, 1000);
   setTimeout(function() {

     //slider.css("display", "none");

 }, 1100);



 });


 setTimeout(function() {
tl.fromTo(slider, 1, {y: "0%"}, {y: "-100%"});
   // tl.fromTo(slider, 1, {y: "-100%"}, {y: "-200%"});
   // topsec.css("opacity", "1");
   // secondsec.css("opacity", "1");
   // thirdsec.css("opacity", "1");

 //slider.remove();
}, 1000);
setTimeout(function() {

slider.css("display", "none");
}, 2000);
