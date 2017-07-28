/* eslint-env node */
module.exports = {
  description: 'Imports Microsoft Speech SDK from NPM',

  // locals(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  normalizeEntityName() { },

  afterInstall(options) {
    return this.addPackageToProject('microsoft-speech-browser-sdk');
  }
};
