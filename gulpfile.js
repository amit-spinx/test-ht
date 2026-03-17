const { src, dest, series, parallel, watch } = require('gulp');
const del = require('del');
const fs = require('fs');
const gulpLoadPlugins = require('gulp-load-plugins');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const cached = require("gulp-cached");
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const nunjucksRender = require('gulp-nunjucks-render');
const yargs = require('yargs');
const merge = require("merge-stream");

const { argv } = yargs;
const isProduction = argv.production;

const $ = gulpLoadPlugins();
const project = require('./project.json');

const onError = (err) => {
  console.error('\x1b[31m%s\x1b[0m', err);
  this.emit('end');
};

const readTemplateData = () => {
  const data = {};
  const dir = './app/data/';

  fs.readdirSync(dir).forEach((file) => {
    const filePath = dir + file;
    delete require.cache[require.resolve(filePath)];
    const fileData = require(filePath);
    data[file.replace(/\.json$/, '')] = fileData;
  });
  return data;
};

// Tasks
const cleanTask = () => del(['./dist']);

// SCSS
function minifySass() {
  let stream = src("./assets/sass/pages/*.scss").pipe($.plumber());
  stream = stream
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sass.sync().on("error", sass.logError))
  .pipe(cached("sass"))
  .pipe(cleanCSS())
  .pipe(sourcemaps.write("."))
  .pipe(dest(project.dist.css))
  .pipe(browserSync.stream());

  return stream;
}

// JS: Global js merged
function globalJs() {
  return src(project.vendor.js.concat(project.app.js))
  .pipe(plumber())
  .pipe(concat("app.js"))
  .pipe(cached("js"))
  .pipe(terser())
  .pipe(dest(project.dist.js));
}

// Template Js: Optimize
function templateJs(done) {
  const tasks = project.appTemplate.map(template => {
    const jsArray = template.js;
    const jsPageName = template.pageName.toLowerCase();

    return src(jsArray)
      .pipe(plumber({
        errorHandler: function (err) {
          console.error(`Error in ${jsPageName}.js: ${err.jsPageName}`);
          this.emit('end');
        }
      }))
      .pipe(concat(`${jsPageName}.min.js`))
      .pipe(terser())
      .pipe(dest(project.dist.js));
  });
  return merge(tasks).on('end', done);
}

// Fonts
const copyFonts = () => {
  return src([...project.vendor.fonts, ...project.app.fonts])
    .pipe(dest(project.dist.fonts));
};

// IMG
function copyImg() {
  return src(project.app.img)
    .pipe(dest(project.dist.img));
}

// Nunjucks
function nunjucksTask() {
  const nunjucksOptions = {
    path: ['app/templates'],
    data: { isProduction, ...readTemplateData() }
  };

  return src('app/pages/**/*.+(html|nunjucks)')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(nunjucksRender(nunjucksOptions))
    .pipe($.jsbeautifier({ indent_size: 2, indent_char: ' ' }))
    .pipe($.removeEmptyLines())
    .pipe(gulpIf(isProduction, $.htmlmin({ collapseWhitespace: true })))
    .pipe(dest('dist'));
}

const watchFilesTask = () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });

  watch('assets/sass/**/*.scss', minifySass);
  watch(project.app.js, globalJs);
  watch(['assets/js/**/*.js', '!assets/js/web.js'], templateJs);
  watch(['app/**/*.+(html|nunjucks)', 'app/data/**/*.json'], series(nunjucksTask));
  watch([...project.vendor.fonts, ...project.app.fonts], series(copyFonts, browserSync.reload));
  watch([...project.vendor.img, ...project.app.img], series(copyImg, browserSync.reload));
};

// Task Composition
const defaultTask = series(
  cleanTask, 
  parallel( minifySass, globalJs, templateJs, nunjucksTask, copyFonts, copyImg )
);

const watchTask = series(defaultTask, watchFilesTask);

// Export Tasks
exports.default = defaultTask;
exports.watch = watchTask;