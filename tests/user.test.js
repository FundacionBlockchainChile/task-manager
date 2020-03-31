const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should singup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Flaco",
      email: "srflaco@gmail.com",
      password: "srflaco123"
    })
    .expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Flaco",
      email: "srflaco@gmail.com"
    },
    token: user.tokens[0].token
  });
  expect(user.password).not.toBe("srflaco123");
});

test("Validate new token is saved", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);

  // Assert that the token in response matches user secondtoken
  const user = await User.findById(userOneId);
  // console.log(user.body)
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login non existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "this is not the correct password"
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("AUthorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app)
    .get("/users/me")
    .send()
    .expect(401);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should NOT delete account for unauthenticated user", async () => {
  await request(app)
    .delete("/users/me")
    .send()
    .expect(401);
});

test("Should upload Avatar Image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user field", async () => {
  const response = await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Flaconios"
    })
    .expect(200);

  // Confirm Name was changed
  user = await User.findById(userOneId);
  expect(user.name).toBe("Flaconios");
});

test("Shpuld not update invalid user fields", async () => {
  const response = await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      lastname: "castro"
    })
    .expect(404);
  expect(response.body.error).toBe("Invalid updates!");
  // console.log(response.body.error)
});

// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated

test("Should not signup user with invalid name/email/password", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Flaco",
      email: "srflaco",
      password: "srflaco123"
    })
  .expect(400);
  // console.log(response.body)
});

test('Should not update user if unauthenticated', async ()=> {
  await request(app)
    .patch("/users/me")
    // .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Flaconios"
    })
    .expect(401);
})

test('Should not update user with invalid name/email/password', async () => {
  const response = await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Flaco",
      email: "srflaco",
      password: "srflaco123"
    })
  .expect(400);
})


test('Should not delete user if unauthenticated', async ()=> {
  await request(app)
    .delete("/users/me")
    // .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(401);

  user = await User.findById(userOneId);
  expect(user).not.toBeNull();
})
