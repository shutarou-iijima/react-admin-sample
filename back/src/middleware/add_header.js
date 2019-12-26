const addHeader = (req, res, next) => {
    res.setHeader('Access-Control-Expose-Headers', '*');
    res.setHeader('Accept', 'application/json');
    next();
};

module.exports = addHeader;
