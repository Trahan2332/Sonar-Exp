//Contains classes and functions to be used in canvas

// generates random numbers in range [min,max)
function getRandomArbitrary(min,max) {
  return Math.random() * (max - min) + min;
}

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
      return this.x * v.x  + this.y * v.y;
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
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.stroke();
  }

  update()  {
    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    } 
  
    if ( this.y + this.radius + this.dy > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
    
  }
}


class Ground {
  constructor(points) {
    this.points = points;
    this.numOfDivisions = this.points + 1;
  }

  generateGroundParameters() {
    let lineToX;
    let lineToY;
    let pointsArray = []
    for (let i = 0; i < this.points ; i++) {
      lineToX = (i+1) * canvas.width/this.numOfDivisions;
      lineToY = getRandomArbitrary(0.8,1) * canvas.height;
      pointsArray.push({lineToX,lineToY})
    }
    return pointsArray;
  }

  drawGround(array) {
    ctx.beginPath();
    ctx.moveTo(0,canvas.height)
    for (let i = 0; i < this.points ; i++) {
      ctx.lineTo(array[i].lineToX,array[i].lineToY);
      ctx.stroke();
    }
    ctx.lineTo(canvas.width,canvas.height);
    ctx.stroke();

  }
}


class Segment {
  constructor(x,y,vecx,vecy) {
    this.x = x;
    this.y = y;
    this.vecx = vecx;
    this.vecy = vecy;
  }

  drawSegment (width,color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.x + this.vecx,this.y + this.vecy);//Change vector origin to (this.x,this.y)
    ctx.stroke();
  }

  segmentLength() {
    let deltaX = (this.x + this.vecx) - this.x;
    let deltaY = (this.y + this.vecy) - this.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  }

  updateSegment(circle,width,color) {
    this.vecx = circle.x - this.x;
    this.vecy = circle.y - this.y;
    this.drawSegment(width,color);
  }
}


class MouseControls {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
  
  update() {
      this.x = event.offsetX;
      this.y = event.offsetY;
      console.log(this.x,this.y)
    }    
    
  }
let mouse = new MouseControls();

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