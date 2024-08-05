import { agent as request } from "supertest";
import app from "../app";
import { dataSource, initializeDatabase } from "../testhelper";


describe("Task test suite", () => {
  beforeAll(async () => {
    await initializeDatabase();
    jest.setTimeout(5000);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });


  it("test /tasks task list enpoint", async () => {
    const response = (await request(app).post("/api/tasks")).body({ title: "sample", description: 'Sample', status: 'Todo' });
    console.log(response)
    jest.setTimeout(50000)
    // expect(response.statusCode).toBe(200);
  });

  // it("test /tasks task list enpoint", async () => {
  //   const response = await request(app).get("/api/tasks");
  //   expect(response.statusCode).toBe(200);
  // });
});
