import path from 'path'
import babel from 'rollup-plugin-babel'

const cwd = process.cwd()
const pkg = require(path.join(cwd, 'package.json'))

const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * last modify ${(new Date()).toLocaleString()}
  * @license MIT
  */`

export default [
  {
    input: 'src/index.js',
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
    ],
    output: [
      {
        banner,
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      }
    ]
  }
];