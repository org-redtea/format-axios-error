import path from 'path';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';


const config = [
  {
    input: 'dist/index.js',
    output: {
      name: 'AxiosErrorFormat',
      file: path.join('dist', pkg.browser),
      format: 'umd',
      exports: 'default',
      compact: true
    },
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      babel({
        babelHelpers: 'bundled'
      })
    ]
  },
  {
    input: 'dist/index.mjs',
    output: {
      file: path.join('dist', 'index.browser.mjs'),
      format: 'es',
      exports: 'named',
      compact: true
    },
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      babel({
        babelHelpers: 'bundled'
      })
    ]
  }
];

export default config;
