var metalsmith = require('metalsmith'),
    branch = require('metalsmith-branch'),
    collections = require('metalsmith-collections'),
    excerpts = require('metalsmith-excerpts'),
    sass = require('metalsmith-sass'),
    markdown = require('metalsmith-markdown'),
    permalinks = require('metalsmith-permalinks'),
    serve = require('metalsmith-serve'),
    layouts = require('metalsmith-layouts'),
    jade = require('metalsmith-jade'),
    watch = require('metalsmith-watch'),
    concat = require('metalsmith-concat'),
    moment = require('moment');

var siteBuild = metalsmith(__dirname)
  .metadata({
    site: {
      title: 'Eric Jinks',
      url: 'http://ericjinks.com'
    }
  })
  .source('./src')
  .destination('./build')
  .use(sass({
    outputDir: 'css/'
  }))
  .use(markdown())
  .use(layouts({
    engine: "jade"
  }))
  .use(concat({
    files: 'js/**/*.js',
    output: 'js/min/main-min.js'
  }))
  .use(serve({
    port: 8080,
    verbose: true
  }))
  .use(watch({
    pattern: '**/*',
    livereload: true
  }))
  .build(function(err){
    if (err){
      console.log(err);
    } else {
      console.log('Site build complete!');
    }
  });
