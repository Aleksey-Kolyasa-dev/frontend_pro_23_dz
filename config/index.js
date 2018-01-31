exports.config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    collections: {
        user: 'dz_js_user',
    },
    ip: process.env.IP || '0.0.0.0',
    statics: './dist',
    get _dbProd() {
        return `mongodb://dev:dev@ds149132.mlab.com:49132/alkol_db`;
        },
    get _dbDev() {
        return `mongodb://${this.host}/${this.collections.user}`;
        },
    get db() {
        return this.env === 'development'
        ? this._dbDev
        : this._dbProd;
    },
};

exports.msgErr = {
    user: {
        validation: 'VALIDATION FAILED!',
        notFound: 'USER NOT FOUND!',
        password: 'PASSWORD VALIDATION FAILED!',
        occupied: 'SUCH LOGIN ALREADY EXISTS!'
    },

};