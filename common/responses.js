const failedError = { status: 400, message: "something went wrong" };

const authFailed = {
  status: 401,
  message: "You are not authorized to access api's.",
};

module.exports = {
  failedError,
  authFailed,
};
