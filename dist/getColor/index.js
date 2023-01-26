"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColor = void 0;
const getCanvasPixelColor = require("get-canvas-pixel-color");
const extractColors_1 = require("./extractColors");
const calcAverageColor_1 = require("./calcAverageColor");
const getColor = (targetCanvas, e, pickRadius) => {
    const { offsetX, offsetY } = e;
    if (pickRadius === undefined || pickRadius === 0) {
        return getCanvasPixelColor(targetCanvas, offsetX, offsetY);
    }
    else {
        const colorBlock = (0, extractColors_1.extractColors)(targetCanvas, pickRadius, offsetX, offsetY);
        return (0, calcAverageColor_1.calcAverageColor)(colorBlock);
    }
};
exports.getColor = getColor;
