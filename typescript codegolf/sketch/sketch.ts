var sketch = (p: p5) => {
  var x  = 100;
  var y = 200;
  
  p.setup = () => {
    let context=document.getElementById("processingInstance");
    let width:number=parseInt( context.style.width);
    let height:number=parseInt( context.style.height);
    p.createCanvas(width,height);
  };

  p.draw = () => {
    p.background(0);
    p.fill(255);
    p.rect(p.width/2,p.height/2, 50, 50);
  };
};

let processingInstance=new p5(sketch,"processingInstance");