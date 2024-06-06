import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/my-library.cjs.js',
            format: 'cjs',
            sourcemap: true
        },
        {
            file: 'dist/my-library.esm.js',
            format: 'es',
            sourcemap: true
        },
        {
            file: 'dist/my-library.umd.js',
            format: 'umd',
            name: 'MyLibrary',
            sourcemap: true
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        babel({ babelHelpers: 'bundled' }),
        terser()
    ]
};
