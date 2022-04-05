import { EchartsComponent } from '../src'
import React from 'react'
import { render } from "@testing-library/react";

describe("Test basic usage", () => {
  it("Test construct echart instance", async () => {
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 150,
    })
    let {findByTestId} = render(<EchartsComponent options={{}} />)
    const echartsComponent = await findByTestId("EchartsComponent")
    console.log(echartsComponent)
    // mount(<EchartsComponent options={{}} />)
  })
})