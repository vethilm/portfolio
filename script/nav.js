function toggleNav() {
    var x = document.getElementById("links");
    if (x.style.display === "flex") {
      x.style.display = "none";
      off()

    } else {
      x.style.display = "flex";
      on()
    }
  }

  function on() {
    document.getElementById("overlay").style.display = "block";
  }
  
  function off() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("links").style.display="none"
  }

  function pacman(){
    
  }