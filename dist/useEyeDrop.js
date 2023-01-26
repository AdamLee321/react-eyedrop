"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEyeDrop = void 0;
const React = require("react");
const parseRgb_1 = require("./colorUtils/parseRgb");
const rgbToHex_1 = require("./colorUtils/rgbToHex");
const targetToCanvas_1 = require("./targetToCanvas");
const getColor_1 = require("./getColor");
const react_1 = require("react");
const { useEffect, useState } = React;
const initialStateColors = { rgb: '', hex: '' };
const useEyeDrop = ({ once, pickRadius, cursorActive = 'copy', cursorInactive = 'auto', customProps, onPickStart, onPickEnd, onPickCancel, onChange, } = {}) => {
    const [colors, setColors] = useState(initialStateColors);
    const [pickingColorFromDocument, setPickingColorFromDocument] = useState(false);
    const pickColor = () => {
        if (onPickStart) {
            onPickStart();
        }
        setPickingColorFromDocument(true);
    };
    const cancelPickColor = () => {
        if (onPickCancel) {
            onPickCancel();
        }
        setPickingColorFromDocument(false);
    };
    const exitPickByEscKey = (0, react_1.useCallback)((event) => {
        event.code === 'Escape' && pickingColorFromDocument && cancelPickColor();
    }, [pickingColorFromDocument, cancelPickColor]);
    const updateColors = (rgbObj) => {
        const rgb = (0, parseRgb_1.parseRGB)(rgbObj);
        const hex = (0, rgbToHex_1.rgbToHex)(rgbObj);
        setColors({ rgb, hex });
    };
    const extractColor = (0, react_1.useCallback)((e) => __awaiter(void 0, void 0, void 0, function* () {
        const { target } = e;
        if (!target)
            return;
        const targetCanvas = yield (0, targetToCanvas_1.targetToCanvas)(target);
        const rgbColor = (0, getColor_1.getColor)(targetCanvas, e, pickRadius);
        if (onChange) {
            const rgb = (0, parseRgb_1.parseRGB)(rgbColor);
            const hex = (0, rgbToHex_1.rgbToHex)(rgbColor);
            // set color object to parent handler
            onChange({ rgb, hex, customProps });
        }
        updateColors(rgbColor);
        once && setPickingColorFromDocument(false);
        if (onPickEnd) {
            onPickEnd();
        }
    }), [customProps, once, setPickingColorFromDocument]);
    useEffect(() => {
        if (pickingColorFromDocument) {
            document.addEventListener('click', extractColor);
        }
        return () => {
            document.removeEventListener('click', extractColor);
        };
    }, [pickingColorFromDocument, once, extractColor]);
    // setup listener for the esc key
    useEffect(() => {
        if (pickingColorFromDocument) {
            document.addEventListener('keydown', exitPickByEscKey);
        }
        return () => {
            document.removeEventListener('keydown', exitPickByEscKey);
        };
    }, [pickingColorFromDocument, exitPickByEscKey]);
    useEffect(() => {
        if (document.body && (cursorActive && cursorInactive)) {
            document.body.style.cursor = pickingColorFromDocument ? cursorActive : cursorInactive;
        }
    }, [pickingColorFromDocument, cursorActive, cursorInactive]);
    return [colors, pickColor, cancelPickColor];
};
exports.useEyeDrop = useEyeDrop;
