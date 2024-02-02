//-------------------------------------------------------------canvas info
const brick = document.getElementById("brick");
const canvas = document.getElementById("breakoutCanvas");
const ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height +100 ;
let score = 0;
let totalScore = 0;
var cont = false;
var round = 1;
var nextRound=false;
var firstFrame = true;
//---------------------------------------------------------create ball
let dx = 4;
let dy = -4;
const ballRadius = 10;
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#D63927";
    ctx.fill();
    ctx.closePath();
}
//--------------------------------------------------------create paddle
const paddleHeight = 14;
const paddleWidth = 90;
const paddleSpeed = 7;
let paddleX = (canvas.width - paddleWidth) / 2;
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = "#D63927";
    ctx.fill();
    ctx.closePath();
}
//----------------------------------------------------------create bricks
const brickRowCount = 4; //4x9 80px
const brickColumnCount = 9;
const brickWidth = 80;
const brickHeight = 20;
const brickPadding = 5;
const brickOffsetTop = 30;
const brickOffsetLeft = 15;
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                //ctx.beginPath();
                //ctx.rect(brickX, brickY, brickWidth, brickHeight);
                //ctx.fillStyle = "#0095DD";
                //ctx.fill();
                //ctx.closePath();
                ctx.drawImage(brick, brickX, brickY, brickWidth, brickHeight)
            }
        }
    }
}
//--------------------------------------------------------------------score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Round: ${round}    Score: ${totalScore}`, 8, 20);
}
//------------------------------------------------------------------controller
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    totalScore ++;
                    console.log("score: "+score +" out of "+(brickColumnCount*brickRowCount))
                    if (score == brickRowCount * brickColumnCount) {
                        round++;
                        nextRound=true;
                        score=0;
                       // console.log(round +" : " +nextRound);
                    }
                }
            }

        }
    }
}
let breakoutStart = document.getElementById("breakoutStart");
breakoutStart.addEventListener("click", () => {
    cont = true;
    playBreakout();
})
function playBreakout() {
    canvas.style.opacity = "100%";
    breakoutStart.style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);;
    drawBricks();
    drawBall();
    collisionDetection();
    drawPaddle();
    drawScore();
    if (x + dx > canvas.width || x + dx < ballRadius) {
        dx = -dx;

    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    //if ball goes off bottom
    else if (y + dy > canvas.height - paddleHeight - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            setTimeout(function () {
                console.log("game lost");
                cont = false;       
            }, 100);
        }


    }
    if (rightPressed) {
        paddleX = Math.min(paddleX + paddleSpeed, canvas.width - paddleWidth);
    }
    else if (leftPressed) {
        paddleX = Math.max(paddleX - paddleSpeed, 0)
    }

    x += dx;
    y += dy;
    if(cont){
        if(nextRound){
            setTimeout(function (){
                for (let c = 0; c < brickColumnCount; c++) {
                    for (let r = 0; r < brickRowCount; r++) {
                        var b = bricks[c][r];
                        b.status = 1;
                    }
                }   
            },300);
            nextRound=false;
        }
        requestAnimationFrame(playBreakout); 
    }
    //if game end
    else{
        canvas.style.opacity = "50%";
        score = 0;
        nextRound =false;
        round = 1;
        x = canvas.width / 2;
        y = canvas.height / 2;
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r];
                b.status = 1;
            }
        }
        breakoutStart.style.display = "block";
    }
}

