const jwt = require("jsonwebtoken");
const { createToken } = require("./tokens");
const { SECRET_KEY } = require("../config");

test("works", function () {
  // given the security risk if this didn't work, checking this specifically
  const token = createToken({ username: "test" });
  const payload = jwt.verify(token, SECRET_KEY);
  expect(payload).toEqual({
    iat: expect.any(Number),
    username: "test",
    isAdmin: false,
  });
});
