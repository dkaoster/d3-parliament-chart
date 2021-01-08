# d3-parliament-chart
parliament / congress / legislature charts simplified

## Installing

If you use NPM, `npm install d3-parliament-chart`. Otherwise, download the [latest release](https://github.com/dkaoster/d3-parliament-chart/releases/latest).

## API Reference

<a href="#parliamentChart" name="parliamentChart">#</a> <i>parliamentChart(data, width)</i>

Given an array of objects and the width of the chart, `parliamentChart()` adds a `x` and a `y` attribute to each element in the array, which specifies the coordinates of each point. The height is automatically set to half of the width. Seats are arranged in order of their polar degrees, left to right corresponding with 0 to data length respectively. Note: if data objects contain x and y values, this library will overwrite those values. If the chart is not big enough to accommodate the given settings, it will fit a half circle and any further data points will not be assigned an x / y value.


## Development Mode

Development mode enables you to work on this library locally.
