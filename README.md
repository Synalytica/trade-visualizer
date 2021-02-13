# Trade Visualizer

![example-output](public/example.png)

## Installation

```bash
npm install
```

## Running

- Place the trade json in the public folder under the name `data.json`. It
  should follow the following format:

```js
{
    "candles": [
        {
            time: 1529884800,
            open: "2134.234",
            high: "2354",
            low: "234",
            close: "2365" 
        },
        ...
    ],
    "orders": [
        {
            time: 1529884800,
            position:
            color:
            shape:
            id:
            text:
            size:
        }
    ]
}
```

- Note: timestamp should be formatted as mentioned
  [here](https://github.com/tradingview/lightweight-charts/blob/master/docs/time.md)
- Each order is a marker object as defined
  [here](https://github.com/tradingview/lightweight-charts/blob/master/docs/series-basics.md#setmarkers)

