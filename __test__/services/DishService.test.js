import { getMenuItems } from "@/services/DishService";
import config from "@/services/_config";

global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("MenuService", () => {
  describe("getMenuItems", () => {
    it("should fetch menu items successfully", async () => {
      const mockMenuItems = [{ id: 1, name: "Pizza" }, { id: 2, name: "Burger" }];
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockMenuItems),
        statusText: "OK"
      });

      const result = await getMenuItems();
      expect(fetch).toHaveBeenCalledWith(`${config.apiUrl}/api/Dish`);
      expect(result).toEqual(mockMenuItems);
    });

    it("should throw an error if fetching menu items fails", async () => {
      fetch.mockResolvedValue({
        ok: false,
        statusText: "Internal Server Error"
      });

      await expect(getMenuItems()).rejects.toThrow("Problem with downloading menus. Internal Server Error");
    });
  });
});
