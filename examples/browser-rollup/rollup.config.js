const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
import commonjs from 'rollup-plugin-commonjs';

const plugins = [
  nodeResolve({ browser: true }),
  commonjs(),
  // terser()
];
module.exports = [
  {
    input: './example.js',
    output: {
      file: 'dist/main.js',
      format: 'umd',
    },
    plugins,
  }
];
