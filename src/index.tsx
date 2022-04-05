import * as echarts from 'echarts'
import React, {useEffect, useReducer, useRef} from 'react'

export type EventListener = {
  click?: (params: any, context: any) => any
  dblClick?: (params: any, context: any) => any
  mouseDown?: (params: any, context: any) => any
  mouseMove?: (params: any, context: any) => any
  mouseUp?: (params: any, context: any) => any
  mouseOver?: (params: any, context: any) => any
  mouseOut?: (params: any, context: any) => any
  globalOut?: (params: any, context: any) => any
  contextMenu?: (params: any, context: any) => any
  highlight?: (params: any, context: any) => any
  downplay?: (params: any, context: any) => any
  selectChange?: (params: any, context: any) => any
  legendSelectChanged?: (params: any, context: any) => any
  legendSelected?: (params: any, context: any) => any
  legendUnselected?: (params: any, context: any) => any
  legendSelectAll?: (params: any, context: any) => any
  legendInvertSelect?: (params: any, context: any) => any
  legendScroll?: (params: any, context: any) => any
  dataZoom?: (params: any, context: any) => any
  dataRangeSelected?: (params: any, context: any) => any
  timelineChanged?: (params: any, context: any) => any
  timelinePlayChanged?: (params: any, context: any) => any
  restore?: (params: any, context: any) => any
  dataViewChange?: (params: any, context: any) => any
  magicTypeChanged?: (params: any, context: any) => any
  geoSelectChanged?: (params: any, context: any) => any
  geoSelected?: (params: any, context: any) => any
  geoUnselected?: (params: any, context: any) => any
  axisAreaSelected?: (params: any, context: any) => any
  brush?: (params: any, context: any) => any
  brushEnd?: (params: any, context: any) => any
  brushSelected?: (params: any, context: any) => any
  globalCursorTaken?: (params: any, context: any) => any
  rendered?: (params: any, context: any) => any
  finished?: (params: any, context: any) => any
}
export type EchartsOpts = {
  locale?: string, 
  renderer?: 'canvas' | 'svg', 
  devicePixelRatio?: number, 
  useDirtyRect?: boolean,
  ssr?: boolean, 
  width?: number, 
  height?: number
}
export function EchartsComponent({
  option, 
  notMerge, 
  lazyUpdate, 
  replaceMerge, 
  silent, 
  transition, 
  onInit, 
  eventHandlers = {}, 
  theme, 
  opts, 
  ...htmlAtt
}: echarts.SetOptionOpts & React.HTMLAttributes<any> & {
  option?: echarts.EChartsCoreOption, 
  onInit?: (instance: echarts.ECharts) => void, 
  eventHandlers?: EventListener, 
  theme?: string | object, 
  opts?: EchartsOpts
}) {
  let [_, makeReady] = useReducer(() => true, false)
  useEffect(() => {
    window.addEventListener("load", makeReady)
    return () => {
      window.removeEventListener("load", makeReady)
    }
  })
  const el = useRef<HTMLDivElement>(null)
  const currentTheme = useRef<string | object | null | undefined>(null)
  const currentOpts = useRef<EchartsOpts | null | undefined>(null)
  let instance : echarts.ECharts | undefined = undefined
  const container = el?.current
  if (container !== null) {
    if (currentTheme.current !== theme || currentOpts.current !== opts) {
      currentTheme.current = theme
      currentOpts.current = opts
      echarts.dispose(container)
      const ec = echarts.init(container, theme, opts)
      if (typeof onInit === "function") 
        onInit(ec)
    }
    instance = echarts.getInstanceByDom(container)
  }

  if (instance !== undefined) {
    if (option !== undefined)
      instance.setOption(option, {notMerge, lazyUpdate, replaceMerge, silent, transition})
    for (let [event, handler] of Object.entries(eventHandlers)) {
      instance.on(event.toLowerCase(), handler)
    }
  }
  return <div data-testid="EchartsComponent" ref={el} {...htmlAtt}/>
}