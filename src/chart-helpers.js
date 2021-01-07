/**
 * Generate the points and angle for a single section of the parliament
 *
 * @param totalPoints
 * @param startRad
 * @param endRad
 * @param seatRadius
 * @param rowHeight
 * @param graphicHeight
 * @returns {[]}
 */
const generatePartial = (totalPoints, startRad, endRad, seatRadius, rowHeight, graphicHeight) => {
  const graphRadius = graphicHeight - seatRadius;

  // Final Array
  let points = [];

  // Which row we are currently drawing
  let currentRow = 0;

  // Create all the points
  while (points.length < totalPoints) {
    // Find the minimum size step given the radius
    const currRadStep = Math.atan(
      (2 * (seatRadius + 1)) / (graphRadius - (rowHeight * currentRow)),
    );

    // Find how many seats are in this row
    const rowSeats = Math.min(
      Math.floor((endRad - startRad) / currRadStep),
      totalPoints - points.length - 1,
    );

    // Get adjusted step size so that things are justified evenly
    const roundedRadStep = (endRad - startRad) / rowSeats;

    // Add all the seats in this row
    for (let currSeat = 0; currSeat <= rowSeats; currSeat += 1) {
      const currentAngle = currSeat * roundedRadStep + startRad;
      points = points.concat([{
        x: Math.cos(currentAngle)
          * (graphRadius - (rowHeight * currentRow))
          + graphicHeight,
        y: Math.sin(currentAngle)
          * (graphRadius - (rowHeight * currentRow))
          + seatRadius,
        angle: currentAngle,
      }]);
    }
    currentRow += 1;
  }
  return points;
};

export default (totalPoints, { sections, sectionGap, seatRadius, rowHeight }, graphicWidth) => {
  const graphicHeight = graphicWidth / 2;
};
