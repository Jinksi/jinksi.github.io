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
  .use(collections({
    posts: {
      pattern: 'posts/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown())
  .use(excerpts())
  .use(branch('posts/**.html')
    .use(permalinks({
      pattern:':collection/:title'
    }))
  )
  .use(branch('**.html')
    .use(branch('!index.html')
      .use(branch('!404.html')
        .use(permalinks({
          pattern:':title'
        }))
      )
    )
  )
  .use(layouts({
    engine: "jade",
    moment: moment
  }))
  .use(concat({
    files: 'js/**/*.js',
    output: 'js/min/main-min.js'
  }))
  .use(sass({
    outputDir: 'css/'
  }))
  .use(serve({
    port: 8080,
    http_error_files: {
      404: "/404.html"
    }
  }))
  .use(watch({
    paths: {
        "${source}/**/*": '**/*',
        "layouts/**/*": "**/*",
      },
    livereload: true
  }))
  .build(function(err){
    if (err){
      console.log(err);
    } else {
      console.log('Site build complete!');
    }
  });
