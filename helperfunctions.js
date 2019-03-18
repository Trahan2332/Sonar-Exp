//Contains classes and functions to be used in canvas

class Vector2D {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  
  add(v) {
    if (v instanceof Vector2D) {
      return new Vector2D(this.x + v.x, this.y + v.y)
    }
  }

  subtract(v) {
    if (v instanceof Vector2D) {
      return new Vector2D(this.x - v.x, this.y - v.y);
    }
  }

  magnitude () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  dot(v) {
    if (v instanceof Vector2D) {
      return new Vector2D(this.x * v.x , this.y * v.y);
    }
  }
}


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


// generates random numbers in range [min,max)
function getRandomArbitrary(min,max) {
  return Math.random() * (max - min) + min;
}




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



/* How to Draw...

// Lines
ctx.beginPath();
ctx.moveTo(x,y);//beginning pt.
ctx.lineTo(x, y);// Connects a line to these endpoints. Chain for more lines
ctx.stroke();//tells to draw line

// Arcs & circles
ctx.beginPath();//Always being with this method. Clears old paths and begins a new one.
ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);//travels CW from +x axis
ctx.stroke();//Draws the path specified.

// Rectangles 
ctx.strokeRect(x, y, width, height);//OUTLINES a rectangle according to strokeStyle().
ctx.fillRect(x, y, width, height);//draws a rectangle that is FILLED according to the current fillStyle.

ctx.strokeStyle = 'color' ;//specifies the color, gradient, or pattern to use for the strokes (outlines) around shapes
ctx.fillStyle = color; //specifies the color, gradient, or pattern to use inside shapes.

*/