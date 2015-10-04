var metalsmith = require('metalsmith'),
    branch = require('metalsmith-branch'),
    collections = require('metalsmith-collections'),
    excerpts = require('metalsmith-excerpts'),
    markdown = require('metalsmith-markdown'),
    permalinks = require('metalsmith-permalinks'),
    serve = require('metalsmith-serve'),
    templates = require('metalsmith-templates'),
    jade = require('metalsmith-jade'),
    sass = require('metalsmith-sass'),
    watch = require('metalsmith-watch'),
    moment = require('moment');

var siteBuild = metalsmith(__dirname)
  .metadata({
    site: {
      title: 'ericjinks.com',
      url: 'http://ericjinks.com'
    }
  })
  .source('./src')
  .destination('./build')
  // build plugins here
  .use(sass({
    outputDir: 'css/'
  }))
  .use(markdown())
  .use(templates({
    engine: 'jade',
    moment: moment
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
      done();
    }
  });
