# object-action-recorder

Object action recorder by Proxy.

[![Dependency Status](https://david-dm.org/plantain-00/object-action-recorder.svg)](https://david-dm.org/plantain-00/object-action-recorder)
[![devDependency Status](https://david-dm.org/plantain-00/object-action-recorder/dev-status.svg)](https://david-dm.org/plantain-00/object-action-recorder#info=devDependencies)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/object-action-recorder?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/object-action-recorder/branch/master)
![Github CI](https://github.com/plantain-00/object-action-recorder/workflows/Github%20CI/badge.svg)
[![npm version](https://badge.fury.io/js/object-action-recorder.svg)](https://badge.fury.io/js/object-action-recorder)
[![Downloads](https://img.shields.io/npm/dm/object-action-recorder.svg)](https://www.npmjs.com/package/object-action-recorder)
[![gzip size](https://img.badgesize.io/https://unpkg.com/object-action-recorder?compression=gzip)](https://unpkg.com/object-action-recorder)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fplantain-00%2Fobject-action-recorder%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/object-action-recorder)

## install

`yarn add object-action-recorder`

## usage

```ts
import ObjectActionRecorder from "object-action-recorder";
// <script src="./node_modules/object-action-recorder/object-action-recorder.min.js"></script>

const recorder = new ObjectActionRecorder<CanvasRenderingContext2D>()
let ctx = document.createElement('canvas').getContext('2d')
ctx = new Proxy(ctx, recorder)
ctx.fillStyle = 'green'
ctx.fillRect(10, 10, 150, 100)
console.info(recorder.actions)

/*
(2) [{…}, {…}]
  0:
    name: "fillStyle"
    target: CanvasRenderingContext2D {canvas: canvas, globalAlpha: 1, globalCompositeOperation: "source-over", filter: "none", imageSmoothingEnabled: true, …}
    type: "set"
    value: "green"
    __proto__: Object
  1:
    args: (4) [10, 10, 150, 100]
    name: "fillRect"
    target: CanvasRenderingContext2D {canvas: canvas, globalAlpha: 1, globalCompositeOperation: "source-over", filter: "none", imageSmoothingEnabled: true, …}
    type: "method"
    __proto__: Object
*/
```
