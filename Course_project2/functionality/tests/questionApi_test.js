import { superoak } from "../deps.js";
import { app } from "../app.js";

Deno.test({
  name: "/api/questions/random should have correct content type",
  async fn() {
    const request = await superoak(app);
    await request.get("/api/questions/random")
      .expect(200)
      .expect("Content-Type", new RegExp("application/json"));
  }, //test that /api/questions/random returns status 200 and the content type is application/json
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test("Posting JSON data to /api/questions/answer should return JSON document", async () => {
  const request = await superoak(app);
  await request.post("/api/questions/answer")
    .send('{"questionId": 1, "optionId": 3}')
    .expect(200)
    .expect("Content-Type", new RegExp("application/json")); // api/questions/answer should return json document and status 200
});

Deno.test("Posting other than JSON data to /api/questions/answer shouldn't return json document", async () => {
  const request = await superoak(app);
  await request.post("/api/questions/answer")
    .send("example")
    .expect(404)
    .expect(""); // api/questions/answer shouldn't return anything and status 404 when user doesn't post data in correct format
});
