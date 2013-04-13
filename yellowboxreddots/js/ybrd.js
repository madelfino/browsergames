var DEBUG = false;
var ctx;
var player = {
    'x': 100,
    'y': 100,
    'height': 30,
    'width': 30,
    'kills': 0
}
var dots = [];
var gameInterval;
var killCounter;

window.onload = function()
{
    var canvas = document.getElementById("stage");
    ctx = canvas.getContext('2d');
    canvas.onmousemove = function(e) {
        player.x = e.clientX - canvas.offsetLeft;
        player.y = e.clientY - canvas.offsetTop;
    };
    canvas.style.cursor = "None";
    killCounter = document.getElementById("killCounter");
    gameInterval = setInterval(run, 30);
    poop = setInterval(addDot, 100);
}

function addDot()
{
    dots.push(dot(1 + Math.random() * 198, 0));
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
    killCounter.innerHTML = "Kills: " + player.kills;
}

function update()
{
    for (var i=dots.length-1; i>=0; --i){
        dots[i].y += 0.5;
        if (dots[i].y > 200){
            alert("you dead, kills: " + player.kills);
            debug(dots[i]);
            clearInterval(poop);
            clearInterval(gameInterval);
        }
        if(dots[i].x >= player.x - player.width / 2 &&
           dots[i].x <= player.x + player.width / 2 &&
           dots[i].y >= player.y - player.height / 2 &&
           dots[i].y <= player.y + player.height / 2){
            dots.splice(i,1);
            player.kills++;
        }
    }
}

function dot(x, y)
{
    return {'x': x, 'y': y};
}

function debug(msg)
{
    if(DEBUG)
        console.log(msg);
}
