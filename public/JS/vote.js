const bt = $(".ballot-title");
const ba = $(".ballot-a");
const bb = $(".ballot-b");
const bc = $(".ballot-c");
const bd = $(".ballot-d");
const sb = $(".sub-btn");
const slider = $(".ballot");
const data = $(".property");
const textarea1 = $(".textarea1");
 const tl = new TimelineMax();
 var vi=0;
 for(k=1;k<bt.length;k++){
   bt.eq(k).css("display","none");
   ba.eq(k).css("display","none");
   bb.eq(k).css("display","none");
   bc.eq(k).css("display","none");
   bd.eq(k).css("display","none");
 }
 // bt.click(function(){
 //   ba.eq(vi).css("display","none");
 //   bb.eq(vi).css("display","none");
 //   bc.eq(vi).css("display","none");
 //   bd.eq(vi).css("display","none");
 //   bt.eq(vi).css("display","none");
 //   textarea1.append("!"+bt.eq(vi).text()+":"+ba.eq(vi).text());
 //   //textarea1.append("!"+bt.eq(vi).text()+":"+ba.eq(vi).text());
 //   vi++;
 //
 //   tl.fromTo(slider, 1, {height: "80vh", width: "80vw"}, {height: "10vh", width: "10vw", bottom: "45vh", top:"45vh", left: "45vw", right: "45vw"});
 //   setTimeout(function() {
 //
 //  tl.fromTo(slider, 1, {bottom: "45vh", top:"45vh", left: "45vw", right: "45vw"},{bottom: "7vh", top:"83vh", left: "45vw", right: "45vw"});
 //
 //  if(vi==bt.length){
 //    textarea1.append("!");
 //    sb.trigger('click');
 //  }
 //
 // }, 1000);
 //
 //   setTimeout(function() {
 //  slider.css("opacity", "0");
 //
 //  tl.fromTo(slider, 1, {height: "80vh", width: "80vw", opacity: "1", bottom: "10vh", top: "10vh", right: "100vw", left: "-80vw"}, { bottom: "10vh", top:"10vh", left: "10vw", right: "10vw"});
 //
 // console.log(vi);
 // console.log(bt.length);
 //
 //  ba.eq(vi).css("display","block");
 //  bb.eq(vi).css("display","block");
 //  bc.eq(vi).css("display","block");
 //  bd.eq(vi).css("display","block");
 //  bt.eq(vi).css("display","block");
 //
 // }, 2000);
 //
 // });
 ba.click(function(){
   ba.eq(vi).css("display","none");
   bb.eq(vi).css("display","none");
   bc.eq(vi).css("display","none");
   bd.eq(vi).css("display","none");
   bt.eq(vi).css("display","none");
   textarea1.append("!"+bt.eq(vi).text()+":"+ba.eq(vi).text());


   vi++;
   tl.fromTo(slider, 1, {height: "80vh", width: "80vw"}, {height: "10vh", width: "10vw", bottom: "45vh", top:"45vh", left: "45vw", right: "45vw"});
   setTimeout(function() {

  tl.fromTo(slider, 1, {bottom: "45vh", top:"45vh", left: "45vw", right: "45vw"},{bottom: "7vh", top:"83vh", left: "45vw", right: "45vw"});
  if(vi==bt.length){
    textarea1.append("!");
    sb.trigger('click');
  }
 }, 1000);
   setTimeout(function() {

  slider.css("opacity", "0");
  tl.fromTo(slider, 1, {height: "80vh", width: "80vw", opacity: "1", bottom: "10vh", top: "10vh", right: "100vw", left: "-80vw"}, { bottom: "10vh", top:"10vh", left: "10vw", right: "10vw"});


  ba.eq(vi).css("display","block");
  bb.eq(vi).css("display","block");
  bc.eq(vi).css("display","block");
  bd.eq(vi).css("display","block");
  bt.eq(vi).css("display","block");

 }, 2000);

 });
 bb.click(function(){
   ba.eq(vi).css("display","none");
   bb.eq(vi).css("display","none");
   bc.eq(vi).css("display","none");
   bd.eq(vi).css("display","none");
   bt.eq(vi).css("display","none");


   textarea1.append("!"+bt.eq(vi).text()+":"+bb.eq(vi).text());
   vi++;
   tl.fromTo(slider, 1, {height: "80vh", width: "80vw"}, {height: "10vh", width: "10vw", bottom: "45vh", top:"45vh", left: "45vw", right: "45vw"});
   setTimeout(function() {

  tl.fromTo(slider, 1, {bottom: "45vh", top:"45vh", left: "45vw", right: "45vw"},{bottom: "7vh", top:"83vh", left: "45vw", right: "45vw"});
  if(vi==bt.length){
    textarea1.append("!");
    sb.trigger('click');
  }
 }, 1000);
   setTimeout(function() {

  slider.css("opacity", "0");
  tl.fromTo(slider, 1, {height: "80vh", width: "80vw", opacity: "1", bottom: "10vh", top: "10vh", right: "100vw", left: "-80vw"}, { bottom: "10vh", top:"10vh", left: "10vw", right: "10vw"});

  ba.eq(vi).css("display","block");
  bb.eq(vi).css("display","block");
  bc.eq(vi).css("display","block");
  bd.eq(vi).css("display","block");
  bt.eq(vi).css("display","block");

 }, 2000);

 });
 bc.click(function(){
   ba.eq(vi).css("display","none");
   bb.eq(vi).css("display","none");
   bc.eq(vi).css("display","none");
   bd.eq(vi).css("display","none");
   bt.eq(vi).css("display","none");
   

   textarea1.append("!"+bt.eq(vi).text()+":"+bc.eq(vi).text());
   vi++;
   tl.fromTo(slider, 1, {height: "80vh", width: "80vw"}, {height: "10vh", width: "10vw", bottom: "45vh", top:"45vh", left: "45vw", right: "45vw"});
   setTimeout(function() {

  tl.fromTo(slider, 1, {bottom: "45vh", top:"45vh", left: "45vw", right: "45vw"},{bottom: "7vh", top:"83vh", left: "45vw", right: "45vw"});
  if(vi==bt.length){
    textarea1.append("!");
    sb.trigger('click');
  }

 }, 1000);
   setTimeout(function() {

  slider.css("opacity", "0");
  tl.fromTo(slider, 1, {height: "80vh", width: "80vw", opacity: "1", bottom: "10vh", top: "10vh", right: "100vw", left: "-80vw"}, { bottom: "10vh", top:"10vh", left: "10vw", right: "10vw"});

  ba.eq(vi).css("display","block");
  bb.eq(vi).css("display","block");
  bc.eq(vi).css("display","block");
  bd.eq(vi).css("display","block");
  bt.eq(vi).css("display","block");

 }, 2000);

 });
 bd.click(function(){
   ba.eq(vi).css("display","none");
   bb.eq(vi).css("display","none");
   bc.eq(vi).css("display","none");
   bd.eq(vi).css("display","none");
   bt.eq(vi).css("display","none");
   textarea1.append("!"+bt.eq(vi).text()+":"+bd.eq(vi).text());
   vi++;

   tl.fromTo(slider, 1, {height: "80vh", width: "80vw"}, {height: "10vh", width: "10vw", bottom: "45vh", top:"45vh", left: "45vw", right: "45vw"});
   setTimeout(function() {

  tl.fromTo(slider, 1, {bottom: "45vh", top:"45vh", left: "45vw", right: "45vw"},{bottom: "7vh", top:"83vh", left: "45vw", right: "45vw"});
  if(vi==bt.length){
    textarea1.append("!");
    sb.trigger('click');
  }
 }, 1000);
   setTimeout(function() {

  slider.css("opacity", "0");
  tl.fromTo(slider, 1, {height: "80vh", width: "80vw", opacity: "1", bottom: "10vh", top: "10vh", right: "100vw", left: "-80vw"}, { bottom: "10vh", top:"10vh", left: "10vw", right: "10vw"});

  ba.eq(vi).css("display","block");
  bb.eq(vi).css("display","block");
  bc.eq(vi).css("display","block");
  bd.eq(vi).css("display","block");
  bt.eq(vi).css("display","block");

 }, 2000);

 });
