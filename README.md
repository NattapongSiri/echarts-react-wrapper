React component of Echarts.
It requires ECharts version 5.x.
The development is done with React 18.0.

## How to install
`npm -i echarts react echarts-react-wrapper`

It requires peer two dependencies, react and echarts.
I use React 18.0 and Echarts 5.3.2 for testing this component.
## How to use
```tsx
import { EchartsComponent } from 'echarts-react-wrapper'

export function ChartContainer() {
  return <EchartsComponent 
    style={{
      width: 500, 
      height: 500
    }} 
    options={{
      yAxis={
        type: "value"
      },
      xAxis={
        type: "category", 
        data: [0, 1, 2, 3]
      }
      series=[{
        type: "line",
        data: [1, 2, 3, 4]
      }]
    }}
    eventsHandler={{
      click: (params, context) => {
        console.log(params, context)
      }
    }}
  />
}
```

## Supported props
- option - See Echarts' [option](https://echarts.apache.org/en/option.html#title).
- opts - See [init function opts prop](https://echarts.apache.org/en/api.html#echarts.init).
- notMerge, replaceMerge, lazyUpdate - See Echarts' [setOption's opts prop](https://echarts.apache.org/en/api.html#echartsInstance.setOption)
- onInit - A callback function which when ECharts is initialized, it will call this callback with Echarts instance as argument.
- eventsHandler - An object where each key can be one of event name from [here](https://echarts.apache.org/en/api.html#events) and object value must be a function that took `params` and `context` as it arguments. For more details, see this [tutorial](https://echarts.apache.org/handbook/en/concepts/event)

## How to fire an action/event
Use onInit callback to obtains Echarts instance. After that, you can follow this [tutorial](https://echarts.apache.org/handbook/en/concepts/event#writing-code-to-trigger-component-action-manually) to fire an action/event.

## Declarative option
This component support option as an object and merging strategy that Echarts 5 provide.
For example, `replaceMerge: true` will allow user to remove an entry from existing option that Echarts is using.
If original option look like this:
```tsx
import { EchartsComponent } from 'echarts-react-wrapper'

export function ChartContainer({option}) {
  return <EchartsComponent 
    style={{
      width: 500, 
      height: 500
    }} 
    option={option}
    eventsHandler={{
      click: (params, context) => {
        console.log(params, context)
      }
    }}
    replaceMerge={["series"]}
  />
}
```
When first render, option is 
```typescript
{
  yAxis={
    type: "value"
  },
  xAxis={
    type: "category", 
    data: [0, 1, 2, 3]
  }
  series=[{
    id: "data1",
    type: "line",
    data: [1, 2, 3, 4]
  }]
}
```
Then sometime later, option is
```typescript
{
  yAxis={
    type: "value"
  },
  xAxis={
    type: "category", 
    data: [0, 1, 2, 3]
  }
  series=[{
    id: "data2",
    type: "line",
    data: [4, 3, 2, 1]
  }]
}
```
The chart will remove series with id "data1" out and put series with id "data2" in place.

## Programmatically option
There's a use case where each update to option may need complex logic.
It's possible to obtain echarts instance without any option supplied.
For example:
```tsx
import { EchartsComponent } from 'echarts-react-wrapper'

export function ChartContainer({/* list of props that may involve option logic */}) {
  const [echarts, setEcharts] = useState()
  if (echarts !== undefined) {
    // perform some complex logic to generate option
    echarts.setOption(/* option obtain from logic above */, {replaceMerge: [/* field to be modify */]})
  }
  return <EchartsComponent 
    style={{
      width: 500, 
      height: 500
    }} 
    onInit={instance => setEcharts(instance)}
    eventsHandler={{
      click: (params, context) => {
        console.log(params, context)
      }
    }}
  />
}
```
This usage style may be much more efficient if it involve constructing large and complex data or dataset for chart.

## Breaking change
### 0.1.x to 0.2
- Rename eventHandlers to eventsHandler