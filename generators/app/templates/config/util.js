'use strict';

const path          = require('path');
const rootDirectory = path.resolve(__dirname, '..');

/**
 * @param {*} args
 * @returns {string}
 */
function fromRoot(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [rootDirectory].concat(args));
}

exports.fromRoot = fromRoot;
