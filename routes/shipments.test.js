"use strict";

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("invalid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 999,
      name: "Test Tester",
      addr: "100 Test St",
      zip: 12345,
    });

    expect(resp.body).toEqual({
      "error": {
        "message": [
          "instance.productId must be greater than or equal to 1000",
          "instance.zip is not of a type(s) string"
        ],
        "status": 400
      }
    });
  });
});
