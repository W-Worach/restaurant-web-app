import { changeUserPassword } from "@/services/UserService";
import config from "@/services/_config";

global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ChangePasswordService", () => {
  it("should change user password successfully", async () => {
    const userData = {
      userId: "123",
      password: "currentpassword",
      newPassword: "newpassword123!",
    };
    const token = "token";
    const mockResponse = { message: "Password changed successfully" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
      headers: { get: () => "application/json" }, 
    });

    const result = await changeUserPassword(userData, token);
    expect(fetch).toHaveBeenCalledWith(
      `${config.apiUrl}/Change-User-Password`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData.userId,
          password: userData.password,
          newPassword: userData.newPassword,
        }),
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error when changing password fails", async () => {
    const userData = {
      userId: "123",
      password: "currentpassword",
      newPassword: "newpassword123!",
    };
    const token = "token";
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Unauthorized",
    });

    await expect(changeUserPassword(userData, token)).rejects.toThrow(
      "Problem with changing password. Unauthorized"
    );
  });
});
