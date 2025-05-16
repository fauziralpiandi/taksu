# Taksu

> A controlled-entropy toolkit for modern JavaScript developers.

**Taksu** is a lightweight utility library providing essential random generation functions in a clean, namespaced API structure. It's designed to be simple, performant, and type-safe.

## 🚀 Quick Start

```sh
npm i taksu # or pnpm add taksu
```

```js
// ESM
import { array, bool, color, id, number, uuid } from 'taksu';

// CommonJS
const { array, bool, color, id, number, uuid } = require('taksu');
```

## 📊 API Reference

### Arrays

Utilities for array randomization:

```ts
import { array } from 'taksu';

const items = [1, 2, 3, 4, 5];

// Pick a random item from array
array.pick(items);

// Shuffle array
array.shuffle(items); // Returns new array
array.shuffle(items, { inPlace: true }); // Modifies original array
```

### Booleans

Generate boolean values with adjustable probabilities:

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

Generate random colors in various formats:

```ts
import { color } from 'taksu';

// Generate random HEX color
color.hex(); // e.g. "#f7e03b"

// Generate random RGB color
color.rgb(); // e.g. "rgb(247, 224, 59)"
```

### Identifiers

Generate various types of random IDs:

```ts
import { id, uuid } from 'taksu';

// Generate random alphanumeric ID (12 characters by default)
id.alphanumeric();
id.alphanumeric(20); // Custom length

// Generate numeric-only ID
id.numeric(8); // e.g., "12345678"

// Generate UUIDs
uuid.v4(); // Standard UUID v4
uuid.simple(); // Simple UUID (no dashes)
```

### Numbers

Generate random numbers with flexible options:

```ts
import { number } from 'taksu';

// Random integer between 0 and 100 (inclusive)
number.integer();

// Random integer between 1 and 10 (inclusive)
number.integer(1, 10);

// Random float between 0 and 1
number.float();

// Random float between 1 and 10
number.float(1, 10);
```

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo, make your stuff, and submit PRs.

---

[MIT License](LICENSE)
