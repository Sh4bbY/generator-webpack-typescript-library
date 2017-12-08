'use strict';

const gulp             = require('gulp');
const path             = require('path');
const runSequence      = require('run-sequence').use(gulp);
const gulpReleaseTasks = require('@platform.shared.libs.nodejs/gulp.release-tasks');
const util             = require('@platform.shared.libs.nodejs/gulp.release-tasks/lib/npm/util');

const packageJsonPath = path.resolve('./package.json');

gulpReleaseTasks({}, packageJsonPath);

gulp.task('release', (done) => {
    const bumpType = process.argv[4];

    if(bumpType !== 'patch' && bumpType !== 'minor' && bumpType !== 'major') {
        return done(`invalid bump type '${bumpType}'`);
    }

    runSequence(
        'clean', 'build:cjs', 'build:esm', 'build:umd',
        'release:git:co:master', 'release:git:fetch', 'release:git:pull:master', 'release:git:co:release',
        `release:bump:${bumpType}`, 'release:flush:require:cache', 'release:changelog', 'release:git:commit', 'release:git:push:release',

        'release:git:co:master', 'release:git:pull:master', 'release:git:merge:release', 'release:git:commit',
        'release:git:push:master', 'release:git:delete:local', 'release:git:delete:remote', 'release:git:tag',
        'npm:publish',
        done
    );
});


/**
 * run the build process to generate commonjs artifacts.
 */
gulp.task('build:cjs', (done) => {
    util.runNpm('run build:cjs', '.', done);
});

/**
 * run the build process to generate es6 artifacts.
 */
gulp.task('build:esm', (done) => {
    util.runNpm('run build:esm', '.', done);
});

/**
 * run the build process to generate umd artifacts.
 */
gulp.task('build:umd', (done) => {
    util.runNpm('run build:umd', '.', done);
});

/**
 * create a release on artifactory.
 */
gulp.task('npm:publish', (done) => {
    util.runNpm('publish', '.', done);
});

/**
 * deletes the dist directory
 */
gulp.task('clean', (done) => {
    util.runNpm('run clean', '.', done);
});
