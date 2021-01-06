const generatePartial = (
  totalPoints, startRad, endRad, angleOffset, seatRadius, graphRadius, rowHeight, graphicHeight
) => {
  // Final Array
  let points = [];

  // Which Row are we currently drawing
  let currentRow = 0;

  // Create all the points
  while (points.length < totalPoints) {

    // Find the minimum size step given the radius
    const currRadStep = Math.atan(
      2 * (seatRadius + 1) / (graphRadius - (rowHeight * currentRow))
    );

    // Find how many seats are in this row
    const rowSeats = Math.min(
      Math.floor((endRad - startRad) / currRadStep),
      totalPoints - points.length - 1
    );

    // Get adjusted step size
    const roundedRadStep = (endRad - startRad) / rowSeats;

    // Add all the seats in this row
    for (let currSeat = 0; currSeat <= rowSeats; currSeat++) {
      const currentAngle = currSeat * roundedRadStep + startRad;
      points = points.concat([{
        cx: Math.cos(currentAngle)
          * (graphRadius - (rowHeight * currentRow))
          + graphicHeight,
        cy: Math.sin(currentAngle)
          * (graphRadius - (rowHeight * currentRow))
          + seatRadius,
        angle: currentAngle + angleOffset
      }]);
    }
    currentRow++;
  }
  return points;
};

// Space out the points
const offsetPoints = (points, section, numSections) => {
  const angle = (Math.PI / (numSections * 2)) + section * Math.PI / numSections;
  const xOffset = Math.cos(angle) * 35;
  const yOffset = Math.sin(angle) * 35;
  return points.map(p => ({ ...p, cx: p.cx + xOffset, cy: p.cy + yOffset }))
};

const generatePoints = (
  totalPoints, numSections, ...restProps
) => {
  let points = [];

  // Split the points into sections so we have some more visual distinction
  for (let i = 0; i < numSections; i++) {
    points = points.concat(offsetPoints(
      generatePartial(
        totalPoints / numSections,
        i * Math.PI / numSections,
        (i + 1) * Math.PI / numSections,
        i * 0.000001,
        ...restProps
      ),
      i,
      numSections
    ))
  }

  return points.sort((a, b) => b.angle - a.angle);
};

export default generatePoints;
