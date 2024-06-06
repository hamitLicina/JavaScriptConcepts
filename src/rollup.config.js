import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/my-library.cjs.js',
            format: 'cjs'
        },
        {
            file: 'dist/my-library.esm.js',
            format: 'es'
        },
        {
            file: 'dist/my-library.umd.js',
            format: 'umd',
            name: 'MyLibrary'
        }
    ],
    plugins: [resolve(), commonjs()]
};
