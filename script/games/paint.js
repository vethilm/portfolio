function paint() {
    console.log(playing);
    const canvas = document.getElementById("paintCanvas");
    const ctx = canvas.getContext("2d");
    canvas.height = 600;
    canvas.width = 800;
    ctx.beginPath();
    ctx.rect(canvas.width,canvas.height,0,0);
    ctx.fillStyle ="#D63927";
    ctx.fill();
    ctx.closePath();
    //fix window sizing?
    /*
        at load, get window size
        on window change get % difference
        apply ratio to painting coords
    */
    ctx.rect(600, 200, 100, 100)

    let prevX = null;
    let prevY = null;
    var slider = document.getElementById("brushSize");
    ctx.lineWidth = slider.value;

    ctx.strokeStyle = "#241F1C";
    let drawing = false;
    //changing colors
    let colors = document.querySelectorAll(".color")
    colors = Array.from(colors);
    colors.forEach(color => {
        color.addEventListener("click", () => {
            colors.forEach(color => {
                color.children[0].style.display = "none";
            });
            color.children[0].style.display = "block";
            ctx.strokeStyle = color.dataset.col;
        })
    });

    slider.oninput = function () {
        ctx.lineWidth = slider.value;
    }
    //clear
    let clearBtn = document.getElementById("clear");
    clearBtn.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    })
    //save
    let saveBtn = document.getElementById("save");
    saveBtn.addEventListener("click", () => {
        let data = canvas.toDataURL("imag/png");
        let a = document.createElement("a");
        a.href = data;
        a.download = "doodle.png";
        a.click()
    })
    //drawing
    paintCanvas.addEventListener("mousedown", (e) => drawing = true);
    paintCanvas.addEventListener("mouseup", (e) => drawing = false);
    paintCanvas.addEventListener("mousemove", (e) => {
        var bounding = canvas.getBoundingClientRect();
        // console.log(bounding)
        if (prevX == null || prevY == null || !drawing) {
            prevX = e.clientX - bounding.left;
            prevY = e.clientY - bounding.top;
            return;
        }
        let currentX = e.clientX - bounding.left;
        let currentY = e.clientY - bounding.top;
        if(currentX > canvas.width  || currentX < 5){
            console.log(currentX);
            drawing=false;
        }
        if(currentY > canvas.height || currentY < 5){
            drawing = false;    
        }
        // ctx.lineWidth = brushSize;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currentX, currentY);
        console.log("X" + prevX + " -> " + currentX);
        console.log("Y" + prevY + " -> " + currentY);
        ctx.lineJoin = "round";

        ctx.closePath();
        ctx.stroke();

        // Update previous mouse position
        prevX = currentX;
        prevY = currentY;
    })
    if (playing != "paintWindow") {
        console.log("end")
        return
    }
} 