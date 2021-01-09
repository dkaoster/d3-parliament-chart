<script>
  import * as d3 from 'd3';
  import * as parliamentChart from '../../build/d3-parliament-chart.es';

  let width, svg;

  const data = new Array(100).fill({});

  $: svgSelection = svg && d3.select(svg);
  $: svgSelection && width && svgSelection
    .call(parliamentChart.parliamentChart(data).debug(true))
    .attr('fill', 'black');
</script>

<style>
  .wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chart {
    width: 100%;
    max-width: 800px;
  }

  svg {
    width: 100%;
  }
</style>

<div class="wrapper">
  <div class="chart" bind:clientWidth={width}>
    <svg viewBox="0 0 {width} {width / 2}" bind:this={svg} />
  </div>
</div>
