import { getTables } from "@/services/TablesService"
import config from "@/services/_config";

global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("TableService", () => {
  describe("getTables", () => {
    it("should fetch tables successfully", async () => {
      const mockTables = [{ id: 1, name: "Table1" }, { id: 2, name: "Table2" }];
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockTables),
        statusText: "OK"
      });

      const result = await getTables();
      expect(fetch).toHaveBeenCalledWith(`${config.apiUrl}/api/Table`, {
        method: "GET",
      });
      expect(result).toEqual(mockTables);
    });

    it("should throw an error when fetching tables fails", async () => {
      fetch.mockResolvedValue({
        ok: false,
        statusText: "Internal Server Error"
      });

      await expect(getTables()).rejects.toThrow("Table downloading problem. Internal Server Error");
    });
  });
});
