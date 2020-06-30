/// <reference path="./p5.global-mode.d.ts" />

var x0, x1, x2;
var y0, y1, y2;
var button, resultText;
var sx = 5,
    sy = 5;

function setup() {
    createCanvas(displayWidth, displayHeight);
    button = select("#button");
    resultText = select("#result");
    x0 = select("#x0");
    x1 = select("#x1");
    x2 = select("#x2");
    y0 = select("#y0");
    y1 = select("#y1");
    y2 = select("#y2");

    button.mousePressed(calculation);

    background(255);
}

function calculation() {
    //Denominator
    var den = sq(x0.value()) * x1.value() +
        x0.value() * sq(x2.value()) +
        sq(x1.value()) * x2.value() -
        sq(x2.value()) * x1.value() -
        sq(x1.value()) * x0.value() -
        sq(x0.value()) * x2.value();

    if (den == 0 || isNaN(den)) {
        resultText.html("Mistakes were made, qualcosa nei dati di input non va");
        return;
    }

    var a = (y0.value() * x1.value() +
        x0.value() * y2.value() +
        y1.value() * x2.value() -
        y2.value() * x1.value() -
        y1.value() * x0.value() -
        y0.value() * x2.value()) / den;

    var b = (sq(x0.value()) * y1.value() +
        y0.value() * sq(x2.value()) +
        sq(x1.value()) * y2.value() -
        sq(x2.value()) * y1.value() -
        sq(x1.value()) * y0.value() -
        sq(x0.value()) * y2.value()) / den;

    var c = (sq(x0.value()) * x1.value() * y2.value() +
        x0.value() * sq(x2.value()) * y1.value() +
        sq(x1.value()) * x2.value() * y0.value() -
        sq(x2.value()) * x1.value() * y0.value() -
        sq(x1.value()) * x0.value() * y2.value() -
        sq(x0.value()) * x2.value() * y1.value()) / den;

    resultText.html("f(x)= " +
        (a < 0 ? "" : "+") + a + "x^2 " +
        (b < 0 ? "" : "+") + b + "x " +
        (c < 0 ? "" : "+") + c);
    drawGraph(a, b, c);
}

function drawGraph(a, b, c) {
    background(255);
    //Get dealta x
    var xArray = [x0.value(), x1.value(), x2.value()];
    var deltaX = min(xArray) - max(xArray);
    //Setting for the axis
    stroke(0);
    strokeWeight(1);
    line(width / 2, 0, width / 2, height);
    line(0, height / 2, width, height / 2);
    push(); {
        translate(width / 2, height / 2);
        scale(1, -1);
        stroke(255, 0, 0);
        stroke(255, 0, 0);
        strokeWeight(5);
        point(x0.value() * sx, y0.value() * sy);
        point(x1.value() * sx, y1.value() * sy);
        point(x2.value() * sx, y2.value() * sy);
        stroke(0, 0, 255);
        strokeWeight(2);
        var len = [];
        len.push(getY(a, b, c, min(xArray)));
        for (var i = min(xArray) + 0.5; i <= max(xArray); i += 0.5) {
            len.push(getY(a, b, c, i));
            line((i - 0.5) * sx, len[len.length - 2] * sy, i * sx, len[len.length - 1] * sy);
        }
    }
    pop();
}

function getY(a, b, c, x) {
    return a * sq(x) + b * x + c;
}