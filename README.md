<div align="center" markdown="1">

<img src="https://raw.githubusercontent.com/dkaoster/d3-parliament-chart/main/demo/parliament-chart.png" width="80%" align="center" />

# d3-parliament-chart
parliament / congress / legislature charts simplified

</div>

## Installing

If you use NPM, `npm install d3-parliament-chart`. Otherwise, download the [latest release](https://github.com/dkaoster/d3-parliament-chart/releases/latest).

## API Reference

<a href="#parliamentChart" name="parliamentChart">#</a> <b>parliamentChart</b>(data, width)

Given an array of objects and the width of the chart, `parliamentChart()` creates an object that can either be used to return processed seat locations or called on a d3 selection directly. The height is automatically set to half of the width. The most basic usage of this plugin:

```js
d3.select('g').call(d3.parliamentChart([
  { color: 'blue' }, { color: 'blue' }, { color: 'green' }, { color: 'red' }
]))
```

Note: if data objects contain x and y values, this library will overwrite those values. If the chart is not big enough to accommodate the given settings, it will fit a half circle and any further data points will not be assigned an x / y value.

<a href="#data" name="data">#</a> <i>pc</i>.<b>data</b>(data)

If data is provided, replaces the raw data in this object. If data is not provided, this function acts like a getter and adds a `x` and a `y` attribute to each element in the array, which specifies the coordinates of each point. Seats are arranged in order of their polar degrees, left to right corresponding with 0 to data length respectively.

<a href="#aggregatedData" name="aggregatedData">#</a> <i>pc</i>.<b>aggregatedData</b>(data)

This function provides a more convenient method to set an aggregated version of the data. It takes an array of objects in which each object has a `seats` key that specifies how many seats this party / color has. For instance, you can pass in:

```
[{ seats: 48, color: 'blue' }, { seats: 2, color: 'black' }, { seats: 50, color: 'red' }] 
```

<a href="#width" name="width">#</a> <i>pc</i>.<b>width</b>(width)

Sets the width used for calculating the points of the parliament chart.

<a href="#sections" name="sections">#</a> <i>pc</i>.<b>sections</b>(sections)

Sets the number of sections we want to show in this parliament chart.

<a href="#sectionGap" name="sectionGap">#</a> <i>pc</i>.<b>sectionGap</b>(sectionGap)

Sets the gap between sections for this parliament chart.

<a href="#seatRadius" name="seatRadius">#</a> <i>pc</i>.<b>seatRadius</b>(seatRadius)

Sets the radius of each seat in this parliament chart.

<a href="#rowHeight" name="rowHeight">#</a> <i>pc</i>.<b>rowHeight</b>(rowHeight)

Sets the height of each row for this parliament chart.

<a href="#seatIcon" name="seatIcon">#</a> <i>pc</i>.<b>seatIcon</b>(icon)

Optionally renders each seat as an SVG icon instead of a circle.  
Icons are automatically scaled to match the seat diameter.

`icon` can be:

1. A string containing an SVG `path` `d` value.
2. A function `(datum, helpers)` that renders the icon using D3 inside the seat element.

If `null` is passed, icon rendering is disabled.

When `icon` is a function, it is called for each seat.  
Inside the function, `this` refers to the seat's SVG group element.

`helpers` includes:

1. `index`
2. `seatRadius`
3. `seatDiameter`
4. `color`
5. `viewBox` (resolved value from `seatIconViewBox`)

```js
const personIconPath = 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z';

d3.parliamentChart(data, 800)
  .seatIcon(personIconPath)
  .seatIconViewBox(24);
```

<a href="#seatIconViewBox" name="seatIconViewBox">#</a> <i>pc</i>.<b>seatIconViewBox</b>(viewBox)

Sets the icon coordinate system used for scaling and centering. Default is `{ width: 24, height: 24 }`.

`seatIconViewBox` can be:

1. A number (square view box): `24` -> `{ width: 24, height: 24 }`
2. An object: `{ width, height }`
3. A function `(datum, helpers) => number | { width, height }`

When `seatIconViewBox` is a function, `helpers` includes:

1. `index`
2. `seatRadius`
3. `seatDiameter`
4. `color`

### Icon Examples

Use a plain SVG path + numeric view box:

```js
const seatPersonIcon = 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z';

pc.parliamentChart()
  .aggregatedData(data)
  .seatIcon(seatPersonIcon)
  .seatIconViewBox(24);
```

Use a font library (Font Awesome):

```js
import { faUser } from '@fortawesome/free-solid-svg-icons';

pc.parliamentChart()
  .aggregatedData(data)
  .sections(sections).sectionGap(sectionGap)
  .seatRadius(seatRadius)
  .rowHeight(rowHeight)
  .seatIcon(faUser.icon[4])
  .seatIconViewBox({ width: faUser.icon[1], height: faUser.icon[0] });
```

Use function-based icon + function-based view box:

```js
pc.parliamentChart()
  .aggregatedData(data)
  .seatIcon(function(datum, helpers) {
    const g = d3.select(this);

    const path =
      datum.party === 'independent'
        ? 'M10 2L2 20h16z'
        : 'M12 2L2 7v10l10 5 10-5V7z';

    g.append('path')
      .attr('d', path)
      .attr('fill', 'currentColor');
  })
  .seatIconViewBox((datum) => (datum.party === 'independent'
    ? { width: 20, height: 20 }
    : 24));
```

<a href="#debug" name="debug">#</a> <i>pc</i>.<b>debug</b>(debug)

Takes a boolean that if true, draws a set of guidelines for what this chart is supposed to look like.

## Development Mode

Development mode enables you to work on this library locally. To run this repo in development mode, run 

``` 
npm run dev
```
