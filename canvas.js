const canvas = document.querySelector("canvas");
const topDiv = document.getElementById("top");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');//imports object w/ properties and methods used for drawing shapes,text,images, etc. Must prepend to objects.

// Rectangles ctrl+k+c comments out while ctrl+k+u uncomments
// ctx.fillStyle = 'rgba(255,0,0,0.5)';
// ctx.fillRect(0,0,100,100);//(x,y) dist from top left corner
// ctx.fillStyle = 'rgba(0,255,0,0.5)';
// ctx.fillRect(250,100,100,100);
// ctx.fillStyle = 'rgba(0,0,255,0.5)';
// ctx.fillRect(400,500,50,50);

// Lines
// ctx.beginPath();
// ctx.moveTo(0,canvas.height);//beginning pt.
// ctx.lineTo(canvas.width/2,0.9*canvas.height);
// ctx.lineTo(canvas.width,canvas.height);//ending or intermediary pt.
// ctx.strokeStyle = 'rgba(100,100,255,1)';//colors line
// ctx.stroke();//tells to draw line



// Arcs & circles
// ctx.beginPath();//Separates connecting line from final line point.
// ctx.arc(100,100,25,0,-Math.PI/2,true);//startAngle & endAngle measures CW from +x-axis
// ctx.stroke();
// ctx.beginPath();
// ctx.arc(300,300,45,0,Math.PI * 2,);
// ctx.stroke();


class Circle {
  constructor(x, y,radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
  }

    draw ()  {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.stroke();
  }

  update()  {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    } 
  
    if ( this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}


// To generate many circles w/ random properties
let circleArray = [];

for (let i = 0; i < 1; i++) {
  let radius = (Math.random() + 1 )* 15;
  let x = Math.random() * (innerWidth - 2 * radius) + radius;
  let y = Math.random() * (innerHeight - 2 * radius) + radius;
  let dx = (Math.random() - 0.5) * 10;
  let dy = (Math.random() - 0.5) * 10;
  const circle = new Circle(x,y,radius,dx,dy);
  circleArray.push(circle);
}



// To animate
function animate() {
  requestAnimationFrame(animate);//inf loops by calling itself.
  ctx.clearRect(0,0,innerWidth,innerHeight);//erases pixels in rect area. Set before .beginPath()
  circleArray.forEach(circle => circle.update());//Calls method of Circle class
}
//animate();


// generates random numbers in range [min,max)
function getRandomArbitrary(min,max) {
  return Math.random() * (max - min) + min;
}

function generatePoint(num,x,y) {
  let myArray = [];
  for (let i = 0; i < num + 1; i++) {
    myArray.push(ctx.lineTo((i+1) * x/(num+1), getRandomArbitrary(0.9,1) * y));
    return myArray;
  }
}

console.log(ctx.lineTo(canvas.width,canvas.height));


// generates ground profile, input num denotes the number of central points
function drawGround(num) {

  const numOfDivisions = num + 1;// number of divisions
  const randPercentCanvasHeight1 = getRandomArbitrary(0.9,1);
  const randPercentCanvasHeight2 = getRandomArbitrary(0.9,1);

  ctx.beginPath();
  ctx.moveTo(0,canvas.height)
    for (let i = 0; i < num ; i++) {
      ctx.lineTo((i+1) * canvas.width/numOfDivisions, getRandomArbitrary(0.8,1) * canvas.height)
    }
  
  //ctx.lineTo(canvas.width/numOfDivisions,randPercentCanvasHeight1*canvas.height);
  //ctx.lineTo(num * (canvas.width/numOfDivisions),randPercentCanvasHeight2*canvas.height);
  ctx.lineTo(canvas.width,canvas.height);
  ctx.stroke();
}

drawGround(10);