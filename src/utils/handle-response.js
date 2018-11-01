function handleSuccess(ctx, data, status = 200) {
  ctx.response.body = data;
  ctx.response.status = status;
}

function handleError(ctx, message, status = 404) {
  const error = { status, message }
  ctx.response.body = error;
  throw error
}

module.exports = {
  handleError,
  handleSuccess,
}
