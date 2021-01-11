<script>
  import * as d3 from 'd3';
  import * as pc from '../../build/d3-parliament-chart';

  /**
   * D3 Parliament Chart Test Page
   *
   * Just a svelte-powered test page for testing different parliament layouts.
   */

  let width;
  let svg;
  let seats = 100;
  let seatRadius = 12;
  let rowHeight = 42;
  let sections = 4;
  let sectionGap = 60;
  let debug = false;
  let showColors = true;

  const colors = ['#3498db', '#DDD', '#e74c3c'];

  // Update the data object
  $: data = showColors
    // If randomizing colors, randomly generate an aggregated data array
    ? colors.reduce((acc, color, i) => {
      const maxSeats = seats - acc.reduce((acc2, val) => acc2 + val.seats, 0);
      return acc.concat([{
        color,
        seats: (i === colors.length - 1) ? maxSeats : Math.floor(Math.random() * maxSeats),
      }]);
    }, [])
    // Otherwise, just return blank seats
    : [{ seats }];

  // Get the d3 selection
  $: svgSelection = svg && d3.select(svg);

  // Update chart
  $: {
    if (svgSelection && width) {
      svgSelection
        .call(
          pc.parliamentChart()
            .aggregatedData(data)
            .sections(sections).sectionGap(sectionGap)
            .seatRadius(seatRadius)
            .rowHeight(rowHeight)
            .debug(debug),
        );
    }
  }
</script>

<style>
  .wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #F2F2F2;
    padding: 15px;
  }

  .chart { width: 100%; max-width: 800px; }
  svg { width: 100%; }
  hr { width: 100%; max-width: 800px; border: 1px solid #1abc9c; }

  .content {
    margin-top: 60px;
    width: 100%;
    max-width: 800px;
  }

  h1 { margin: 5px 0; }

  .controls {
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 30px;
    justify-items: stretch;
    width: 100%;
    max-width: 800px;
  }

  .control-pane { padding: 20px 0; }
  input[type="range"] { width: 100%; margin: -0.6em 0 0; }
  label { font-size: 12px; text-transform: uppercase; color: #888; }

  @media screen and (max-width: 768px) {
    .controls { grid-template-columns: auto }
  }
</style>

<div class="wrapper">
  <div class="chart" bind:clientWidth={width}>
    <svg viewBox="0 0 {width} {width / 2}" bind:this={svg} />
  </div>

  <div class="content">
    <h1>D3 Parliament Chart</h1>
  </div>

  <hr />

  <div class="controls">
    <div class="control-pane">
      <label for="seats">seats ({seats})</label>
      <input type="range" min="0" max="1000" bind:value={seats} class="slider" id="seats">

      <label for="seatRadius">seat radius ({seatRadius})</label>
      <input type="range" min="1" max="50" bind:value={seatRadius} class="slider" id="seatRadius">

      <label for="rowHeight">row height ({rowHeight})</label>
      <input type="range" min="1" max="100" bind:value={rowHeight} class="slider" id="rowHeight">

      <label for="sections">sections ({sections})</label>
      <input type="range" min="1" max="12" bind:value={sections} class="slider" id="sections">

      <label for="sectionGap">section gap ({sectionGap})</label>
      <input type="range" min="0" max="200" bind:value={sectionGap} class="slider" id="sectionGap">
    </div>

    <div class="control-pane">
      <input id="debug" type="checkbox" bind:checked={debug}>
      <label for="debug">show debug lines</label>
      <br>
      <input id="showColors" type="checkbox" bind:checked={showColors}>
      <label for="showColors">random colors</label>
    </div>
  </div>
</div>
