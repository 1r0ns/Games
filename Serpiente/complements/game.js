window.addEventListener("load", init, false);
var canvas, ctx;
var x = 190,y = 150;
var time=0,FPS=0,frames=0,acumDelta=0;
var Speed = 7;

var lastpress;
var dir = 0;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_SPACE = 32;

function init(){
	canvas = document.getElementById("canvas");
	canvas.width = 400;
	canvas.height = 300;
	canvas.style.backgroundColor = "black";
	ctx = canvas.getContext("2d");
	
	run();
	repaint();
}

function run(){
	setTimeout(run,1000/55);
	act();
	
}

function repaint(){
	requestAnimationFrame(repaint);
	var now=Date.now();
    var deltaTime=now-time;
    if(deltaTime>1000)deltaTime=0;
    time=now;
    
    frames++;
    acumDelta+=deltaTime;
    if(acumDelta>1000){
        FPS=frames;
        frames=0;
        acumDelta-=1000;
    }
	paint(ctx);
}

function act(){
	
	if (lastpress == KEY_LEFT)
		dir = 1;
	if ( lastpress == KEY_RIGHT)
		dir = 2;
	if (lastpress == KEY_UP)
		dir = 3;
	if(lastpress == KEY_DOWN)
		dir = 4;
		
	if(dir == 1)
		x -= Speed;
		if (x > canvas.width)
			x = 0;
			
	if(dir == 2)
		x += Speed;
		if (x < 0)
			x = canvas.width;
			
	if(dir == 3)
		y -= Speed;
		if (y > canvas.height)
			y = 0;
			
	if(dir == 4)
		y += Speed;
		if (y < 0)
			y = canvas.height;
			
}
function paint(ctx){
    ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = "#0f0";
	ctx.fillRect(x,y,25,25);
	ctx.fillText("LassPress: "+lastpress,10,20);
	ctx.fillStyle='#fff';
    ctx.fillText('FPS: '+FPS,10,10);
}

document.addEventListener ("keydown", function(e){
	lastpress = e.keyCode;
});

window.requestAnimationFrame=(function(){
    return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        function(callback){window.setTimeout(callback,17);};
})(); 