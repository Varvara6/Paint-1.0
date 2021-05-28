let cnv = document.getElementById("canvas"); // холст для рисования
let cnv_bg = document.getElementById("bg_layer"); // холст для заднего фона
let ctx = cnv.getContext("2d");
let ctx_bg = cnv_bg.getContext("2d");
let color = document.getElementById("color").value; //цвет кисточки
let background = document.getElementById("background");// цвет фона
let width = 30;  // толщина кисточки
let tool = "Кисточка"; // текущий инструмент
let button_tool = document.getElementById("tool"); // кнопка для смены инструмента
let button_clear = document.getElementById("clear"); // очистка

// устанавливаем размер холста по размерам видимой част и элемента canvas
let displayWidth = cnv.clientWidth;
let displayHeight = cnv.clientHeight;
cnv.width = displayWidth;
cnv.height = displayHeight;
cnv_bg.width = displayWidth;
cnv_bg.height = displayHeight;
// устанавливаем цвет для холста-фона
ctx_bg.fillStyle = background.value;
ctx_bg.fillRect(0, 0, cnv_bg.width, cnv_bg.height);
// смена цвета кисточки 
document.getElementById("color").oninput = function(){
    color = this.value;
}
// смена толщины кисточки 
document.getElementById("size").oninput = function(){
    width = this.value;
}
//сохранение холстов в виде картинки
document.getElementById("save_image").onclick = function(){
    let cnv_save = document.getElementById("save_canvas");
    let ctx_save = cnv_save.getContext("2d");
    cnv_save.width = displayWidth;
    cnv_save.height = displayHeight;
    //переносим на холст сохранения холст заднего вида
    ctx_save.drawImage(cnv_bg, 0, 0, cnv.width, cnv.height);
    //переносим на холсте сохранения холст рисования
    ctx_save.drawImage(cnv, 0, 0, cnv.width, cnv.height);
    let image = cnv_save.toDataURL("image/jpg");
    this.href = image;
}
//рисование мышкой 
cnv.onmousedown = (e) => {
    setTimeout(() => {
        cnv.onmousemove = (event) => {
            if(tool == "Кисточка"){
                ctx.fillStyle = color;
                ctx.fillRect(event.offsetX - width/2, event.offsetY- width/2, width, width);
            }
            else
            ctx.clearRect(event.offsetX - width/2, event.offsetY- width/2, width, width);
        };
    }, 1);
    if(tool == "Кисточка"){
        ctx.fillStyle = color;
        ctx.fillRect(event.offsetX - width/2, event.offsetY- width/2, width, width);
    }
    else
    ctx.clearRect(e.offsetX - width/2, e.offsetY- width/2, width, width);
    cnv.onmouseup = () => {
        cnv.onmousemove = null;
    };
}
//ждем событие изменение цвета с для палитры заднего фона
background.addEventListener('input', changeBackground);
function changeBackground(){
    ctx_bg.fillStyle = background.value;
    ctx_bg.fillRect(0, 0, cnv_bg.width, cnv_bg.height);
}
//ждем событие изменение инструмента
button_tool.addEventListener("click", changeTool);

function changeTool(){
    let btn = document.getElementById("tool");
    if(btn.textContent == "Кисточка"){
        btn.textContent = "Ластик";
        tool = "Ластик";
    }
    else{
        btn.textContent = "Кисточка";
        tool = "Кисточка";
    }
}
// ждем событие клик по кнопке очистки холста
button_clear.addEventListener("click", clearCanvas);

function clearCanvas(){
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    
}