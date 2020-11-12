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
var ColorModes;
(function (ColorModes) {
    ColorModes[ColorModes["monochrome"] = 0] = "monochrome";
    ColorModes[ColorModes["rainbow"] = 1] = "rainbow";
})(ColorModes || (ColorModes = {}));
var x = 0;
var y = 0;
var z = 0;
var opacity = 0.8;
var window_width = 100;
var window_height = 100;
var date = new Date();
var time = date.getTime();
var sketchColorMode = ColorModes.monochrome;
function sin(x) {
    return Math.sin(x);
}
function random() {
    return Math.random();
}
function changeColorMode() {
    sketchColorMode = document.getElementById("myonoffswitch").checked == false ? ColorModes.monochrome : ColorModes.rainbow;
    console.log("color mode changed to " + sketchColorMode);
}
var sketch = function (p) {
    p.setup = function () {
        var context = document.getElementById("processingInstance");
        window_width = context.clientWidth;
        window_height = context.clientHeight;
        p.createCanvas(window_width, window_height, "webgl");
    };
    p.draw = function () {
        if (sketchColorMode == ColorModes.rainbow) {
            p.colorMode("hsb");
        }
        else {
            p.colorMode("rgb");
        }
        time = date.getTime();
        p.background(0);
        var cubeSize = ((window_width > window_height) ? window_height : window_width) / 40;
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
                    var actualDimension = Math.max(Math.min(evalValue, 1), -1);
                    var dimensionMapped = p.map(actualDimension, -1, 1, 0, 255);
                    if (sketchColorMode == ColorModes.rainbow) {
                        p.fill(dimensionMapped, 255, 255), opacity * 255;
                    }
                    else {
                        if (actualDimension < 0) {
                            p.fill(255 - dimensionMapped, 0, 0, opacity * 255);
                        }
                        else {
                            p.fill(dimensionMapped, opacity * 255);
                        }
                    }
                    p.sphere(actualDimension * cubeSize);
                    p.pop();
                }
            }
        }
        p.pop();
    };
    p.windowResized = function () {
        var context = document.getElementById("processingInstance");
        window_width = context.clientWidth;
        window_height = context.clientHeight;
        p.createCanvas(window_width, window_height, "webgl");
    };
};
var processingInstance = new p5(sketch, "processingInstance");
//# sourceMappingURL=../sketch/sketch/build.js.map