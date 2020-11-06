let x, y, z;
let width: number=100;
let height: number = 100;
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
    width = context.clientWidth;
    height = context.clientHeight;
    p.createCanvas(width, height, "webgl");

    p.colorMode("hsb");

  };

  p.draw = () => {
    time = date.getTime();
    p.background(0);
    let cubeSize = ((width>height)?height:width)/40;
    let offset = cubeSize *1.14;
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
    
    p.rotateZ(t/5 );
    p.rotateX(t/5 );
    p.rotateY(t/5 );

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
          let actualDimension = Math.max(Math.min(evalValue, 1), -1) * cubeSize;
          //p.ambientMaterial(255,255,255);
          p.fill(p.map(actualDimension/cubeSize,-1,1,0,255),  255, 255);
          //p.normalMaterial();
          p.sphere(actualDimension);
          //p.box(actualDimension);
          p.pop();
        }

      }

    }
    p.pop();
  };

  p.windowResized = () => {
    let context = document.getElementById("processingInstance");
    width = context.clientWidth;
    height = context.clientHeight;
    p.createCanvas(width, height, "webgl");
  }
};

let processingInstance = new p5(sketch, "processingInstance");