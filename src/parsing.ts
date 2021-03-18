import { hslToRgb, rgbToHsl } from './conversions'
import { IColor, IConvertedColor } from './types'

/**
 * Convert color to IConvertedColor
 * Supported format: 'hsla?' 'rgba?' 'hex{3,8}' number (0xFFFFFF[FF])
 * hsla format: hsla(360, 100%, 100%, 1)
 * rgba format: rgb(255, 255, 255, 1)
 *
 * @param {(string | number)} color
 * @returns {(IConvertedColor | undefined)}
 */
export function parseColorAndConvert(color: string | number): IConvertedColor | undefined {
	const parsed = parseColor(color)

	if (parsed) {
		if (parsed.type === 'hsl') {
			const [r, g, b] = hslToRgb(parsed.a, parsed.b, parsed.c)
			return {
				r,
				g,
				b,
				h: parsed.a,
				s: parsed.b,
				l: parsed.c,
				alpha: parsed.alpha,
			}
		} else {
			const [h, s, l] = rgbToHsl(parsed.a, parsed.b, parsed.c)
			return {
				h,
				s,
				l,
				r: parsed.a,
				g: parsed.b,
				b: parsed.c,
				alpha: parsed.alpha,
			}
		}
	}
}

/**
 * Convert color to IColor
 * Supported format: 'hsla?' 'rgba?' 'hex{3,8}' number (0xFFFFFF[FF])
 * hsla format: hsla(360, 100%, 100%, 1)
 * rgba format: rgb(255, 255, 255, 1)
 *
 * @param {(string | number)} color
 * @returns {(IColor | undefined)}
 */
export function parseColor(color: string | number): IColor | undefined {
	if (typeof color === 'number') {
		if (color > 0xffffff) {
			return {
				type: 'rgb',
				a: (color >> 24) & 255,
				b: (color >> 16) & 255,
				c: (color >> 8) & 255,
				alpha: (color & 255) / 255,
			}
		} else {
			return { type: 'rgb', a: (color >> 16) & 255, b: (color >> 8) & 255, c: color & 255, alpha: 1 }
		}
	}

	color = color.replace(/\s/g, '')

	let match = /^#([0-9a-f]{3,8})$/i.exec(color)

	if (match) {
		const hex = match[1]
		if (hex.length === 3) {
			return {
				type: 'rgb',
				a: parseInt(hex[0] + hex[0], 16),
				b: parseInt(hex[1] + hex[1], 16),
				c: parseInt(hex[2] + hex[2], 16),
				alpha: 1,
			}
		} else {
			return {
				type: 'rgb',
				a: parseInt(hex[0] + hex[1], 16),
				b: parseInt(hex[2] + hex[3], 16),
				c: parseInt(hex[4] + hex[5], 16),
				alpha: hex.length > 6 ? parseInt(hex.substring(6), 16) / 255 : 1,
			}
		}
	}

	match = /^((hsl|rgb)a?)\((\d+),(\d+)%?,(\d+)%?,?(.+)?\)$/i.exec(color)

	if (match) {
		const [, , type, a, b, c, alpha]: Array<string> = match as RegExpExecArray

		return {
			type: type as 'rgb' | 'hsl',
			a: +a,
			b: +b,
			c: +c,
			alpha: alpha ? +alpha : 1,
		}
	}
}
