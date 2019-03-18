const canvas = document.querySelector("canvas");
const topDiv = document.getElementById("top");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');//imports object w/ properties and methods used for drawing shapes,text,images, etc. Must prepend to objects.




// To generate many circles w/ random pos. & vel.
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


const vector = new Vector2D(3,4);
const v2 = new Vector2D(1,2);

console.log(vector.dot(v2));

drawGround(10);