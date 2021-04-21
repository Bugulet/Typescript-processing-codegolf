enum ColorModes {
  monochrome,
  rainbow
}

let x: number = 0;
let y: number = 0;
let z: number = 0;

let opacity: number = 0.8;

let window_width: number = 100;
let window_height: number = 100;

let date = new Date();
let time = date.getTime();

let sketchColorMode: ColorModes = ColorModes.monochrome;



function changeColorMode() {
  sketchColorMode = (document.getElementById("myonoffswitch") as HTMLInputElement).checked == false ? ColorModes.monochrome : ColorModes.rainbow;
  console.log(`color mode changed to ${sketchColorMode}`);
}


var sketch = (p: p5) => {

  p.setup = () => {
    let context = document.getElementById("processingInstance");
    window_width = context.clientWidth;
    window_height = context.clientHeight;
    p.createCanvas(window_width, window_height, "webgl");
  };

  p.draw = () => {
    p.orbitControl(5,5); 
    if (sketchColorMode == ColorModes.rainbow) {
      p.colorMode("hsb");
    }
    else {
      p.colorMode("rgb");
    }
    time = date.getTime();
    p.background(0);
    let cubeSize = ((window_width > window_height) ? window_height : window_width) / 40;
    let offset = cubeSize * 1.14;
    let t = p.millis() / 1000;
    let evaluatedFunction;

    try {
      let evalstring = document.getElementById("codeInput").value.toString();
      if (evalstring.length > 0) {
        evaluatedFunction = new Function('x', 'y', 'z','i', 't', `return ${evalstring} ;`);
      }
      else {
        evaluatedFunction = new Function('return 1');
      }
    }
    catch {
      evaluatedFunction = new Function('return 1');
    }

    p.push();
    
    //cube rotation
    // p.rotateZ(t / 5);
    // p.rotateX(t / 5);
    // p.rotateY(t / 5);
    
    let cameraOffset:number= -10 * (cubeSize + offset) / 2;
    p.translate(cameraOffset,cameraOffset,cameraOffset);

    for (x = 0; x < 10; x++) {
      for (y = 0; y < 10; y++) {

        for (z = 0; z < 10; z++) {
          let i=(z * 10 * 10) + (y * 10) + x;

          p.noStroke();
          p.fill(255);

          p.push();

          p.translate(x * (cubeSize + offset), y * (cubeSize + offset), z * (cubeSize + offset));
          let evalValue = 1;
          try {
            evalValue = evaluatedFunction(x, y, z,i, t);

          }
          catch {
            evalValue = 1;
          }
          let actualDimension = Math.max(Math.min(evalValue, 1), -1);
          let dimensionMapped = p.map(actualDimension, -1, 1, 0, 255)
          if (sketchColorMode == ColorModes.rainbow) {
            p.fill(dimensionMapped, 255, 255), opacity * 255;
          }
          else {

            if (actualDimension < 0) {
              p.fill(255, 127, 0, opacity * 255);
            }
            else {
              p.fill(0,136,255, opacity * 255);
            }
          }
          //p.normalMaterial();
          p.sphere(actualDimension * cubeSize);
          //p.box(actualDimension);
          p.pop();
        }

      }

    }
    p.pop();
  };

  p.windowResized = () => {
    let context = document.getElementById("processingInstance");
    window_width = context.clientWidth;
    window_height = context.clientHeight;
    p.createCanvas(window_width, window_height, "webgl");
  }
};



let processingInstance = new p5(sketch, "processingInstance");