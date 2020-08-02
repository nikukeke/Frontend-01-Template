'use strict';
var util = require('util');
var path = require('path');
var generators = require('yeoman-generator');
var glob = require('glob');
var slugify = require('underscore.string/slugify');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    // add option to skip install
    this.option('skip-install');

    this.slugify = slugify;
  },
  prompting: {
    dir: function () {

      if (this.options.createDirectory !== undefined) {
        return true;
      }

      var done = this.async();
      var prompt = [{
        type: 'confirm',
        name: 'createDirectory',
        message: 'Would you like to create a new directory for your project?'
      }];

      this.prompt(prompt, function (response) {
        this.options.createDirectory = response.createDirectory;
        done();
      }.bind(this));
    },
    dirname: function () {

      if (!this.options.createDirectory || this.options.dirname) {
        return true;
      }

      var done = this.async();
      var prompt = [{
        type: 'input',
        name: 'dirname',
        message: 'Enter directory name'
      }];

      this.prompt(prompt, function (response) {
        this.options.dirname = response.dirname;
        done();
      }.bind(this));
    }
  },
  writing: {
    buildEnv: function () {
       // create directory
      if(this.options.createDirectory){
        this.destinationRoot(this.options.dirname);
        this.appname = this.options.dirname;
      }

      this.sourceRoot(path.join(__dirname, 'templates', 'tools'));
      this.directory('.', 'tools');

      this.sourceRoot(path.join(__dirname, 'templates'));
      this.template('package.json', 'package.json');
      this.template('env.js', 'env.js');
      this.template('.gitignore', '.gitignore');

      this.fs.copy(
        this.templatePath('src'),
        this.destinationPath('src')
      );
    },
    assetsDirs: function () {
      mkdirp.sync('src/');
      mkdirp.sync('tools/');
      // mkdirp.sync('src/components');
      // mkdirp.sync('src/pages');
    }
  },
  install: function () {
    if(!this.options['skip-install']) this.installDependencies();
  }
});
