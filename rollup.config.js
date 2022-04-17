import babel from '@rollup/plugin-babel';

export default {
  input: './index.js',
  external: ['d3'],
  output: {
    file: 'build/d3-parliament-chart.js',
    name: 'd3',
    format: 'umd',
    indent: false,
    extend: true,
    globals: { d3: 'd3' },
    plugins: [
      babel({
        exclude: 'node_modules/**' }),
    ],
  },
};
