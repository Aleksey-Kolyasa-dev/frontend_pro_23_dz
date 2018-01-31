const { User } = require('../models/user.model');
const { msgErr} = require('../config');

exports.registration = async (req, res, next) => {
    const { body } = req;
    if (!body.login || !body.password || !body.name) return next(new Error(msgErr.user.validation));

    const _user = await User.findOne({ login : body.login });
    if(_user) return next(new Error(msgErr.user.occupied));

    try {
        const user = new User(body);
        const registredUser = await user.save();
        res.json(registredUser);
    } catch (error) {
        return next(error);
    }
};

exports.login = async (req, res, next) => {
    const { body } = req;
    if (!body.login || !body.password) return next(new Error(msgErr.user.validation));
    try {
        const _user = await User.findOne({ login : body.login });
        if(!_user) return next(new Error(msgErr.user.notFound));

        if(!_user.checkPassword(body.password + _user.salt)) return next(new Error(msgErr.user.password));

        _user.isLogged = true;
        await _user.update({upsert : true});
        res.json(_user);
    } catch (error) {
        return next(error);
    }
};

exports.logout = async (req, res, next) => {
    const { id } = req.params;
    if (!id) return next(new Error(msgErr.user.validation));
    try {
        const _user = await User.findById(id);
        _user.isLogged = false;
        await _user.update({upsert : true});
        res.json(_user);
    } catch (error) {
        return next(error);
    }
};
