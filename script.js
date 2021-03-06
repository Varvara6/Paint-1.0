let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
let color = "black";
let width = 30;

let displayWidth = cnv.clientWidth;
let displayHeight = cnv.clientHeight;
cnv.width = displayWidth;
cnv.height = displayHeight;

document.getElementById("color").oninput = function(){
    color = this.value;
}

document.getElementById("size").oninput = function(){
    width = this.value;
}

document.getElementById("save_image").onclick = function(){
    let image = cnv.toDataURL("image/jpg");
    this.href = image;
}

cnv.onmousedown = (e) => {
    setTimeout(() => {
        cnv.onmousemove = (event) => {
            ctx.fillStyle = color;
            ctx.fillRect(event.offsetX - width/2, event.offsetY- width/2, width, width);
        };
    }, 1);
    ctx.fillStyle = color;
    ctx.fillRect(e.offsetX - width/2, e.offsetY- width/2, width, width);
    cnv.onmouseup = () => {
        cnv.onmousemove = null;
    };
}