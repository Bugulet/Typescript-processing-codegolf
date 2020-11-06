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
var width = 100;
var height = 100;
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
        width = context.clientWidth;
        height = context.clientHeight;
        p.createCanvas(width, height, "webgl");
        p.colorMode("hsb");
    };
    p.draw = function () {
        time = date.getTime();
        p.background(0);
        var cubeSize = ((width > height) ? height : width) / 40;
        var offset = cubeSize * 1.14;
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
        p.rotateZ(t / 5);
        p.rotateX(t / 5);
        p.rotateY(t / 5);
        p.translate(-10 * (cubeSize + offset) / 2, -10 * (cubeSize + offset) / 2, -10 * (cubeSize + offset) / 2);
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
                    var actualDimension = Math.max(Math.min(evalValue, 1), -1) * cubeSize;
                    p.fill(p.map(actualDimension / cubeSize, -1, 1, 0, 255), 255, 255);
                    p.sphere(actualDimension);
                    p.pop();
                }
            }
        }
        p.pop();
    };
    p.windowResized = function () {
        var context = document.getElementById("processingInstance");
        width = context.clientWidth;
        height = context.clientHeight;
        p.createCanvas(width, height, "webgl");
    };
};
var processingInstance = new p5(sketch, "processingInstance");
//# sourceMappingURL=../sketch/sketch/build.js.map