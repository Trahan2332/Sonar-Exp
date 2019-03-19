const canvas = document.querySelector("canvas");
const topDiv = document.getElementById("top");
const ctx = canvas.getContext('2d');//imports object w/ properties and methods used for drawing shapes,text,images, etc. Must prepend to objects.

// set canvas boundaries
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - topDiv.offsetHeight;




// To generate many circles w/ random pos. & vel.
let circleArray = [];

for (let i = 0; i < 1; i++) {
  let radius = 15;
  let x = Math.random() * (canvas.width - 2 * radius) + radius;//disallows generating circle on border
  let y = Math.random() * (canvas.height - 2 * radius) + radius;
  let dx = (Math.random()) * 2;
  let dy = (Math.random()) * 2;
  const circle = new Circle(x,y,radius,dx,dy);
  circleArray.push(circle);
}



// To generate ground profile.
const P = new Ground(3);//create an instance of ground class with desired number of interior points.
const groundParam = P.generateGroundParameters();//returns an array of obj's [{}], containing the x,y coordinates of the interior line points to be plotted.

const x1=100;
const y1=100;
const vx1 = 200;
const vy1 = 200
const segment1 = new Segment(x1,y1,vx1,vy1);

const segment2 = new Segment(x1,y1,circleArray[0].x-x1,circleArray[0].y-y1)




// To animate
function animate() {
  requestAnimationFrame(animate);//inf loops by calling itself.
  ctx.clearRect(0,0,innerWidth,innerHeight);//erases pixels in rect area. Set before .beginPath()
  circleArray.forEach(circle => circle.update());//Calls method of Circle class
  //P.drawGround(groundParam);
  segment1.drawSegment(2, 'red');
  segment2.updateSegment(circleArray[0],2,'orange');
}
animate();






