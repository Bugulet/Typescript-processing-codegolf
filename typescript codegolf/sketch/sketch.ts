let x, y, z;
function sin(x: number) {
  return Math.sin(x);
}
let date = new Date();
let time = date.getTime();
var sketch = (p: p5) => {

  p.setup = () => {
    let context = document.getElementById("processingInstance");
    let width: number = parseInt(context.style.width);
    let height: number = parseInt(context.style.height);
    p.createCanvas(width, height, "webgl");
  };

  p.draw = () => {
    time = date.getTime();
    p.background(0);
    let cubeSize = 10;
    let offset = cubeSize / 2;
    let t = p.millis() / 1000;
    try {
      let evalstring = '(x,y,z,t)=>'.toString().concat(document.getElementById("codeInput").value.toString());
      let evaluatedFunction = eval(evalstring);
    }
    for (x = 0; x < 10; x++) {
      for (y = 0; y < 10; y++) {
        for (z = 0; z < 10; z++) {
          p.noStroke();
          p.fill(255);

          p.push();

          p.translate(x * (cubeSize + offset), y * (cubeSize + offset), z * (cubeSize + offset));
          let evalValue = 1;
          try {
            evalValue = evaluatedFunction();
          }
          catch {
            evalValue = 1;
          }
          let actualDimension = cubeSize * evalValue;

          if (actualDimension < 0) {
            p.fill(255, 0, 0, 10);
          }
          else {
            p.fill(255, 10);
          }
          p.box(actualDimension);
          p.pop();
        }

      }

    }
  };
};

let processingInstance = new p5(sketch, "processingInstance");