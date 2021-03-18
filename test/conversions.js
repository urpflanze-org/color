const tap = require('tap')
const { rgbToHsl, hslToRgb, parseColorAndConvert } = require('../dist')

tap.test('conversions', {}, async tap => {
	tap.deepEqual(rgbToHsl(255, 0, 100), [336, 100, 50], 'rgb to hsl')
	tap.deepEqual(hslToRgb(20, 80, 30), [138, 56, 15], 'hsl to rgb')

	tap.deepEqual(
		parseColorAndConvert('#ff0000'),
		{ h: 0, s: 100, l: 100, r: 255, g: 255, b: 255, alpha: 1 },
		'convert hex'
	)

	tap.deepEqual(
		parseColorAndConvert('hsl(20, 80%, 30%)'),
		{ h: 20, s: 80, l: 30, r: 138, g: 56, b: 15, alpha: 1 },
		'convert hsl'
	)

	tap.deepEqual(
		parseColorAndConvert('rgba(255, 255, 255, 1)'),
		{ r: 255, g: 255, b: 255, h: 360, s: 100, l: 100, alpha: 1 },
		'convert rgb'
	)
})
