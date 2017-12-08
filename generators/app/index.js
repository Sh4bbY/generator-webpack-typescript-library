'use strict';

const Generator    = require('yeoman-generator');
const chalk        = require('chalk');
const yosay        = require('yosay');
const path         = require('path');
const gitUserName  = require('git-user-name');

module.exports = class extends Generator {
  
  constructor(args, opts) {
    super(args, opts);
    
    this.username = gitUserName();
  }
  
  prompting() {
    
    this.log(yosay('Welcome to the ' + chalk.red('typescript library') + ' generator!'));
    
    return this.prompt([
      {
        type    : 'input',
        name    : 'name',
        message : 'Library name:',
        required: true,
        default : process.cwd().split(path.sep).pop()
      }, {
        type   : 'confirm',
        name   : 'includeDevServer',
        message: 'Would you like to use webpack-dev-server for browser-testing and live-reload?'
      }, {
        type   : 'input',
        name   : 'username',
        message: 'Authors name:',
        default: this.username
      }
    ]).then((answers) => {
      this.libraryName      = answers.name;
      this.includeDevServer = answers.includeDevServer;
      this.username         = answers.username;
      this.email            = answers.email;
    });
  }
  
  // ##############################################
  // ############# WRITINGS
  
  writing() {
    // Basic
    this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), {
      libraryName     : this.libraryName,
      includeDevServer: this.includeDevServer,
      username        : this.username,
    });
    
    this.fs.copyTpl(this.templatePath('src/Example.ts'), this.destinationPath('src/Example.ts'));
    this.fs.copyTpl(this.templatePath('src/index.ts'), this.destinationPath('src/index.ts'));
    
    this.fs.copyTpl(this.templatePath('config/tsconfig.json'), this.destinationPath('tsconfig.json'));
    this.fs.copyTpl(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), {
      libraryName: this.libraryName,
      username   : this.username,
    });
    this.fs.copyTpl(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.js'));
    this.fs.copyTpl(this.templatePath('CHANGELOG.md'), this.destinationPath('CHANGELOG.md'));
    
    // TSLint
    this.fs.copyTpl(this.templatePath('config/tslint.json'), this.destinationPath('tslint.json'));
    
    // Webpack
    this.fs.copyTpl(this.templatePath('config/util.js'), this.destinationPath('config/util.js'));
    this.fs.copyTpl(
      this.templatePath('config/webpack.dev.js'),
      this.destinationPath('config/webpack.dev.js'), {
        includeDevServer: this.includeDevServer
      }
    );
    this.fs.copyTpl(this.templatePath('config/webpack.prod.js'), this.destinationPath('config/webpack.prod.js'));
    
    if (this.includeDevServer) {
      // HTML Webpack Plugin
      this.fs.copyTpl(this.templatePath('public/index.html'), this.destinationPath('public/index.html'));
    }
    
    // Unit tests
    this.fs.copyTpl(this.templatePath('test'), this.destinationPath('test'));
  }
  
  // ##############################################
  // ############# INSTALLATIONS
  
  install() {
    this.yarnInstall();
  }
};
