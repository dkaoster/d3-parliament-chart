/* eslint-disable import/no-extraneous-dependencies */
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import css from 'rollup-plugin-css-only';

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      // eslint-disable-next-line global-require
      server = require('child_process').spawn('sirv', ['dev/public', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

export default [
  {
    input: './index.js',
    output: {
      sourcemap: true,
      format: 'es',
      file: 'build/d3-parliament-chart.es.js',
    },
  },
  {
    input: 'dev/src/main.js',
    output: {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      file: 'dev/public/build/bundle.js',
    },
    plugins: [
      svelte({
        compilerOptions: {
        // enable run-time checks when not in production
          dev: true,
        },
      }),
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css({ output: 'bundle.css' }),

      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration -
      // consult the documentation for details:
      // https://github.com/rollup/plugins/tree/master/packages/commonjs
      resolve({
        browser: true,
        dedupe: ['svelte'],
      }),
      commonjs(),

      // In dev mode, call `npm run start` once
      // the bundle has been generated
      serve(),

      // Watch the `public` directory and refresh the
      // browser on changes
      livereload('dev/public'),
    ],
    watch: {
      clearScreen: false,
    },
  },
];
