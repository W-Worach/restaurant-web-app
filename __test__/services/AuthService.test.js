import { login, register } from "@/services/AuthService";
import config from "@/services/_config";

global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("authService", () => {
  describe("login", () => {
    it("should login successfully", async () => {
      const mockUser = { username: "testuser", password: "password123" };
      const mockResponse = { token: "12345" };
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await login(mockUser.username, mockUser.password);
      expect(fetch).toHaveBeenCalledWith(`${config.apiUrl}/login-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockUser),
      });
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if login fails", async () => {
      const mockUser = { username: "testuser", password: "wrongpassword" };
      fetch.mockResolvedValue({
        ok: false,
        status: 401,
      });

      await expect(login(mockUser.username, mockUser.password))
        .rejects
        .toThrow("401");
    });
  });

  describe("register", () => {
    it("should register successfully", async () => {
      const mockUser = { username: "newuser", email: "newuser@example.com", password: "password123" };
      const mockResponse = { id: "1", username: "newuser" };
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await register(mockUser.username, mockUser.email, mockUser.password);
      expect(fetch).toHaveBeenCalledWith(`${config.apiUrl}/register-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockUser),
      });
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if registration fails", async () => {
      const mockUser = { username: "newuser", email: "newuser@example.com", password: "password123" };
      fetch.mockResolvedValue({
        ok: false,
        status: 500,
      });

      await expect(register(mockUser.username, mockUser.email, mockUser.password))
        .rejects
        .toThrow("500");
    });
  });
});
