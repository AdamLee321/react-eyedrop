import { HookOptions } from './types';
declare const initialStateColors: {
    rgb: string;
    hex: string;
};
declare type ReturnValue = [typeof initialStateColors, () => void, () => void];
export declare const useEyeDrop: ({ once, pickRadius, cursorActive, cursorInactive, customProps, onPickStart, onPickEnd, onPickCancel, onChange, }?: HookOptions) => ReturnValue;
export {};
