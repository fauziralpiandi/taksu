# Taksu

> A controlled-entropy toolkit for modern JavaScript developers.

Generate HQ random `<value>` generation with clean statistical reliability functions. Simple, performant, and type-safe.

## Quick Start

```sh
npm i taksu # or pnpm add taksu
```

```js
// ESM
import { array, bool, color, id, number, uuid } from 'taksu';

// CommonJS
const { array, bool, color, id, number, uuid } = require('taksu');
```

### Arrays

Utilities for `array` randomization:

```ts
import { array } from 'taksu';

const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Pick a random item from array
array.pick(items);

// Shuffle array (Fisher-Yates algorithm)
array.shuffle(items); // Returns new array
array.shuffle(items, { inPlace: true }); // Modifies original array
```

### Booleans

Generate `boolean` values with adjustable probabilities:

```ts
import { bool } from 'taksu';

// Random boolean (50% chance of true)
bool.probability();

// Random boolean with 80% chance of true
bool.probability(0.8);

// Percentage-based chance
bool.chance(75); // 75% chance of true
```

### Colors

Generate random `color` in various formats:

```ts
import { color } from 'taksu';

// Generate random HEX color (16.7M possible values)
color.hex(); // e.g. "#f7e03b"

// Generate random RGB color (8-bit per channel)
color.rgb(); // e.g. "rgb(247, 224, 59)"
```

### Identifiers

Generate various types of random `ID`:

```ts
import { id, uuid } from 'taksu';

// Generate random alphanumeric ID (12 characters by default)
id.alphanumeric();
id.alphanumeric(20); // Custom length

// Generate numeric-only ID
id.numeric(8); // e.g., "12345678"

// Generate UUIDs
uuid.v4(); // RFC 4122 compliant UUID v4
uuid.simple(); // Simple UUID (32 hex chars, no dashes)
```

### Numbers

Generate random `number` with flexible options:

```ts
import { number } from 'taksu';

// Random integer between 0 and 100 (inclusive)
number.integer();

// Random integer between 1 and 10 (inclusive)
number.integer(1, 10);

// Random float between 0 and 1
number.float();

// Random float between 1 and 10 (exclusive upper bound)
number.float(1, 10);
```

Uses a carefully tuned `xorshift128+` implementation for HQ entropy:

- `2^128-1` period - No pattern repetition in practical use
- Balanced statistical distribution - Verified with chi-square tests
- Uniform bit-level entropy - Each bit position has equal probability
- No correlation between sequential values - Passes Pearson tests
