
const { test } = require("node:test");
const assert = require("node:assert/strict");
const app = require("./server");

test("home route returns the application message", async () => {
  const server = app.listen(0);

  try {
    await new Promise((resolve) => server.once("listening", resolve));

    const address = server.address();
    const response = await fetch(`http://127.0.0.1:${address.port}/`);
    const body = await response.text();

    assert.equal(response.status, 200);
    assert.equal(
      body,
      "Hello! My DevOps CI/CD Application is Running."
    );
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
  }
});

test("health route returns healthy status", async () => {
  const server = app.listen(0);

  try {
    await new Promise((resolve) => server.once("listening", resolve));

    const address = server.address();
    const response = await fetch(
      `http://127.0.0.1:${address.port}/health`
    );
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, "healthy");
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
  }
});
