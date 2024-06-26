## Getting started

### 1. Get a copy of the plugin through `npm`

```
$ npm i @ghibrasoft/box-connector
```

### 2. Load the required files

Define these 3 variable names:

```css
:root {
  --connector-line-thickness: 4px; // default value
  --connector-line-color: #d1d5db; // default value
  --connector-line-color-active: #4ade80; // default value
}
```

---

Load the minimized CSS files in your `HTML`.

```html
<link
  rel="stylesheet"
  href="/node_modules/@ghibrasoft/box-connector/dist/style.css"
/>
```

Or in main `CSS`.

```css
@import "/node_modules/@ghibrasoft/box-connector/dist/style.css";
```

### 3. Now you can run the sample

```jsx
import { useState } from "react";
import { Board } from "@ghibrasoft/box-connector";

function App() {
  const boxes = [...Array(7).keys()];
  const [activeStates, setActiveStates] = useState(boxes.map(() => false));
  const CONNECTIONS = [
    { start: 0, end: 1, isActive: activeStates[0] },
    { start: 0, end: 3, isActive: activeStates[0] },
    { start: 2, end: 5, isActive: activeStates[2] },
    { start: 6, end: 5, isActive: activeStates[6] },
  ];
  const uniqueIds = Array.from(new Set(CONNECTIONS.map((conn) => conn.start)));

  const toggleIsActive = (index: number) => {
    setActiveStates((prevStates) =>
      prevStates.map((state, ind) => (ind === index ? !state : state))
    );
  };

  return (
    <div>
      <Board connections={CONNECTIONS} withDot={true} lineCurviness={50}>
        {boxes.map((_, index) => (
          <div key={index} className="box" id={`box${index}`}>
            {`box${index}`}
            {uniqueIds.includes(index) && (
              <button onClick={() => toggleIsActive(index)}>
                Toggle isActive
              </button>
            )}
          </div>
        ))}
      </Board>
    </div>
  );
}

export default App;
```

### Note:

- Ensure the `start box` is positioned on the left side and the `end box` on the right side. `(not under each other)`

  In this case:

  ```jsx
    `correct` --> { start: 0, end: 1 },
    `wrong` --> { start: 0, end: 2 }, <-- The start box is positioned above the end box
  ```

- Don't repeat `{start: Number, end: Number}` pairs in `connections[]`.

  Example:

```jsx
    { start: 0, end: 3 }, <--
    { start: 0, end: 3 }, <--
    { start: 6, end: 5 },
```

- `isActive: activeStates[0]` <-- Specify the index of the toggle box if needed. `(Default: false)`

- Make sure that `--connector-line-thickness` and `borderWeight` values are the same.

### Sample result

![screenshot](https://github.com/Ghibrasoft/box_connectors/assets/96905686/4fda7054-14d4-4562-a3b0-e551c60e37c2)

### Core options

| Name          | Default value | Type                                          | Description                                                               |
| ------------- | ------------- | --------------------------------------------- | ------------------------------------------------------------------------- |
| children      | `<></>`       | `ReactNode (required)`                        | Renders children components.                                              |
| connections   | `[]`          | `{ start: Number, end: Number }[] (optional)` | Sets connections between boxes.                                           |
| className     | `''`          | `String (optional)`                           | Custom CSS class name for styling purposes                                |
| lineCurviness | `50`          | `Number (optional)`                           | Sets the curviness of connector lines. `(min: 10 , max: 200)`             |
| withDot       | `true`        | `Boolean (optional)`                          | Determines whether dots are displayed at the start and end of connectors. |
| borderWeight  | 4             | `4 , 2 , 8 , 10 , 12 (optional)`              | Sets line thickness.                                                      |
