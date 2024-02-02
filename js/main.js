const printing = document.getElementById("printing");
const design = document.getElementById("design");
const games=document.getElementById("games");


let darkToggle = document.querySelector('#darkToggle');
let lightMode = false;
const btnImg = document.getElementById("darkModeIcon");
darkToggle.addEventListener('change', ()=> {
  document.body.classList.toggle('dark');

  if (lightMode) {
    btnImg.src ="img/moonIcon.png";
  } else {
    btnImg.src ="img/sunIcon.png";
  }
  lightMode = !lightMode;
});

var prevX=null;
var prevY =null;
var menuMovable = false;

function mobileNav() {
    let x = document.getElementById("menus");
     
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}
function navIcon(x) {
    x.classList.toggle("fa-minus-circle");
}


//mouse speed
document.addEventListener("mousemove",(e)=>{

    if(prevX==null || prevY == null){
        prevX = e.clientX;
        prevY = e.clientY;
        return;
    }
    let currentX = e.clientX;
    let currentY = e.clientY;
    //if distance btween prev and current is large take no action, untit the speed slows
   var  xspeed = Math.abs(prevX - currentX);
   if(xspeed > 70){
    menuMovable = false;
   }
   else{
    menuMovable =true;
   }
  
    prevX = currentX;
    prevY = currentY;
});
addEventListener("resize",(e)=>{
    if(window.screen.width<=600){
        menuMovable = false;
    }
    else{
        menuMovable=true;
    }
});
///menu hover
$(document).ready(function(){
        if(window.screen.width >600){
            menuMovable = true;     
        }
        console.log(menuMovable)
        $(".menuBoxOuter")
        .on("mouseenter", function(){
            if(menuMovable===true){
                $(this).find("img").delay(200).animate({left:"-60%"});
                $(this).animate({width:"50%"});
                
                $(".menuBoxOuter").not(this).each(function(){    
                    $(this).find("img").animate({left:"0px"});
                    $(this).animate({width:"200px"})
                })
            }
        });
});


/*
$(document).ready(function(){
    
    $(".menuBox")
            .on("mouseenter", function(){

                if(menuMovable){
                    $(this).find("img").delay(200).animate({left:"-60px"});
                    var c = $(this);
                    $(c).delay(200).animate({marginRight: "60px",marginLeft:"60px"},1000)
                    setTimeout(function(){
                        $(c).addClass("menuHover");
                    },400)
                $(".menuBox").not(this).each(function(){    
                    $(this).find("img").animate({left:"0px"});
                    $(this).removeClass("menuHover");
                    $(this).animate({marginRight: "10px",marginLeft:"10px"})
                    
                })
                }
            });
});
*/
function parallax(e) {
    let w = window.innerWidth / 2;
    let h = window.innerHeight / 2;
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    let depth1 = `${50 - (mouseX - w) * 0.01}% ${50 - (mouseY - h) * 0.01}%`;
    let depth2 = `${50 - (mouseX - w) * 0.03}% ${50 - (mouseY - h) * 0.03}%`;
    let depth3 = `${50 - (mouseX - w) * 0.06}% ${50 - (mouseY - h) * 0.06}%`;

    let x = `${depth3}, ${depth2}, ${depth1}`;
    console.log(x);
    this.style.backgroundPosition = x;
}
