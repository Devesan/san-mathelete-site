const BACKGROUN_COLOUR = '#000000'
const LINE_COLOUR = '#FFFFFF'
const LINE_WIDTH = 13;
var currentX = 0
var currentY = 0
var previousX = 0
var previousX = 0

var canvas , context;
function prepareCanvas(){
    canvas = document.getElementById('input-ans');
    context = canvas.getContext('2d');
    context.fillStyle = BACKGROUN_COLOUR;
    context.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
    context.strokeStyle = LINE_COLOUR;
    context.lineWidth = LINE_WIDTH; 
    context.lineJoin = "round"

    var isPainting = false;
    canvas.addEventListener('mousedown',function(event){
        isPainting = true;
        currentX = event.clientX - canvas.offsetLeft;
        currentY = event.clientY- canvas.offsetTop;
    })
    canvas.addEventListener('mousemove',function(event){
        if(isPainting){
            previousX = currentX;
            currentX = event.clientX - canvas.offsetLeft;
            previousY = currentY;
            currentY = event.clientY- canvas.offsetTop;
    
            //console.log(`Current X: ${currentX} and Y coordinate is ${currentY}`)
            
            draw();
        }
        
    })
    canvas.addEventListener('mouseup',function(event){
        isPainting = false;
    })
    canvas.addEventListener('mouseleave',function(event){
        isPainting = false;
    })


    // Touch events
    canvas.addEventListener('touchstart',function(event){
        isPainting = true;
        currentX = event.touches[0].clientX - canvas.offsetLeft;
        currentY = event.touches[0].clientY- canvas.offsetTop;
    })

    canvas.addEventListener('touchcancel',function(event){
        isPainting = false;
    })


    canvas.addEventListener('touchend',function(event){
        isPainting = false;
    })
    document.addEventListener('touchmove',function(event){
        if(isPainting){
            previousX = currentX;
            currentX = event.touches[0].clientX - canvas.offsetLeft;
            previousY = currentY;
            currentY = event.touches[0].clientY- canvas.offsetTop;
    
            console.log(`Current X: ${currentX} and Y coordinate is ${currentY}`)
            
            draw();
        }
        
    })
}

function draw() {
    context.beginPath();
    context.moveTo(previousX, previousY);
    context.lineTo(currentX, currentY);
    context.closePath();
    context.stroke();
}

function clearCanvas(){
 currentX = 0
 currentY = 0
 previousX = 0
 previousX = 0
 context.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);

}