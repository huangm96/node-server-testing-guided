const Hobbits = require("./hobbitsModel.js");
const db = require("../data/dbConfig");

describe("hobbits model", () => {
  it("should set testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("insert()", () => {
    //beforeAll()
    beforeEach(async () => {
      await db("hobbits").truncate();
    });
    //afterEach()
    //afterAll()

    it("should add hobit to database", async () => {
      // insert one record
      const records = await db("hobbits");
      expect(records).toHaveLength(0);
      // check we now have one recode in the table
      await Hobbits.insert({ name: "sam" });
      const hobbits = await db("hobbits");

      expect(hobbits).toHaveLength(1);
    });
  });
  it("should add the provided hobbit to database", async () => {
    let hobbit = await Hobbits.insert({ name: "sam" });
    expect(hobbit.name).toBe("sam");

    hobbit = await Hobbits.insert({ name: "frodo" });
    expect(hobbit.name).toBe("frodo");

    const hobbits = await db("hobbits");
    expect(hobbits).toHaveLength(3);
  });
});
