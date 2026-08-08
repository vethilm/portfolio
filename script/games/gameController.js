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
    }
    //changes window
    for (let i = 0; i < buttonList.length; i++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        var hideWindow = document.getElementById(buttonList[i].id).value;
        document.getElementById(hideWindow).style.display = "none";
        document.getElementById(playing).style.display = "inline";
    }
}

