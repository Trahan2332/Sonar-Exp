//Contains classes and functions to be used as modules in canvas

class Vector2D {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  
  add(v) {
    if (v instanceof Vector2D)
    return new Vector2D(this.x + v.x, this.y + v.y)
  }
}


const v1 = new Vector2D(4,5);
const v2 = new Vector2D(2,3);
let w = v1.add(v2);





