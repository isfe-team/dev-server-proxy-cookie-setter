import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const inputs = [
  ['src/index.js', 'main']
]

const formats = [
  'esm'
]

function genConfigs () {
  return inputs.reduce((acc, [input, name]) => [...acc, ...formats.reduce((acc, format) => {
    const config = {
      input,
      plugins: [nodeResolve(), commonjs()],
      output: {
        name,
        format,
        sourcemap: true,
        file: `dist/${name}.${format}.js`
      },
      onwarn (warning) {
        if (warning.loc && warning.loc.file.indexOf('node_modules') === -1 && warning.code === 'EVAL') {
          return
        }
      }
    }

    const configs = [...acc, config]
    return configs
  }, [])], [])
}

const configs = genConfigs()

export default configs
