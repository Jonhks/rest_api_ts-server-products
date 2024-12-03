import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  it("should display validation erros", async () => {
    const res = await request(server).post("/api/products").send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(4);

    expect(res.status).not.toBe(404);
    expect(res.body.errors).not.toHaveLength(2);
  });

  it("should validate that the price is great than 0", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Monitor plano -Test",
      price: 0,
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(1);

    expect(res.status).not.toBe(404);
    expect(res.body.errors).not.toHaveLength(2);
  });

  it("should validate that the price is a number and great than 0", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Monitor plano -Test",
      price: "Text",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(2);

    expect(res.status).not.toBe(404);
    expect(res.body.errors).not.toHaveLength(4);
  });

  it("should create a new product", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Monitor -Testing",
      price: 50,
    });
    expect(res.status).toBe(201);
    expect(res.status).not.toBe(404);
    expect(res.status).not.toBe(200);
    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products", () => {
  it("should check api/products url exists", async () => {
    const res = await request(server).get("/api/products");
    expect(res.status).not.toBe(404);
  });

  it("Get a JSON response with products", async () => {
    const res = await request(server).get("/api/products");

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveLength(1);

    expect(res.status).not.toBe(404);
    expect(res.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products/:id", () => {
  it("Should return a 404 response for a no--existe product", async () => {
    const productId = 2000;
    const res = await request(server).get(`/api/products/${productId}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Producto no encontrado");
  });

  it("Should check valid ID in the Url", async () => {
    const res = await request(server).get("/api/products/not-valid-url");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0].msg).toBe("Id no valido");
  });

  it("Get a JSON response for a single product", async () => {
    const res = await request(server).get("/api/products/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
  });
});

describe("PUT /api/products/:id", () => {
  it("Shoul display validation error message when updating a product", async () => {
    const res = await request(server).put("/api/products/1").send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toBeTruthy();
    expect(res.body.errors).toHaveLength(5);

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });
});
