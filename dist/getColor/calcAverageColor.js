"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcAverageColor = void 0;
const errors_1 = require("../constants/errors");
const calcAverageColor = (colorBlock) => {
    const totalPixels = colorBlock.length;
    if (typeof colorBlock !== 'object' || typeof colorBlock.reduce === 'undefined') {
        throw errors_1.VAL_NOT_RGB_OBJ_ARRAY_ERROR;
    }
    if (totalPixels === 0) {
        throw errors_1.ZERO_PIXELS_FOUND_ERROR;
    }
    if (totalPixels === 1) {
        return colorBlock[0];
    }
    const rgbPrimary = colorBlock
        .map(array => JSON.stringify(array))
        .filter((item, index, array) => array.indexOf(item) === index)
        .map(string => JSON.parse(string));
    return { r: rgbPrimary[0][0], g: rgbPrimary[0][1], b: rgbPrimary[0][2] };
};
exports.calcAverageColor = calcAverageColor;
