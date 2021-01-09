import getParliamentPoints from './chart-helpers';
import debugGuides from './debug';

/**
 *  ___ ____    ___          _ _                    _       ___ _             _
 * |   \__ /   | _ \__ _ _ _| (_)__ _ _ __  ___ _ _| |_    / __| |_  __ _ _ _| |_
 * | |) |_ \   |  _/ _` | '_| | / _` | '  \/ -_) ' \  _|  | (__| ' \/ _` | '_|  _|
 * |___/___/   |_| \__,_|_| |_|_\__,_|_|_|_\___|_||_\__|   \___|_||_\__,_|_|  \__|
 *
 * A d3 plugin for making semi-circle parliament charts.
 */

export default (data = [], width = 0) => {
  // Dimensions of the graphic
  let graphicWidth = parseFloat(width);

  // clean out any x and y values provided in data objects.
  let rawData = data.map(({ x, y, ...restProps }) => restProps);

  // visual options
  const options = {
    sections: 4,        // Number of sections to divide the half circle into
    sectionGap: 10,     // The gap of the aisle between sections
    seatRadius: 3,      // The radius of each seat
    rowHeight: 12,      // The height of each row
  };

  // Whether we should draw the debug lines or not
  let debug = false;

  // //////////////////////////////////////////////////////////////////////////
  // Selection call
  //
  // This function gets called on instances such as:
  //    d3.select('g').call(parliamentChart())
  const parliamentChart = (selection) => {
    // Sets the graphicWidth based on our selected container
    graphicWidth = selection.node().getBoundingClientRect().width;

    // Get the processed data
    const processedData = parliamentChart.data();

    // Append debug lines
    if (debug) debugGuides(selection, graphicWidth, options);

    const circles = selection
      .append('g')
      .attr('class', 'parliament-chart')
      .selectAll('circle')
      .data(processedData);

    // Edit
    circles.attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', options.seatRadius);

    // Exit
    circles.exit().remove();

    // Add the circles
    return circles.enter()
      .insert('circle')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', options.seatRadius);
  };

  // //////////////////////////////////////////////////////////////////////////
  // Getters and Setters

  // Sets the width and the height of the graphic
  parliamentChart.width = (w) => {
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(w)) {
      // parse the width
      graphicWidth = parseFloat(w);
    }
    return parliamentChart;
  };

  // Create getters and setters for sections, sectionGap, seatRadius, and rowHeight
  ['sections', 'sectionGap', 'seatRadius', 'rowHeight']
    .forEach((attr) => {
      parliamentChart[attr] = (s) => {
        if (s) {
          options[attr] = parseInt(s, 10);
          return parliamentChart;
        }
        return options[attr];
      };
    });

  // enable / disable debug mode
  parliamentChart.debug = (b) => {
    debug = !!b;
    return parliamentChart;
  };

  // //////////////////////////////////////////////////////////////////////////
  // Data Processing
  //
  // Gets the data processed data with x and y coordinates or sets
  // the raw data.
  parliamentChart.data = (d) => {
    // If an argument with new data is provided
    if (d) {
      // clean out any x and y values provided in data objects.
      rawData = d.map(({ x, y, ...restProps }) => restProps);
      return parliamentChart;
    }

    // If width is not set, don't calculate this instance
    if (graphicWidth <= 0 || rawData.length <= 0) return rawData;

    // Check if we have already run this instance
    if (rawData.every((r) => r.x && r.y)) return rawData;

    // The number of points we need to fit
    const totalPoints = rawData.length;

    // The locations of all the points
    const locations = getParliamentPoints(totalPoints, options, graphicWidth);

    // Add locations to the rawData object
    locations.forEach((coords, i) => rawData[i] = ({ ...rawData[i], ...coords }));

    // return the data
    return rawData;
  };

  return parliamentChart;
};
