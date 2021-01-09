/**
 * Draw Debugging Guides
 */
export default (selection, graphicWidth, options) => {
  const g = selection.append('g')
    .attr('class', 'debug');

  const radius = graphicWidth / 2;

  // Semicircle frame
  g.append('path')
    .attr('d', `M${graphicWidth},${radius} a1,1 0 0,0 -${graphicWidth},0 z`)
    .attr('stroke', '#AAA')
    .attr('stroke-dasharray', '5 5')
    .attr('fill', 'none');

  // Section borders
  const radStep = Math.PI / options.sections;
  for (let i = 1; i < options.sections; i++) {
    const radAngle = radStep * i;
    g.append('line')
      .attr('x1', radius).attr('y1', radius)
      .attr('x2', (Math.cos(radAngle) * radius) + radius).attr('y2', radius - (Math.sin(radAngle) * radius))
      .attr('stroke', '#AAA')
      .attr('stroke-dasharray', '5 5');
  }
}
