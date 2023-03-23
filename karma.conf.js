
module.exports = function(config) {
    config.set({
      preprocessors: {
        '**/*.ts': ['karma-typescript'],
        "src/**/*.ts" : ['coverage']
      },

      frameworks: ['jasmine'],

      mime: {
        'text/x-typescript': ['ts', 'tsx', 'spec.ts', 'test.ts']
      },

      files: [
        "src/_test_/**/*.ts",
        "src/**/*.ts"
      ],

      frameworks: ['jasmine', 'karma-typescript'],
    
      plugins: [
        // other plugins here
        require('karma-jasmine'),
        require('karma-jasmine-html-reporter'),
        require('karma-chrome-launcher'),
        require('karma-typescript'),
        require('karma-coverage'),

      ],

      karmaTypescriptConfig: {
        tsconfig: './tsconfig.json'
      },


      coverageReporter : {
        type : 'html',
        dir : 'src/coverage'
      },

      reporters: ['progress', 'coverage'],

      colors : true,

      port : 9876,

      browsers: ['Chrome'], 
      
  
    })
  };