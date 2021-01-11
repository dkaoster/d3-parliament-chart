/* eslint-disable no-undef */
import parliamentChart from '../parliament-chart';

test('empty parliament chart', () => {
  expect(parliamentChart().data()).toMatchSnapshot();
});

test('basic parliament chart', () => {
  expect(parliamentChart([{}, {}, {}, {}], 800).data()).toMatchSnapshot();
});

test('aggregated parliament chart data', () => {
  expect(
    parliamentChart([], 800)
      .aggregatedData([{ seats: 12 }, { seats: 25 }, { seats: 5 }])
      .data(),
  ).toMatchSnapshot();
});

test('parliament chart data overflow', () => {
  expect(
    parliamentChart([], 400)
      .aggregatedData([{ seats: 60 }, { seats: 25 }, { seats: 5 }])
      .data(),
  ).toMatchSnapshot();
});

test('parliament chart data options', () => {
  expect(
    parliamentChart([], 800)
      .aggregatedData([{ seats: 12 }, { seats: 25 }, { seats: 5 }])
      .debug(true)
      .sections(5)
      .sectionGap(20)
      .seatRadius(20)
      .rowHeight(50)
      .data(),
  ).toMatchSnapshot();
});
