import * as echarts from 'echarts'
import React, {useEffect, useRef, useState} from 'react'

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

export function EchartsComponent({options, notMerge, lazyUpdate, replaceMerge, silent, transition, onInit, eventHandlers = {}, theme, opts = {}}: echarts.SetOptionOpts & {options: echarts.EChartsCoreOption, onInit?: (instance: echarts.ECharts) => void, eventHandlers?: EventListener, theme?: string | object, opts?: {locale?: string, renderer?: 'canvas' | 'svg', devicePixelRatio?: number, useDirtyRect?: boolean, ssr?: boolean, width?: number, height?: number}}) {
  const el = useRef<HTMLElement>()
  const [instance, setInstance] = useState<echarts.ECharts>()
  useEffect(() => {
      process.nextTick(() => {
        if (el?.current !== undefined && instance !== undefined) {
          const ec = echarts.init(el.current, theme, opts)
          setInstance(ec)
          if (typeof onInit === "function")
            onInit(ec)
        }
      })
  }, [el.current])
  if (instance !== undefined) {
    instance.setOption(options, {notMerge, lazyUpdate, replaceMerge, silent, transition})
    for (let [event, handler] of Object.entries(eventHandlers)) {
      instance.on(event.toLowerCase(), handler)
    }
  }
  
  return React.createElement("div", {"data-testid": "EchartsComponent",  ref: el})
}