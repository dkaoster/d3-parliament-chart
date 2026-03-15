/* eslint-disable no-undef */
import parliamentChart from '../parliament-chart';

describe('seatIcon getter/setter', () => {
  test('should get null by default', () => {
    const chart = parliamentChart();
    expect(chart.seatIcon()).toBe(null);
  });

  test('should set and get string icon', () => {
    const chart = parliamentChart();
    const iconPath = 'M12 2L2 7v10l10 5 10-5V7z';
    chart.seatIcon(iconPath);
    expect(chart.seatIcon()).toBe(iconPath);
  });

  test('should set and get function icon', () => {
    const chart = parliamentChart();
    const iconFunc = function () {};
    chart.seatIcon(iconFunc);
    expect(chart.seatIcon()).toBe(iconFunc);
  });

  test('should set icon to null', () => {
    const chart = parliamentChart();
    chart.seatIcon('M12 2L2 7v10l10 5 10-5V7z');
    chart.seatIcon(null);
    expect(chart.seatIcon()).toBe(null);
  });

  test('should return chart instance for chaining when setting', () => {
    const chart = parliamentChart();
    const result = chart.seatIcon('M12 2L2 7v10l10 5 10-5V7z');
    expect(result).toBe(chart);
  });

  test('should not accept invalid types', () => {
    const chart = parliamentChart();
    const numberValue = chart.seatIcon(123);
    expect(numberValue).toBe(null); // Should return current value, not set

    const boolValue = chart.seatIcon(true);
    expect(boolValue).toBe(null); // Should return current value, not set
  });
});

describe('seatIconViewBox getter/setter', () => {
  test('should get default viewBox of 24x24', () => {
    const chart = parliamentChart();
    expect(chart.seatIconViewBox()).toEqual({ width: 24, height: 24 });
  });

  test('should set viewBox from number (square)', () => {
    const chart = parliamentChart();
    chart.seatIconViewBox(32);
    expect(chart.seatIconViewBox()).toEqual({ width: 32, height: 32 });
  });

  test('should set viewBox from object', () => {
    const chart = parliamentChart();
    chart.seatIconViewBox({ width: 16, height: 20 });
    expect(chart.seatIconViewBox()).toEqual({ width: 16, height: 20 });
  });

  test('should set and get viewBox function', () => {
    const chart = parliamentChart();
    const viewBoxFunc = () => ({ width: 20, height: 30 });
    chart.seatIconViewBox(viewBoxFunc);
    expect(chart.seatIconViewBox()).toBe(viewBoxFunc);
  });

  test('should return chart instance for chaining when setting with number', () => {
    const chart = parliamentChart();
    const result = chart.seatIconViewBox(32);
    expect(result).toBe(chart);
  });

  test('should return chart instance for chaining when setting with object', () => {
    const chart = parliamentChart();
    const result = chart.seatIconViewBox({ width: 16, height: 20 });
    expect(result).toBe(chart);
  });

  test('should return chart instance for chaining when setting with function', () => {
    const chart = parliamentChart();
    const viewBoxFunc = () => ({ width: 20, height: 30 });
    const result = chart.seatIconViewBox(viewBoxFunc);
    expect(result).toBe(chart);
  });

  test('should not accept invalid types', () => {
    const chart = parliamentChart();
    const stringValue = chart.seatIconViewBox('invalid');
    expect(stringValue).toEqual({ width: 24, height: 24 }); // Should return current value

    const invalidObject = chart.seatIconViewBox({ width: 10 }); // missing height
    expect(invalidObject).toEqual({ width: 24, height: 24 }); // Should return current value
  });

  test('should keep function value when invalid input is provided after function', () => {
    const chart = parliamentChart();
    const viewBoxFunc = () => ({ width: 18, height: 18 });
    chart.seatIconViewBox(viewBoxFunc);

    const valueAfterInvalidInput = chart.seatIconViewBox('invalid');
    expect(valueAfterInvalidInput).toBe(viewBoxFunc);
  });
});

