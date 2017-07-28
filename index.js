/* eslint-env node */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-microsoft-speech-shim',

  included: function (app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/speech.browser.sdk.js');
  },

  treeForVendor(vendorTree) {
    var momentTree = new Funnel(path.dirname(require.resolve('microsoft-speech-browser-sdk/distrib/speech.browser.sdk.js')), {
      files: [
        'speech.browser.sdk-min.js',
        'speech.browser.sdk.js',
        'speech.browser.sdk.js.map',
      ],
    });

    return new MergeTrees([vendorTree, momentTree]);
  },
};
