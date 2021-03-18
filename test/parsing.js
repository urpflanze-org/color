const tap = require('tap')
const { parseColor, parseColorAndConvert } = require('../dist')

tap.test('parsing', async t => {
	t.deepEqual(
		parseColor('rgb(255, 0, 100)'),
		{
			type: 'rgb',
			a: 255,
			b: 0,
			c: 100,
			alpha: 1,
		},
		'rgb'
	)
	t.deepEqual(parseColor('rgba(255,0,100, .2)'), { type: 'rgb', a: 255, b: 0, c: 100, alpha: 0.2 }, 'rgba')

	t.deepEqual(parseColor('hsl(20,80%,30%,.8)'), { type: 'hsl', a: 20, b: 80, c: 30, alpha: 0.8 }, 'hsl')
	t.deepEqual(parseColor('hsla(20,80%,30%,.8)'), { type: 'hsl', a: 20, b: 80, c: 30, alpha: 0.8 }, 'hsla')

	t.deepEqual(parseColor('#f70'), { type: 'rgb', a: 255, b: 119, c: 0, alpha: 1 }, 'hex 3')
	t.deepEqual(parseColor('#ff7700'), { type: 'rgb', a: 255, b: 119, c: 0, alpha: 1 }, 'hex 6')
	t.deepEqual(parseColor('#ff770066'), { type: 'rgb', a: 255, b: 119, c: 0, alpha: 0.4 }, 'hex 8')

	t.deepEqual(parseColor(0xff7700), { type: 'rgb', a: 255, b: 119, c: 0, alpha: 1 }, 'number')
	t.deepEqual(parseColor(0xff7700cc), { type: 'rgb', a: 255, b: 119, c: 0, alpha: 204 / 255 }, 'number alpha')

	tap.deepEqual(parseColorAndConvert('#ff0000'), { h: 0, s: 100, l: 50, r: 255, g: 0, b: 0, alpha: 1 }, 'convert hex')

	tap.deepEqual(
		parseColorAndConvert('hsl(20, 80%, 30%)'),
		{ h: 20, s: 80, l: 30, r: 138, g: 56, b: 15, alpha: 1 },
		'convert hsl'
	)

	tap.deepEqual(
		parseColorAndConvert('rgba(255, 255, 255, 1)'),
		{ r: 255, g: 255, b: 255, h: 0, s: 0, l: 100, alpha: 1 },
		'convert rgb'
	)
})
