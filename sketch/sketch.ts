let x, y, z;

function sin(x: number) {
  return Math.sin(x);
}
function random() {
  return Math.random();
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
    let cubeSize = 15;
    let offset = cubeSize / 2;
    let t = p.millis() / 1000;
    let evaluatedFunction;
    try {
      let evalstring =document.getElementById("codeInput").value.toString();
      if (evalstring.length > 0) {
        evaluatedFunction = new Function('x', 'y', 'z', 't', `return ${evalstring} ;`);
      }
      else {
        evaluatedFunction = new Function('return 1');
      }
    }
    catch{
      evaluatedFunction = new Function('return 1');
    }
    
    p.push();
    
    p.rotateZ(t / 4);
    p.rotateX(t / 4);
    p.rotateY(t / 4);

    p.translate(-10 * (cubeSize + offset) / 2, -10 * (cubeSize + offset) / 2, -10 * (cubeSize + offset) / 2);
    
    for (x = 0; x < 10; x++) {
      for (y = 0; y < 10; y++) {

        for (z = 0; z < 10; z++) {
          p.noStroke();
          p.fill(255);

          p.push();
          
          p.translate(x * (cubeSize + offset), y * (cubeSize + offset), z * (cubeSize + offset));
          let evalValue = 1;
          try {
            evalValue = evaluatedFunction(x, y, z, t);

          }
          catch {
            evalValue = 1;
          }
          let actualDimension = cubeSize * evalValue;

          if (actualDimension < 0) {
            p.fill(255, 0, 0, 50);
          }
          else {
            p.fill(255, 50);
          }
          
          p.box(actualDimension);
          p.pop();
        }

      }

    }
    p.pop();
  };
};

let processingInstance = new p5(sketch, "processingInstance");