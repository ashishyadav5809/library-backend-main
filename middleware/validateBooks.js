const validateBook = (req, res, next) => {
    const {
        title,
        author,
        ISBN,
        category,
        totalCopies
    } = req.body;

    if (!title || !author || !ISBN || !category || !totalCopies) {
        return res.status(400).json({
            success: false,
            message: "Required fields are missing"
        });
    }

    next(); // move to next middleware or route
};

module.exports = validateBook;