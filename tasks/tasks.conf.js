function CustomConfig() {
    this.dest = './dist';
    this.excludes = './src/node_modules';
    this.clean = {
        name: 'clean'
    };
    this.html = {
        name: 'HTML',
        src: ['src/**/*.html'],
    };
    this.css = {
        name: 'CSS',
        src: ['src/css/**/*.css'],
        out: 'all-css.css',
    };
    this.less = {
        name: 'LESS',
        src: ['src/css/**/*.less'],
        out: 'all-less.css'
    };
    this.js = {
        name: 'JS',
        src: ['src/js/**/*.js'],
        BwsSrc: './src/js/main.js',
        out: 'bundle.js',
    };
    this.img = {
        name: 'IMG',
        src: ['src/**/*.{png,jpg,ico}'],
    };
    this.fonts = {
        name: 'FONTS',
        src: ['src/**/*.{eot,svg,ttf,woff,otf}'],
    };

    this.build = {
        name: 'build',
        tasks: this.getTasks()
    };
    this.serve = {
        name: 'serve',
        port: '3000'
    };
}

CustomConfig.prototype.getTasks = function () {
    return [this.html.name, this.css.name, this.less.name, this.js.name, this.img.name, this.fonts.name];
};
module.exports = CustomConfig;