# Color

This is a tool for color management.

## Install

```shell
npm i -s @urpflanze/color
```

## Usage

You can convert this format:

- `hsla(360, 100%, 100%, 1)` _string_
- `rgb(255, 255, 255, 1)` _string_
- `0xFFFFFF` - `0xFFFFFFFF` _number, number with alpha_
- `#FFF` - `#FFFFFF` _string_

```javascript
import { parseColor } from '@urpflanze/color'
// Or
// const { parseColor } = require('@urpflanze/color')

const color = parseColor('#1fcc9a')

console.log(color)

// Output
// { type: 'rgb', r: 31, g: 204, b: 154, alpha: 1 }
```

Conversions

```javascript
import { hslToRgb /* rgbToHsl */ } from '@urpflanze/color'

const { r, g, b } = hslToRgb('hsl(163, 74%, 46%)')

console.log([r, g, b])

// Output
// [31, 204, 154]
```

Parsing and conversions

```javascript
import { parseColorAndConvert } from '@urpflanze/color'

const converted = hslToRgb('hsl(163, 74%, 46%)')

console.log(converted)

// Output
// {
// 	    r: 31, g: 204, b: 154
// 	    h: 163, s: 74, l: 46
// 	    alpha: 1
// }
```
