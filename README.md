# Taksu

> A controlled-entropy toolkit for modern developers.

**Taksu** is a library for generating random values. It's designed to be simple, performant, and type-safe.

## 🚀 Quick Start

```sh
npm i taksu # or pnpm add taksu
```

```js
// ESM
import * as taksu from 'taksu';

// CommonJS
const taksu = require('taksu');
```

## 📊 API Reference

### Type Definitions

For TypeScript users, these are the type definitions for the API:

```ts
// Number function types
interface NumberOptions {
  min?: number; // Minimum value (default: 0)
  max?: number; // Maximum value (default: 1)
  float?: boolean; // Generate floating point (default: false)
}
function number(options?: NumberOptions): number;

// Boolean function types
function bool(probability?: number): boolean; // probability default: 0.5

// Array function types
type SamplingOptions = {
  allowDuplicates?: boolean; // Allow same item multiple times (default: false)
};
function pick<T>(array: readonly T[]): T;
function shuffle<T>(array: readonly T[]): T[];
function sample<T>(
  array: readonly T[],
  count: number,
  options?: SamplingOptions,
): T[];

// ID generation types
function id(length?: number): string; // length default: 12
function uuid(): string; // Returns UUID v4 format

// Color generation types
function color(): string; // Returns hex color format (#RRGGBB)
```

### Numbers

Generate random `number` with configurable ranges and types:

```ts
import { number } from 'taksu';

// Random integer between 0 and 1 (inclusive)
number();

// Random integer between 1 and 10 (inclusive)
number({ min: 1, max: 10 });

// Random float between 0 and 1
number({ float: true });

// Random float between 1 and 10
number({ min: 1, max: 10, float: true });
```

### Booleans

Generate `boolean` values with adjustable probabilities:

```ts
import { bool } from 'taksu';

// Random boolean (50% chance of true)
bool();

// Random boolean with 80% chance of true
bool(0.8);
```

### Arrays

Utilities for `array` randomization:

```ts
import { pick, shuffle, sample } from 'taksu';

const array = [1, 2, 3, 4, 5];

// Pick a random item from array
pick(array);

// Shuffle array (returns a new array)
shuffle(array);

// Get 3 random unique items from array
sample(array, 3);

// Get 10 random items from array with duplicates allowed
sample(array, 10, { allowDuplicates: true });
```

### Identifiers

Generate random `ID` and `UUID`:

```ts
import { id, uuid } from 'taksu';

// Generate random alphanumeric ID (12 characters by default)
id();

// Generate random alphanumeric ID with custom length
id(20);

// Generate random UUID v4
uuid();
```

### Colors

Generate random `HEX` color values:

```ts
import { color } from 'taksu';

// Generate random hex color
color(); // e.g. "#f7e03b"
```

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo, make your stuff, and submit PRs.

---

[MIT License](LICENSE)
