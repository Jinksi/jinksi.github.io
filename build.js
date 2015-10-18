var Metalsmith = require('metalsmith'),
    branch = require('metalsmith-branch'),
    collections = require('metalsmith-collections'),
    tags = require('metalsmith-tags'),
    excerpts = require('metalsmith-excerpts'),
    sass = require('metalsmith-sass'),
    markdown = require('metalsmith-markdown'),
    permalinks = require('metalsmith-permalinks'),
    serve = require('metalsmith-serve'),
    layouts = require('metalsmith-layouts'),
    watch = require('metalsmith-watch'),
    concat = require('metalsmith-concat'),
    beautify = require('metalsmith-beautify'),
    moment = require('moment');

Metalsmith(__dirname)
  .metadata({
    site: {
      title: 'Eric Jinks',
      url: 'http://ericjinks.com'
    }
  })
  .source('./src')
  .destination('./build')
  .use(tags({
    handle: 'tags',
    path: 'blog/:tag.html',
    layout: 'tag.jade'
  }))
  .use(collections({
    blog: {
      pattern: 'blog/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown())
  .use(excerpts())
  .use(branch('blog/**.html')
    .use(permalinks({
      pattern:':collection/:slug'
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
  .use(beautify({
    "js": false,
    "html": {
        "wrap_line_length": 80
    }
  }))
  .use(serve({
    port: 8080,
    http_error_files: {
      404: "/404.html"
    }
  }))
  .use(watch({
    paths: {
        "${source}/**/*": true,
        "layouts/**/*": "**/*",
      },
    livereload: false
  }))
  .build(function(err){
    if (err){
      console.log(err);
    } else {
      console.log('Site build complete!');
    }
  });
