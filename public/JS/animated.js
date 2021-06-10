 const menu = $(".navbar-icon-colored");
 const slider = $(".slider");
 const wholenavbar=$(".navbar");
 const kycc=$(".kyccontent");
 const hb=$(".homebtn");
 const hb2=$(".homebtn2");
 const tl = new TimelineMax();
 const vb=$(".votebtn");

 // wholenavbar.css("opacity", "1");
 // kycc.css("opacity", "1");
  menu.css("opacity","0");

 //tl.fromTo(slider, 1, {y: "0%"}, {y: "-100%"});
 // tl.fromTo(menu, 1, {opacity: 0}, {opacity: 1}, "+=1");
 //tl.fromTo(slider, 1, {y: "0%"}, {y: "-100%"});
 hb.click(function(){
   window.scrollTo(0,0);
   slider.css("display", "block");
   tl.fromTo(slider, 1, {y: "100%"}, {y: "0%"});
     setTimeout(function() {
       window.location.href="/election";
       //slider.css("display", "none");

   }, 2000);
   
 });
 hb2.click(function(){
   window.scrollTo(0,0);
   alert("hi");
   slider.css("display", "block");
   tl.fromTo(slider, 1, {y: "100%"}, {y: "0%"});
     setTimeout(function() {
       window.location.href="/candidates";
       //slider.css("display", "none");

   }, 2000);
 });
 vb.click(function(){
   window.scrollTo(0,0);
   slider.css("display", "block");
   tl.fromTo(slider, 1, {y: "100%"}, {y: "0%"});
     setTimeout(function() {
       window.location.href="/letsvote";
       //slider.css("display", "none");

   }, 2000);
 });
 //   setTimeout(function() {
 //
 //     slider.css("display", "none");
 //
 // }, 2100);


 setTimeout(function() {
   //tl.fromTo(slider, 1, {y: "-100%"}, {y: "-200%"});
   tl.fromTo(slider, 1, {y: "0%"}, {y: "-100%"});


 //slider.remove();
}, 1000);
 setTimeout(function() {

 slider.css("display", "none");
  tl.fromTo(menu, 1, {opacity: 0}, {opacity: 1}, "+=1");
}, 2000);
