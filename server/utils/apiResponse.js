const apiResponse = (statusCode, data = {}, message, success) => {
    return {
        statusCode,
        data,
        message,
        success
    }
}

module.exports = {
    apiResponse
}