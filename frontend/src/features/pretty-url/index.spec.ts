import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { server } from "../../mocks/server";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("X", () => {
  // note: should not be case sensitive
  test("users should return type 0", async () => {
    const usernames = ["johnsmith", "janedoe", "benaffleck"];
    for (const username of usernames) {
      // usernames are lowercased in db
      const name = username.toLowerCase();

      const { data } = await axios.get(BACKEND_API_URL + "/pretty-url/" + name);
      expect(data.type).toEqual(0);
    }
  });

  // note: case-sensitive
  test("veils should return type 1", async () => {
    const veils = ["B-A-T-M-A-N", "jane-doe", "jsmith"];
    for (const veil of veils) {
      const { data } = await axios.get(BACKEND_API_URL + "/pretty-url/" + veil);
      expect(data.type).toEqual(1);
    }
  });

  // note: case-sensitive
  test("groups should return type 2", async () => {
    const groups = ["Superheroes", "LGBTQ+1", "Welcome"];
    for (const group of groups) {
      const { data } = await axios.get(
        BACKEND_API_URL + "/pretty-url/" + group
      );
      expect(data.type).toEqual(2);
    }
  });

  test("not found should return type -1", async () => {
    const notFounds = [
      "Superheroesx",
      "LGBTq+1",
      "welcome",
      "B-A-T-M-A-n",
      "Jsmith",
    ];
    for (const notFound of notFounds) {
      const { data } = await axios.get(
        BACKEND_API_URL + "/pretty-url/" + notFound
      );
      expect(data.type).toEqual(-1);
    }
  });
});
