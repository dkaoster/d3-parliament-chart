const debugColor = '#1abc9c';

/**
 * Draw Debugging circle and section guides.
 */
export default (selection, graphicWidth, options, totalSeats) => {
  const sections = Math.min(totalSeats, options.sections);

  // Create a container for our debug lines
  const g = selection.append('g')
    .attr('class', 'debug')
    .attr('transform', `translate(0, ${options.sectionGap / 4})`);

  // The radius of the semicircle
  const radius = graphicWidth / 2;

  // Semicircle frame
  g.append('path')
    .attr('d', `M${graphicWidth},${radius} a1,1 0 0,0 -${graphicWidth},0 m 0 -${options.sectionGap / 2} l ${graphicWidth} 0`)
    .attr('stroke', debugColor)
    .attr('stroke-width', 2)
    .attr('stroke-dasharray', '5 5')
    .attr('fill', 'none');

  // Section borders
  const radStep = Math.PI / sections;
  for (let i = 1; i < sections; i += 1) {
    const radAngle = radStep * i;

    // If the section gap is 0 we only need to draw one line
    if (options.sectionGap <= 0) {
      g.append('line')
        .attr('x1', radius).attr('y1', radius)
        .attr('x2', (Math.cos(radAngle) * radius) + radius)
        .attr('y2', radius - (Math.sin(radAngle) * radius))
        .attr('stroke', debugColor)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5 5');
    } else {
      // Calculate the offset and draw two lines.
      const offsetX = Math.sin(radAngle) * (options.sectionGap / 2);
      const offsetY = Math.cos(radAngle) * (options.sectionGap / 2);

      g.append('line')
        .attr('x1', radius - offsetX)
        .attr('y1', radius - offsetY)
        .attr('x2', ((Math.cos(radAngle) * radius) + radius) - offsetX)
        .attr('y2', (radius - (Math.sin(radAngle) * radius)) - offsetY)
        .attr('stroke', debugColor)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5 5');

      g.append('line')
        .attr('x1', radius + offsetX)
        .attr('y1', radius + offsetY)
        .attr('x2', ((Math.cos(radAngle) * radius) + radius) + offsetX)
        .attr('y2', (radius - (Math.sin(radAngle) * radius)) + offsetY)
        .attr('stroke', debugColor)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5 5');
    }
  }
};
