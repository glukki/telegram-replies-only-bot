import * as fs from 'fs'
import { defineConfig } from 'rollup'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import importHttp from 'import-http/rollup'
import replace from 'rollup-plugin-replace'

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
const grammyVersion = packageJson.dependencies.grammy

export default defineConfig({
  input: 'src/index.ts',
  output: {
    exports: 'named',
    format: 'es',
    file: 'dist/index.mjs',
    sourcemap: true,
  },
  plugins: [
    replace({
      exclude: 'node_modules/**',
      values: {
        grammy: `https://get.grammy.dev/es6@v${grammyVersion}.js`,
      },
    }),
    importHttp(),
    typescript(),
    commonjs(),
    nodeResolve({ browser: true }),
    terser(),
  ],
})
