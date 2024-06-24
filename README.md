## Getting started

### 1. Get a copy of the plugin through `npm`

```
$ npm i @ghibrasoft/box-connector
```

### 2. Load the required files

You can load the minimized CSS files in your HTML.

```html
<link rel="stylesheet" href="node_modules/box-connect/dist/style.css" />
```

### 3. Now you can run the sample

```jsx
import { Board } from "box-connect";

function App() {
  const boxes = [...Array(7).keys()];

  return (
    <div>
      <Board
        connections={[
          { start: 0, end: 1 },
          { start: 0, end: 3 },
          { start: 2, end: 5 },
          { start: 6, end: 5 },
        ]}
        lineCurviness={50}
        withDot={true}
      >
        {boxes.map((_, index) => (
          <div key={index} id={`box${index}`} className="box">
            {`box${index}`}
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

### Sample result

![screenshot](https://github.com/Ghibrasoft/box_connectors/assets/96905686/568b3da5-a016-4bfd-9260-0a5b1aed9ca0)

### Core options

| Name          | Default value | Type                                          | Description                                                               |
| ------------- | ------------- | --------------------------------------------- | ------------------------------------------------------------------------- |
| children      | `<></>`       | `ReactNode (required)`                        | Renders children components.                                              |
| connections   | `[]`          | `{ start: Number, end: Number }[] (optional)` | Sets connections between boxes.                                           |
| className     | `''`          | `String (optional)`                           | Custom CSS class name for styling purposes                                |
| lineCurviness | `50`          | `Number (optional)`                           | Sets the curviness of connector lines. `(min: 10 , max: 200)`             |
| withDot       | `true`        | `Boolean (optional)`                          | Determines whether dots are displayed at the start and end of connectors. |
