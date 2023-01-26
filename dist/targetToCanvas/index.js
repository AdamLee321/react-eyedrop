"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.targetToCanvas = void 0;
const imageToCanvas_1 = require("./imageToCanvas");
const _html2canvas = require("html2canvas");
const errors_1 = require("../constants/errors");
const elementToCanvas_1 = require("./elementToCanvas");
const html2canvas = _html2canvas;
const targetToCanvas = (target) => {
    if (!(target instanceof HTMLElement)) {
        throw errors_1.TARGET_NOT_HTML_ELEMENT_ERROR;
    }
    if (target instanceof HTMLImageElement) {
        return (0, imageToCanvas_1.imageToCanvas)(target);
    }
    const targetBackgroundImage = window.getComputedStyle(target).backgroundImage;
    if (targetBackgroundImage && targetBackgroundImage !== 'none') {
        return (0, elementToCanvas_1.elementToCanvas)(target);
    }
    return html2canvas(target, { logging: false });
};
exports.targetToCanvas = targetToCanvas;
