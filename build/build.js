var ColorHelper = (function () {
    function ColorHelper() {
    }
    ColorHelper.getColorVector = function (c) {
        return createVector(red(c), green(c), blue(c));
    };
    ColorHelper.rainbowColorBase = function () {
        return [
            color('red'),
            color('orange'),
            color('yellow'),
            color('green'),
            color(38, 58, 150),
            color('indigo'),
            color('violet')
        ];
    };
    ColorHelper.getColorsArray = function (total, baseColorArray) {
        var _this = this;
        if (baseColorArray === void 0) { baseColorArray = null; }
        if (baseColorArray == null) {
            baseColorArray = ColorHelper.rainbowColorBase();
        }
        var rainbowColors = baseColorArray.map(function (x) { return _this.getColorVector(x); });
        ;
        var colours = new Array();
        for (var i = 0; i < total; i++) {
            var colorPosition = i / total;
            var scaledColorPosition = colorPosition * (rainbowColors.length - 1);
            var colorIndex = Math.floor(scaledColorPosition);
            var colorPercentage = scaledColorPosition - colorIndex;
            var nameColor = this.getColorByPercentage(rainbowColors[colorIndex], rainbowColors[colorIndex + 1], colorPercentage);
            colours.push(color(nameColor.x, nameColor.y, nameColor.z));
        }
        return colours;
    };
    ColorHelper.getColorByPercentage = function (firstColor, secondColor, percentage) {
        var firstColorCopy = firstColor.copy();
        var secondColorCopy = secondColor.copy();
        var deltaColor = secondColorCopy.sub(firstColorCopy);
        var scaledDeltaColor = deltaColor.mult(percentage);
        return firstColorCopy.add(scaledDeltaColor);
    };
    return ColorHelper;
}());
var x, y, z;
function sin(x) {
    return Math.sin(x);
}
function random() {
    return Math.random();
}
var date = new Date();
var time = date.getTime();
var sketch = function (p) {
    p.setup = function () {
        var context = document.getElementById("processingInstance");
        var width = parseInt(context.style.width);
        var height = parseInt(context.style.height);
        p.createCanvas(width, height, "webgl");
    };
    p.draw = function () {
        time = date.getTime();
        p.background(0);
        var cubeSize = 15;
        var offset = cubeSize / 2;
        var t = p.millis() / 1000;
        var evaluatedFunction;
        try {
            var evalstring = document.getElementById("codeInput").value.toString();
            if (evalstring.length > 0) {
                evaluatedFunction = new Function('x', 'y', 'z', 't', "return " + evalstring + " ;");
            }
            else {
                evaluatedFunction = new Function('return 1');
            }
        }
        catch (_a) {
            evaluatedFunction = new Function('return 1');
        }
        p.push();
        p.rotateZ(t);
        for (x = 0; x < 10; x++) {
            for (y = 0; y < 10; y++) {
                for (z = 0; z < 10; z++) {
                    p.noStroke();
                    p.fill(255);
                    p.push();
                    p.translate(x * (cubeSize + offset), y * (cubeSize + offset), z * (cubeSize + offset));
                    var evalValue = 1;
                    try {
                        evalValue = evaluatedFunction(x, y, z, t);
                    }
                    catch (_b) {
                        evalValue = 1;
                    }
                    var actualDimension = cubeSize * evalValue;
                    if (actualDimension < 0) {
                        p.fill(255, 0, 0, 30);
                    }
                    else {
                        p.fill(255, 30);
                    }
                    p.box(actualDimension);
                    p.pop();
                }
            }
        }
        p.pop();
    };
};
var processingInstance = new p5(sketch, "processingInstance");
//# sourceMappingURL=../sketch/sketch/build.js.map