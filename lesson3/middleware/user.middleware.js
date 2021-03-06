const errorCodes = require('../constant/errorCodes.enum')
const errorMessage = require('../error/error.messages')

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const userId = +req.params.userId;
            if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
                throw new Error('Not Valid ID');
            }
            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    isUserValid: (req, res, next) => {
        try {
            const {name, password, preferLeng = 'en'} = req.body
            if (!name || !password){
                throw new Error('Some field is empty');
            }
            if (password.length < 6) {
                throw new Error(errorMessage.TOO_WEAK_PASSWORD[preferLeng]);
            }
            next()
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
}
