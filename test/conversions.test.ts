import tap from 'tap'
import { rgbToHsl, hslToRgb, rgbToHex } from '../src'

tap.test('conversions', {}, async tap => {
	tap.deepEqual(rgbToHsl(255, 0, 100), [336, 100, 50], 'rgb to hsl')
	tap.deepEqual(hslToRgb(20, 80, 30), [138, 56, 15], 'hsl to rgb')
	tap.deepEqual(rgbToHex(255, 0, 255), '#ff00ff', 'convert rgb to hex')
})
