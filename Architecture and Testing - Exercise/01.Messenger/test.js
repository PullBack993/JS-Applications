const { chromium } = require("playwright-chromium");
const { expect } = require("chai");

const mockData = require("./mockData.json");

function json(data) {
  return {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
}

let browser, page; // Declare reusable variables
describe("tests preparation", function () {
  this.timeout(999999);
  before(async () => {
    browser = await chromium.launch(); // headless:false slowMo: 1000  (Debuging)
  });
  after(async () => {
    await browser.close();
  });
  beforeEach(async () => {
    page = await browser.newPage();
  });
  afterEach(async () => {
    await page.close();
  });

  describe("e2e tests", async () => {
    it(`load posts on pressing refresh button`, async () => {
      await page.goto("http://localhost:5500"); // Live server port

      await page.route("**/jsonstore/messenger*", (request) =>
        request.fulfill(json(mockData.messages))
      );
      await page.waitForSelector("#messages");

      const [response] = await Promise.all([
        page.waitForResponse(
          (r) =>
            r.request().url().includes("/jsonstore/messenger") &&
            r.request().method() === "GET"
        ),
        page.click("#refresh"),
      ]);

      const responseData = await response.json();

      expect(responseData).to.deep.eq(mockData.messages);
    });

    it(`testing proper form submit`, async () => {
      await page.goto("http://localhost:5500"); // live server port

      await page.waitForSelector("#controls");
      await page.route("**/jsonstore/messenger*", (request) =>
        request.fulfill(json({ author: "a", content: "b" }))
      );

      await page.fill("#author", "a");
      await page.fill("#content", "b");

      const [response] = await Promise.all([
        page.waitForRequest(
          (r) =>
            r.url().includes("/jsonstore/messenger") && r.method() === "POST"
        ),
        page.click("#submit"),
      ]);
      const responseData = JSON.parse(await response.postData());

      expect(responseData).to.deep.eq({ author: "a", content: "b" });
    });
  });
});
