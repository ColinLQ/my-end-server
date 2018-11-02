async function handleResponse(ctx, next) {
  try {
    const body = await next();
    ctx.body = body;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err;
  }
}

module.exports = handleResponse;
