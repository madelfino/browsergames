var ctx;
var player = {
    'x': 0,
    'y': 0,
    'height': 30,
    'width': 30,
    'kills': 0
}
var dots = [];
var gameInterval;

window.onload = function()
{
    var canvas = document.getElementById("stage");
    ctx = canvas.getContext('2d');
    canvas.onmousemove = function(e) {
        player.x = e.clientX - canvas.offsetLeft;
        player.y = e.clientY - canvas.offsetTop;
    };
    canvas.style.cursor = "None";
    gameInterval = setInterval(run, 30);
    poop = setInterval(addDot, 200);
}

function addDot()
{
    dots.push(dot(Math.random() * 200, 0));
}

function run(){
    draw();
    update();
}

function draw()
{
    /* draw black background */
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,200,200);

    /* draw red dots */
    ctx.fillStyle = "rgb(255,0,0)";
    for (var i=0; i<dots.length; ++i)
    {
        ctx.fillRect(dots[i].x, dots[i].y, 2, 2);
    }

    /* draw yellow box */
    ctx.fillStyle = "rgb(255,255,0)";
    ctx.fillRect(player.x - player.width / 2,
                 player.y - player.height / 2,
                 player.width,
                 player.height);
}

function update()
{
    for (var i=dots.length-1; i>=0; --i){
        dots[i].y += 0.3;
        if (dots[i].y > 200){
            alert("you dead");
            clearInterval(poop);
            clearInterval(gameInterval);
        }
        if(dots[i].x >= player.x - player.width / 2 &&
           dots[i].x <= player.x + player.width / 2 &&
           dots[i].y >= player.y - player.height / 2 &&
           dots[i].y <= player.y + player.height / 2){
            dots.splice(i,1);
        }
    }
}

function dot(x, y)
{
    return {'x': x, 'y': y};
}
