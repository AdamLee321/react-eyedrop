import * as getCanvasPixelColor from 'get-canvas-pixel-color'
import { extractColors } from './extractColors'
import { calcAverageColor } from './calcAverageColor'

export const getColor = (targetCanvas: HTMLCanvasElement, e: MouseEvent, pickRadius?: number) => {
  const { offsetX, offsetY } = e
  console.log('offsetX', offsetX)
  console.log('offsetY', offsetY)
  if (pickRadius === undefined || pickRadius === 0) {
    return getCanvasPixelColor(targetCanvas, offsetX, offsetY)
  } else {
    const colorBlock = extractColors(targetCanvas, pickRadius, offsetX, offsetY)
    return calcAverageColor(colorBlock)
  }
}
