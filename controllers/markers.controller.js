const { User } = require('../models/user.model');
const { msgErr} = require('../config');

exports.getMarkers = async (req, res, next) => {
    const {id} = req.params;
    if(!id) return next(new Error(msgErr.user.validation));
    try {
        const _user = await User.findById(id);
        res.json(_user.markers);
        console.log(_user);
    } catch (error) {
        return next(error);
    }
};

exports.saveMarkers = async (req, res, next) => {
    const {id} = req.params;
    const {body:markers} = req;
    if(!id && !Array.isArray(markers)) return next(new Error(msgErr.user.validation));
    try {
        const _user = await User.findById(id);
        _user.markers = markers;
        await _user.update();
        res.json(_user);
    } catch (error) {
        return next(error);
    }
};
