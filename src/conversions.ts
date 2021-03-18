/**
 * Convert rgb to hex
 *
 * @param r number between 0 - 255
 * @param g number between 0 - 255
 * @param b number between 0 - 255
 * @returns #ffffff
 */
export function rgbToHex(r: number, g: number, b: number): string {
	return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

/**
 * Convert hsl (0-360, 0-100, 0-100) color to rgb(0-255, 0-255, 0-255)
 *
 * @param {number} h number between 0 - 360
 * @param {number} s number between 0 - 100
 * @param {number} l number between 0 - 100
 * @returns {[number, number, number]} [0-255, 0-255, 0-255]
 */
export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
	h /= 360
	s /= 100
	l /= 100

	let r, g, b

	if (s == 0) {
		r = g = b = l // achromatic
	} else {
		const hue2rgb = (p: number, q: number, t: number) => {
			t += t < 0 ? 1 : t > 1 ? -1 : 0
			if (t < 1 / 6) return p + (q - p) * 6 * t
			if (t < 1 / 2) return q
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
			return p
		}

		const q = l < 0.5 ? l * (1 + s) : l + s - l * s
		const p = 2 * l - q
		r = hue2rgb(p, q, h + 1 / 3)
		g = hue2rgb(p, q, h)
		b = hue2rgb(p, q, h - 1 / 3)
	}
	return [(0.5 + r * 255) << 0, (0.5 + g * 255) << 0, (0.5 + b * 255) << 0]
}

/**
 * Convert rbg (0-255, 0-255, 0-255) to hsl (0-360, 0-100, 0-100)
 *
 * @param {number} r number between 0 - 255
 * @param {number} g number between 0 - 255
 * @param {number} b number between 0 - 255
 * @returns {[number, number, number]} (0-360, 0-100, 0-100)
 */
export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
	r /= 255
	g /= 255
	b /= 255
	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)

	const l = (max + min) / 2
	let h: number, s: number

	if (max === min) {
		h = s = 0
	} else {
		const d = max - min
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0)
				break
			case g:
				h = (b - r) / d + 2
				break
			case b:
				h = (r - g) / d + 4
				break
		}
		h = h! / 6
	}

	return [(0.5 + h * 360) << 0, (0.5 + s * 100) << 0, (0.5 + l * 100) << 0]
}