describe('icon data processing', () => {
  test('data should still be processed correctly with icon set', () => {
    const chart = parliamentChart([{}, {}, {}, {}], 800)
      .seatIcon('M12 2L2 7v10l10 5 10-5V7z');

    const data = chart.data();
    expect(data.length).toBe(4);
    expect(data[0]).toHaveProperty('x');
    expect(data[0]).toHaveProperty('y');
  });

  test('data should be processed correctly with icon function', () => {
    const iconFunc = function () {};
    const chart = parliamentChart([{}, {}, {}, {}], 800)
      .seatIcon(iconFunc);

    const data = chart.data();
    expect(data.length).toBe(4);
    expect(data[0]).toHaveProperty('x');
    expect(data[0]).toHaveProperty('y');
  });

  test('aggregated data should work with icons', () => {
    const iconPath = 'M12 2L2 7v10l10 5 10-5V7z';
    const chart = parliamentChart([], 800)
      .aggregatedData([{ seats: 12 }, { seats: 25 }, { seats: 5 }])
      .seatIcon(iconPath);

    const data = chart.data();
    expect(data.length).toBe(42); // 12 + 25 + 5
    data.forEach((d) => {
      expect(d).toHaveProperty('x');
      expect(d).toHaveProperty('y');
    });
  });

  test('icon settings should not affect data coordinates', () => {
    const dataWithoutIcon = parliamentChart([{}, {}, {}], 800).data();

    const dataWithIcon = parliamentChart([{}, {}, {}], 800)
      .seatIcon('M12 2L2 7v10l10 5 10-5V7z')
      .data();

    expect(dataWithoutIcon[0].x).toBe(dataWithIcon[0].x);
    expect(dataWithoutIcon[0].y).toBe(dataWithIcon[0].y);
    expect(dataWithoutIcon[1].x).toBe(dataWithIcon[1].x);
    expect(dataWithoutIcon[1].y).toBe(dataWithIcon[1].y);
  });

  test('icon viewBox settings should not affect data coordinates', () => {
    const dataWithDefaultViewBox = parliamentChart([{}, {}, {}], 800)
      .seatIcon('M12 2L2 7v10l10 5 10-5V7z')
      .data();

    const dataWithCustomViewBox = parliamentChart([{}, {}, {}], 800)
      .seatIcon('M12 2L2 7v10l10 5 10-5V7z')
      .seatIconViewBox(32)
      .data();

    expect(dataWithDefaultViewBox[0].x).toBe(dataWithCustomViewBox[0].x);
    expect(dataWithDefaultViewBox[0].y).toBe(dataWithCustomViewBox[0].y);
  });
});

describe('icon method chaining', () => {
  test('should allow chaining icon methods with other options', () => {
    const iconPath = 'M12 2L2 7v10l10 5 10-5V7z';
    const chart = parliamentChart([], 800)
      .sections(5)
      .sectionGap(20)
      .seatRadius(15)
      .seatIcon(iconPath)
      .seatIconViewBox(32)
      .rowHeight(50)
      .aggregatedData([{ seats: 10, color: '#ff0000' }]);

    expect(chart.seatIcon()).toBe(iconPath);
    expect(chart.seatIconViewBox()).toEqual({ width: 32, height: 32 });
    expect(chart.sections()).toBe(5);
    expect(chart.sectionGap()).toBe(20);
    expect(chart.seatRadius()).toBe(15);
    expect(chart.rowHeight()).toBe(50);
    expect(chart.data().length).toBe(10);
  });

  test('should allow setting icon after data', () => {
    const iconFunc = function () {};
    const chart = parliamentChart([{}, {}, {}], 800);
    chart.seatIcon(iconFunc);

    expect(chart.seatIcon()).toBe(iconFunc);
    expect(chart.data().length).toBe(3);
  });

  test('should allow changing icon multiple times', () => {
    const chart = parliamentChart([{}, {}], 800);

    const iconPath1 = 'M12 2L2 7v10l10 5 10-5V7z';
    chart.seatIcon(iconPath1);
    expect(chart.seatIcon()).toBe(iconPath1);

    const iconFunc = function () {};
    chart.seatIcon(iconFunc);
    expect(chart.seatIcon()).toBe(iconFunc);

    chart.seatIcon(null);
    expect(chart.seatIcon()).toBe(null);
  });
});

describe('icon snapshots', () => {
  test('basic chart with string icon should match snapshot', () => {
    const data = parliamentChart([{}, {}, {}, {}], 800)
      .seatIcon('M12 2L2 7v10l10 5 10-5V7z')
      .data();

    expect(data).toMatchSnapshot();
  });

  test('aggregated data with icon should match snapshot', () => {
    const data = parliamentChart([], 800)
      .aggregatedData([{ seats: 12, color: '#ff0000' }, { seats: 25, color: '#00ff00' }])
      .seatIcon('M12 2L2 7v10l10 5 10-5V7z')
      .seatIconViewBox(32)
      .data();

    expect(data).toMatchSnapshot();
  });

  test('chart with custom viewBox should match snapshot', () => {
    const data = parliamentChart([{}, {}, {}], 400)
      .seatIcon('M12 2L2 7v10l10 5 10-5V7z')
      .seatIconViewBox({ width: 20, height: 30 })
      .seatRadius(15)
      .data();

    expect(data).toMatchSnapshot();
  });
});
