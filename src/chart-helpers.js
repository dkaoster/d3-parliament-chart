/**
 * Generate the points and angle for a single section of the parliament
 *
 * @param seats - number of seats in this section
 * @param startRad - start radians of this section
 * @param endRad - end radians of this section
 * @param seatRadius - radius of the seats
 * @param rowHeight - height of the row
 * @param graphicHeight - height of the graphic
 * @param sectionGap - The gap between sections
 * @returns {[]}
 */
const generatePartial = ({
  seats, startRad, endRad, seatRadius, rowHeight, graphicHeight, sectionGap,
}) => {
  // Calculate the radius of the graph, because we don't want the poitns to extend
  // beyond the width of the graphic
  const graphRadius = graphicHeight - seatRadius;

  // Final Array
  let points = [];

  // Which row we are currently drawing
  let currentRow = 0;

  // Create all the points
  while (points.length < seats) {
    // The radius of the row we are currently drawing
    const currentRowRadius = graphRadius - (rowHeight * currentRow);

    // We need to also justify for the gap of the section, which radians value varies per row
    const currentRowGapRad = Math.atan((seatRadius + (sectionGap / 2)) / currentRowRadius);
    const currentRowStartRad = startRad + currentRowGapRad;
    const currentRowEndRad = endRad - currentRowGapRad;

    // If our data doesn't fit inside the row or the graph, we just stop
    if (currentRowEndRad <= currentRowStartRad || currentRowRadius <= 0) break;

    // Find the minimum size step given the radius
    const currRadStep = Math.atan((2.5 * (seatRadius)) / currentRowRadius);

    // Find how many seats are in this row
    const rowSeats = Math.min(
      Math.floor((currentRowEndRad - currentRowStartRad) / currRadStep),
      seats - points.length - 1,
    );

    // Get adjusted step size so that things are justified evenly
    // edge case if there is only one seat in this row
    const roundedRadStep = rowSeats
      ? (currentRowEndRad - currentRowStartRad) / rowSeats
      : 0;

    // Add all the seats in this row
    for (let currSeat = 0; currSeat <= rowSeats; currSeat += 1) {
      // Get the current angle of the seat we are drawing
      const currentAngle = rowSeats
        ? (currSeat * roundedRadStep + currentRowStartRad)
        // edge case if there is only one seat in this row, we put it in the middle
        : ((currentRowStartRad + currentRowEndRad) / 2);

      // convert the angle to x y coordinates
      points = points.concat([{
        x: Math.cos(currentAngle)
          * (graphRadius - (rowHeight * currentRow))
          + graphicHeight,
        // flip the y coordinates
        y: graphicHeight - (Math.sin(currentAngle)
          * (graphRadius - (rowHeight * currentRow))
          + seatRadius)
          // Add seatRadius and any sectionGap / 4 so that we vertically center
          + seatRadius + (sectionGap / 4),
        angle: currentAngle,
      }]);
    }
    currentRow += 1;
  }
  return points;
};

/**
 * Generates the list of all points and their x and y positions
 *
 * @param totalPoints - total number of points we want to draw
 * @param sections - total number of sections we want to draw
 * @param sectionGap - gap between sections
 * @param seatRadius - radius of each seat
 * @param rowHeight - height of each row
 * @param graphicWidth - width of the entire graphic
 * @returns {this}
 */
export default (totalPoints, { sections, sectionGap, seatRadius, rowHeight }, graphicWidth) => {
  // Calculate the graphic height
  const graphicHeight = graphicWidth / 2;

  // Get the number of final sections
  const finalSections = Math.min(totalPoints, sections);

  // Angle step per section in radians
  const radStep = Math.PI / finalSections;

  // Divide the seats evenly among the sections, while also calculating
  // the start radians and end radians.
  const sectionObjs = Array(finalSections)
    // First evenly divide the seats into each section
    .fill({ seats: Math.floor(totalPoints / finalSections) })
    // add the start and end radians
    .map((a, i) => ({ ...a, startRad: i * radStep, endRad: (i + 1) * radStep }));

  // There are leftover seats that we need to fit into sections
  // Calculate how many there are
  let leftoverSeats = totalPoints % finalSections;

  // If leftover seats is 0, we can skip this entire section
  if (leftoverSeats !== 0) {
    // We want to add the leftover seats to the center section first, then move outward
    // We do this by separating the sections into two arrays, left and right
    const right = Array(finalSections).fill(null).map((c, i) => i);
    const left = right.splice(0, Math.floor(finalSections / 2)).reverse();

    // Add the seats
    while (leftoverSeats > 0) {
      // Whichever array is longer, we pop from that array and add to that section first
      if (left.length >= right.length) sectionObjs[left.shift()].seats += 1;
      else sectionObjs[right.shift()].seats += 1;

      // decrement leftoverSeats by one
      leftoverSeats -= 1;
    }
  }

  // Call the section partial generation tool for each section
  return sectionObjs.map((s) => generatePartial({
    ...s, seatRadius, rowHeight, graphicHeight, sectionGap,
  }))
    // flatten the array
    .reduce((acc, val) => [...acc, ...val], [])
    // sort by angle
    .sort((a, b) => b.angle - a.angle)
    // remove angle from returned dataset
    .map((r) => {
      const { angle, ...rest } = r;
      return rest;
    });
};
