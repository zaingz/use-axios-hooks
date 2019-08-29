# use-axios-hooks

> axios hooks for react

[![NPM](https://img.shields.io/npm/v/use-axios-hooks.svg)](https://www.npmjs.com/package/use-axios-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-axios-hooks
```

## Usage

```jsx
import React, { Component } from 'react'

import { useMyHook } from 'use-axios-hooks'

const Example = () => {
  const example = useMyHook()
  return (
    <div>{example}</div>
  )
}
```

## License

MIT © [zaingz](https://github.com/zaingz)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
