const { chromium } = require("playwright-chromium");
const { expect } = require("chai");

mockData = {
  "d953e5fb-a585-4d6b-92d3-ee90697398a0": {
    author: "J.K.Rowling",
    title: "Harry Potter and the Philosopher's Stone",
  },
  "d953e5fb-a585-4d6b-92d3-ee90697398a1": {
    author: "Svetlin Nakov",
    title: "C# Fundamentals",
  },

};

let browser, page; // Declare reusable variables
describe("E2E tests", async function () {
  this.timeout(600000)

  before(async () => {
    browser = await chromium.launch({headless:false, slowMo: 20000}); // headless:false
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

  it("loads and displays all books", async () => {
    await page.route("**/jsonstore/collections/books*", (route, request) => {
      route.fulfill({
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockData),
      });
    });
    await page.goto("http://localhost:5500");
    await page.click("text=Load All Books");
    await page.waitForSelector("text=Harry Potter and");

    const rows = await page.$$eval("tr", (rows) =>
      rows.map((r) => r.textContent)
    );

    expect(rows[1]).to.contains("Harry");
    expect(rows[1]).to.contains("Rowling");
    expect(rows[2]).to.contains("C#");
    expect(rows[2]).to.contains("Nakov");
  });

  it('can create book',async () => {
    await page.goto('http://localhost:5500');
    await page.fill('form#createForm >> input[name="title"]', 'a')
    await page.fill('form#createForm >> input[name="author"]', 'b');

    const [request] = await Promise.all([
      page.waitForRequest(request => request.method() == 'POST'),
      page.click('form#createForm >> text=Submit')
    ]);

    const data = JSON.parse(request.postData());
    expect(data.title).to.equal('a')
    expect(data.author).to.equal('b')

  })


  it(`testing delete functionality`, async () => {
 
    await page.goto("http://localhost:5500");
    await page.click('#loadBooks')


    page.on('dialog', dialog => dialog.accept());

    const [request] = await Promise.all([
        page.waitForRequest('**/jsonstore/collections/books/' + 'd953e5fb-a585-4d6b-92d3-ee90697398a0'),
        page.click("td:nth-child(3) > button.deleteBtn")

    ]);

    expect(request.method()).to.equal('DELETE');
	})

	
	it(`loads correct form`, async () => {
			await page.route('**/jsonstore/collections/books*', request =>
				request.fulfill({
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mockData),
        })
      )
      await page.goto("http://localhost:5500");

			await page.click('#loadBooks')
			await page.click('.editBtn:nth-child(1)')


			const editFormDisplay = await page.$eval('#editForm', el => el.style.display)
			const createFormDisplay = await page.$eval(
				'#createForm',
				el => el.style.display
			)

			expect(editFormDisplay).to.eq('block')
			expect(createFormDisplay).to.eq('none')
		})
});