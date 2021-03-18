/**
 *
 * @internal
 * @ignore
 * @interface IColor
 */
export interface IColor {
	type: 'rgb' | 'hsl'
	a: number
	b: number
	c: number
	alpha: number
}

/**
 *
 * @internal
 * @ignore
 * @interface IConvertedColor
 */
export interface IConvertedColor {
	r: number
	g: number
	b: number
	h: number
	s: number
	l: number
	alpha: number
}
