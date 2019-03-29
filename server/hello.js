module.exports.world = (event, context, callback) => {
    callback(null, {
        statusCode: 200,
        headers: {},
        body: "Hello world"
    })
};