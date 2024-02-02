const buttonList = document.getElementsByClassName("gameBtn");
canvas.height = 700;
canvas.width = 800;
var playing = "paintWindow"; // set default game
changeGame();

for (let button of buttonList) {
    button.addEventListener("click", e => {
        playing = document.getElementById(button.id).value;
        changeGame();
    });
}
let slides = document.getElementsByClassName("mySlides");
function changeGame(){
    //if function needs to start right away
    switch (playing) {
        case "paintWindow":
            console.log(playing);
            paint();
            break;
        case "breakoutWindow":
            playBreakout();
            break;
        case "rotaWindow":
            break;
        case "uiWindow":
          if(slides[2].style.display!="block"){
            slides[1].style.display="block";
          }
          break;
          case "visWindow":
              slides[0].style.display="block";
            break;
    }
    //changes window
    for (let i = 0; i < buttonList.length; i++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        var hideWindow = document.getElementById(buttonList[i].id).value;
        document.getElementById(hideWindow).style.display = "none";
        document.getElementById(playing).style.display = "inline";
    }
}


let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" activeDot", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " activeDot";
}