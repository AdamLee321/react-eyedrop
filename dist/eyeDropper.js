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
exports.EyeDropper = void 0;
const React = require("react");
const parseRgb_1 = require("./colorUtils/parseRgb");
const rgbToHex_1 = require("./colorUtils/rgbToHex");
const validatePickRadius_1 = require("./validations/validatePickRadius");
const targetToCanvas_1 = require("./targetToCanvas");
const getColor_1 = require("./getColor");
const { useCallback, useEffect, useState } = React;
const styles = {
    eyedropperWrapper: {
        position: 'relative',
    },
    eyedropperWrapperButton: {
        backgroundColor: '#000000',
        color: '#ffffff',
        border: '1px solid #ffffff',
        borderRadius: '20%',
        padding: '10px 25px',
    },
};
const initialStateColors = { rgb: '', hex: '' };
const EyeDropper = (props) => {
    const [colors, setColors] = useState(initialStateColors);
    const [pickingColorFromDocument, setPickingColorFromDocument] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const { once = true, pickRadius = 0, onInit, cursorActive = 'copy', cursorInactive = 'auto', onChange, wrapperClasses, buttonClasses, customComponent: CustomComponent, colorsPassThrough, children, customProps, disabled, onPickStart, onPickEnd, } = props;
    const setPickingMode = useCallback(({ isPicking, disableButton, showActiveCursor }) => {
        if (document.body) {
            document.body.style.cursor = showActiveCursor
                ? cursorActive
                : cursorInactive;
        }
        setButtonDisabled(disableButton);
        window.setTimeout(() => {
            setPickingColorFromDocument(isPicking);
        }, 250);
    }, [cursorActive, cursorInactive]);
    const deactivateColorPicking = useCallback(() => {
        setPickingMode({
            isPicking: false,
            disableButton: false,
            showActiveCursor: false,
        });
        onPickEnd && onPickEnd();
    }, [setPickingMode, onPickEnd]);
    const exitPickByEscKey = useCallback((event) => {
        event.code === 'Escape' &&
            pickingColorFromDocument &&
            deactivateColorPicking();
    }, [pickingColorFromDocument, deactivateColorPicking]);
    const pickColor = () => {
        if (onPickStart) {
            onPickStart();
        }
        setPickingMode({
            isPicking: true,
            disableButton: disabled || true,
            showActiveCursor: true,
        });
    };
    const updateColors = useCallback((rgbObj) => {
        const rgb = (0, parseRgb_1.parseRGB)(rgbObj);
        const hex = (0, rgbToHex_1.rgbToHex)(rgbObj);
        // set color object to parent handler
        onChange({ rgb, hex, customProps });
        setColors({ rgb, hex });
    }, [customProps, onChange]);
    const extractColor = useCallback((e) => __awaiter(void 0, void 0, void 0, function* () {
        const { target } = e;
        if (!target)
            return;
        const targetCanvas = yield (0, targetToCanvas_1.targetToCanvas)(target);
        const rgbColor = (0, getColor_1.getColor)(targetCanvas, e, pickRadius);
        updateColors(rgbColor);
        once && deactivateColorPicking();
    }), [deactivateColorPicking, once, pickRadius, updateColors]);
    useEffect(() => {
        onInit && onInit();
    }, [onInit]);
    useEffect(() => {
        pickRadius && (0, validatePickRadius_1.validatePickRadius)(pickRadius);
    }, [pickRadius]);
    // setup listener for canvas picking click
    useEffect(() => {
        if (pickingColorFromDocument) {
            document.addEventListener('click', extractColor);
            document.addEventListener('touchstart', extractColor);
        }
        return () => {
            document.removeEventListener('click', extractColor);
            document.removeEventListener('touchstart', extractColor);
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
        return () => {
            if (document.body) {
                document.body.style.cursor = cursorInactive;
            }
        };
    }, []);
    const shouldColorsPassThrough = colorsPassThrough
        ? { [colorsPassThrough]: colors }
        : {};
    return (React.createElement("div", { style: styles.eyedropperWrapper, className: wrapperClasses }, CustomComponent ? (React.createElement(CustomComponent, Object.assign({ onClick: pickColor }, shouldColorsPassThrough, { customProps: customProps, disabled: buttonDisabled }))) : (React.createElement(React.Fragment, null,
        React.createElement("style", { dangerouslySetInnerHTML: {
                __html: `
            .react-eyedrop-button {
              background-color: #000000;
              color: #ffffff;
              border: 1px solid #ffffff;
              border-radius: 20%;
              padding: 10px 25px;
            }
          `,
            } }),
        React.createElement("button", { id: 'react-eyedrop-button', className: `react-eyedrop-button ${buttonClasses || ''}`, onClick: pickColor, disabled: buttonDisabled }, children)))));
};
exports.EyeDropper = EyeDropper;
