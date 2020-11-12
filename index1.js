'use strict'
var ctx, vcanvas;
var head = {
    x: 100,
    y: 100,
    wh: 20,
    d: 0 //각도
};
var food = [];

//{
//    x: 300,
//    y: 300,
//    wh: 5
//};
var r_left, r_right, r_up, r_down;
var speed = 11;
var tail = [];
var test = "Hello";

function update() {
    var verAngle = (180 - head.d);
    var horAngle = (360 - head.d);

    if (head.d > 360) {
        head.d = head.d - 360;
    }
    if (head.d < 0) {
        head.d = head.d + 360;
    }
    var degree = head.d / 180 * Math.PI;
    //head.x += 3;

    //꼬리의 위치가 바뀜
    //0번째 꼬리 - head랑 같아야해
    //1번째 꼬리부터 snake의 전 좌표가 되는거지.
    //현재 꼬리가 2개

    //(100, 100) //1번째 꼬리, 1틱 전에 0번째 꼬리
    //(120, 100) //0번째 꼬리
    for (var i = tail.length - 1; i > 0; i--) {
        tail[i] = tail[i - 1];
    }
    tail[0] = {
        x: head.x,
        y: head.y
    };
    //100, 100 -> 120, 100
    //0 - head
    //tail[1] = tail[0]
    //head.x, head.y -?
    //----
    if (r_right === 1) {
        head.d += 10;
        head.x += speed * Math.cos(degree);
        head.y += speed * Math.sin(degree);
    }
    if (r_left === 1) {
        head.d -= 10;
        head.x += speed * Math.cos(degree);
        head.y += speed * Math.sin(degree);
    }
    if (r_right === 0 && r_left === 0) {
        head.x += speed * Math.cos(degree);
        head.y += speed * Math.sin(degree);
    }
    //    if (r_up === 1) {
    //        head.y -= speed;
    //    }
    //    if (r_down === 1) {
    //        head.y += speed;
    //    }

    if (head.x + head.wh > vcanvas.width) {
        head.d = verAngle;
    }
    if (head.x - head.wh < 0) {
        head.d = verAngle;
    }
    if (head.y + head.wh > vcanvas.height) {
        head.d = horAngle;
    }
    if (head.y - head.wh < 0) {
        head.d = horAngle;
    }
}
/*
function collider() {
    //벽 충돌하면 멈추는 판정
    //head.x < 0 -> 왼쪽 벽 판정
    //head.x + head.wh > vcanvas.width -> 오른쪽 벽 판정
    //head.y < 0 -> 위쪽 벽 판정
    //head.y + head.wh > vcanvas.height -> 아래쪽 벽 판정
    if(head.x < 0){
        head.x = 0;
    }
    if(head.x + head.wh > vcanvas.width){
        head.x = vcanvas.width - head.wh;
    }
    if(head.y < 0){
        head.y = 0;
    }
    if(head.y + head.wh > vcanvas.height) {
        head.y = vcanvas.height - head.wh;
    }
}
*/
function eat(pos) {
    var dx = head.x - pos.x;
    var dy = head.y - pos.y;
    var d;

    d = Math.sqrt(dx * dx + dy * dy);
    if (d < head.wh + pos.wh) {
        //꼬리를 증가시킴.
        tail.push({
            x: null,
            y: null
        });
        return true;
    } else {
        return false;
    }

    //1. 속도를 줄인다
    //2. 충돌범위를 넓힌다.
    //3. 
}

function createFood() {
    for (var i = 0; i < 30; i++) {
        food.push({
            x: Math.floor(Math.random() * vcanvas.width / speed) * speed,
            y: Math.floor(Math.random() * vcanvas.height / speed) * speed,
            wh: Math.random() * 5
        });
    }
}

function newLocation(params) {
    //food의 x, y좌표를 랜덤으로 바꿔주면 되겠다.
    //Math.random -> 0~0.9999999...까지를 반환
    params.x = Math.floor(Math.random() * vcanvas.width / speed) * speed;
    //133
    params.y = Math.floor(Math.random() * vcanvas.height / speed) * speed;
}

function drawHead() {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(0, 0, head.wh, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    //head
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(9, -7, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(9, 7, 3, 0, Math.PI * 2);
    ctx.fill();
    //eyes
}

function draw() {
    ctx.save();
    ctx.translate(head.x, head.y);
    ctx.rotate(head.d / 180 * Math.PI);
    drawHead();
    ctx.restore();
}

function drawTail() {
    //꼬리를 그림
    //ctx.fillStyle = "skyblue";
    for (var i = 0; i < tail.length - 1; i++) {
        //ctx.fillRect(tail[i].x, tail[i].y, head.wh, head.wh);
        ctx.fillStyle = `rgb(${255 - i * 20}, 0, 0)`;
        ctx.beginPath();
        ctx.arc(tail[i].x, tail[i].y, head.wh, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawFood(params) {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    //ctx.fillRect(food.x, food.y, food.wh, food.wh);
    ctx.arc(params.x, params.y, params.wh, 0, Math.PI * 2);
    ctx.fill();
}

function gameLoop() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
    update();
    for (var i in food) {
        drawFood(food[i]);
        if (eat(food[i]) === true) {
            newLocation(food[i]);
        }
    }

    //collider();
    
    
    draw();
    drawTail();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    //ctx.fillStyle = "black";
    //ctx.fillRect(head.x, head.y, head.wh, head.wh);
    //ctx.fill();
    createFood();

    setInterval(gameLoop, 50);
}

function set_key() {
    r_left = r_right = r_up = r_down = 0;

    if (event.keyCode === 37) {
        r_left = 1;
    }
    if (event.keyCode === 39) {
        r_right = 1;
    }
    //    if (event.keyCode === 38) {
    //        r_up = 1;
    //    }
    //    if (event.keyCode === 40) {
    //        r_down = 1;
    //    }
}

function stop_key() {
    if (event.keyCode === 37) {
        r_left = 0;
    }
    if (event.keyCode === 39) {
        r_right = 0;
    }
}

document.onkeydown = set_key;
document.onkeyup = stop_key;

//touch일때,
//각도를 구하는 방식은
//var a = Math.atan2(touch의 y좌표-head.y, touch의 x좌표-head.x);
//a * 180 / PI; -> 우리가 아는 360도 각도가 나오게 된다.
