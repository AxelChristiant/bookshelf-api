export const success = (h, statusCode, message, data) => {
  if (!message) {
    const response = h.response({
      status: "success",
      data: data,
    });

    response.code(statusCode);
    return response;
  }

  if (!data) {
    const response = h.response({
      status: "success",
      message: message,
    });

    response.code(statusCode);
    return response;
  }

  const response = h.response({
    status: "success",
    message: message,
    data: data,
  });

  response.code(statusCode);
  return response;
};

export const fail = (h, statusCode, message) => {
  const response = h.response({
    status: "fail",
    message: message,
  });

  response.code(statusCode);
  return response;
};

export const error = (h, statusCode, message) => {
  const response = h.response({
    status: "error",
    message: message,
  });

  response.code(statusCode);
  return response;
};
