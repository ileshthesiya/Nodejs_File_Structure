const tokenObj = require("../Token/token")

const middleware = (req, res, next) => {
    const reqHeaders = req.headers.token;
    if (reqHeaders == tokenObj.token) {
        next();
    }
    else {
        res.status(401).send({ Message: "Unauthorized user" })
    }
}

module.exports = middleware;