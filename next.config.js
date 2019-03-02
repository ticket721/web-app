// next.config.js
const withLess = require('@zeit/next-less');
const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

let env = {};

if (process.env.NODE_ENV === 'development') {
    const {parsed: localEnv} = require('dotenv').config();
    env = localEnv;
} else {

}

const themeVariables = lessToJS(
    fs.readFileSync(path.resolve(__dirname, './static/less/antd.custom.less'), 'utf8')
);

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
    require.extensions['.less'] = file => {}
}

module.exports = {
    ...withTypescript(withLess(withCSS(withImages({
        lessLoaderOptions: {
            javascriptEnabled: true,
            modifyVars: themeVariables
        }
    })))),
    publicRuntimeConfig: {
        env
    },
};

