import { EchartsComponent } from '../src'
import React from 'react'
import { act, render, screen } from "@testing-library/react";

describe("Test basic usage", () => {
  it("Test construct echart instance", done => {
    act(async () => {
      render(<EchartsComponent option={{}} opts={{width: 1000, height: 1000}} onInit={instance => {console.log("Called");screen.debug();done()}} />)
    }).then(() => {})

    // await (new Promise((resolve) => {
    //   setTimeout(() => {
    //     screen.debug()
    //     resolve(undefined)
    //   }, 1000)
    // }))
    // mount(<EchartsComponent options={{}} />)
  })
})