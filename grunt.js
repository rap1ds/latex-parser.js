var PEG = require("pegjs");

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
    },
    jshint: {
      options: {
        browser: true
      }
    },
    build: {
      source: 'src/latex-parser.pegjs',
      destination: 'lib/latex-parser.js',
      template: 'tmpl/latex-parser.tmpl'
    }
  });

  function compile(parserSourceFile) {
    var parserSrc = grunt.file.read(parserSourceFile);
    var compiledParser = PEG.buildParser(parserSrc, {trackLineAndColumn: true});

    return compiledParser.toSource();
  }

  function package(templateFile, parser) {
    var template = grunt.file.read(templateFile);
    var packaged = grunt.template.process(template, {parser: parser});

    return packaged;
  }

  function write(destinationFile, parser) {
    grunt.file.write(destinationFile, parser);
  }

  grunt.registerTask('build', 'Build parser', function() {
    console.log("Building parser");

    var buildConfig = grunt.config.get('build');
    write(buildConfig.destination, 
        package(buildConfig.template, 
            compile(buildConfig.source)));

    console.log("Build successful");
  });

  // Default task.
  grunt.registerTask('default', 'build');
};
