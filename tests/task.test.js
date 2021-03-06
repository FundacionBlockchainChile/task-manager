const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  setupDatabase,
  taskOne
} = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("AUthorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "From my test..."
    });
  expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("Should fetch user tasks", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("AUthorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toEqual(2);
});

test("Attempt to have second user delete first task (should fail)", async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("AUthorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

  // Assert that task still exist into db
  const task = await Task.findById(taskOne._id);
  // console.log(user.body)
  expect(task).not.toBeNull();
});

// Task Test Ideas
// Should fetch page of tasks

test("Should not create task with invalid description", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("AUthorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "",
      completed: "false"
    });
  expect(400);

  const task = await Task.findById(response.body._id);
  expect(task).toBeNull();
  // expect(task.completed).toEqual(false);
});

test("Should not create task with invalid completed", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("AUthorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Acampar...",
      completed: "fals"
    });
  expect(400);

  const task = await Task.findById(response.body._id);
  expect(task).toBeNull();
  // expect(task.completed).toEqual(false);
});

test("Should delete user task", async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("AUthorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const task = await Task.findById(taskOne._id);
  // expect(task).not.toBe(null);
  expect(task).toBe(null);
  // console.log(response.body)
});

test("Should not delete task if unauthenticated", async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    // .set("AUthorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(401);

  const task = await Task.findById(taskOne._id);
  // expect(task).not.toBe(null);
  expect(task).not.toBe(null);
  // console.log(response.body)
});

test("Should not update other users task", async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("AUthorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

  const task = await Task.findById(taskOne._id);
  // expect(task).not.toBe(null);
  expect(task).not.toBe(null);
  // console.log(response.body)
});

test("Should fetch user task by id", async () => {
  const response = await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set("AUthorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body).not.toBe(null);
  // console.log(response.body)
});

test("Should not fetch user task by id if unauthenticated", async () => {
  const response = await request(app)
    .get(`/tasks/${taskOne._id}`)
    // .set("AUthorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(401);
  expect(response.body).not.toBe(null);
  // console.log(response.body)
});

test("Should not fetch other users task by id", async () => {
  const response = await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set("AUthorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
  // expect(response.body).not.toBe(null);
  // console.log(respons.body)
});

test("Should fetch only completed tasks", async () => {
  const response = await request(app)
    .get(`/tasks?completed=true`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  // console.log(response.body);
});

test('Should fetch only incomplete tasks', async () => {
  const response = await request(app)
    .get(`/tasks?completed=false`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  // console.log(response.body);
})

test('Should sort tasks by description descenden way', async () => {
  const response = await request(app)
  .get('/tasks?sortBy=createdAt:desc')
  .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
  .send()
  .expect(200);
  // console.log(response.body);
})

test('Should sort tasks by description descenden way', async () => {
  const response = await request(app)
  .get('/tasks?sortBy=createdAt:asc')
  .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
  .send()
  .expect(200);
  // console.log(response.body);
})

test('Should fetch page of tasks', async () => {
  const response = await request(app)
  .get('/tasks')
  .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
  .send()
  .expect(200);
  // console.log(response.body);
})