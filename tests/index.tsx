import { EchartsComponent } from '../src'
import React from 'react'
import ReactDOM from 'react-dom/client';
import { act } from "@testing-library/react";

describe("Test basic usage", () => {
  let container: HTMLDivElement;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  })
  afterEach(() => {
    document.body.removeChild(container);
  })
  it("Test construct echart instance", () => {
    act(() => {
      ReactDOM.createRoot(container).render(<EchartsComponent option={{}} opts={{width: 1000, height: 1000}} />)
    })
    let echartRoots = container.querySelectorAll("div[data-testid]")
    expect(echartRoots.length).toBeGreaterThan(0)
    let root = echartRoots.item(0) as HTMLElement
    expect(root.getAttribute("data-testid")).toEqual("EchartsComponent")
  })
})