module.exports = {
  createAPIResponse: (data, message = 'Success') => {
    return {
      message,
      data,
    }
  },
  createAPIError: (error) => {
    return {
      data: error,
    }
  }
}