# Frontend boilerplate with gulp, browserify and less

This is configured package.json with gulp, browserify and less dependecies.

For JavaScript compilation is used browserify. Entry point for app is assets/js/app.js

For css is less. Entry point is assets/less/app.less

Gulp default task runs javascript and less watch. Watchify is used to watch javascript files.

Javascript and less errors is handled by apropriate events on browserify and less modules

Compiled css and javascript files are output in build folder

- app.min-{package.version}.js
- app.min-{package.version}.css

Package versoion number is appended to filename
