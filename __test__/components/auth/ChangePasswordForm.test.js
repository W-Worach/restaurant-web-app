import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChangeUserPasswordForm from "@/components/auth/ChangePasswordForm";

const onSubmitMock = jest.fn();

describe("ChangeUserPasswordForm", () => {
  beforeEach(() => {
    onSubmitMock.mockClear();
  });

  it("submits the form with valid input", async () => {
    const { getByLabelText, getByRole } = render(
      <ChangeUserPasswordForm onSubmit={onSubmitMock} />
    );

    await userEvent.type(getByLabelText("Current Password"), "currentpassword");
    await userEvent.type(getByLabelText("New Password"), "Newpass123!");
    await userEvent.type(getByLabelText("Confirm New Password"), "Newpass123!");

    userEvent.click(getByRole("button", { name: /change password/i }));

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
      expect(onSubmitMock).toHaveBeenCalledWith({
        password: "currentpassword",
        newPassword: "Newpass123!",
        confirmNewPassword: "Newpass123!",
        setMessage: expect.any(Function),
        setError: expect.any(Function),
      });
    });
  });

  it("displays error message if password is less than 8 characters", async () => {
    const { getByLabelText, getByText, getByRole } = render(
      <ChangeUserPasswordForm onSubmit={onSubmitMock} />
    );

    await userEvent.type(getByLabelText("Current Password"), "OldPassword");
    await userEvent.type(getByLabelText("New Password"), "short");
    await userEvent.type(getByLabelText("Confirm New Password"), "short");

    userEvent.click(getByRole("button", { name: /change password/i }));

    await waitFor(() => {
      expect(
        getByText("Password must be at least 8 characters long.")
      ).toBeInTheDocument();
      expect(onSubmitMock).not.toHaveBeenCalled();
    });
  });

  it("displays error message if password does not meet complexity requirements", async () => {
    const { getByLabelText, getByText, getByRole } = render(
      <ChangeUserPasswordForm onSubmit={onSubmitMock} />
    );

    await userEvent.type(getByLabelText("Current Password"), "currentpassword");
    await userEvent.type(getByLabelText("New Password"), "simplepassword");
    await userEvent.type(
      getByLabelText("Confirm New Password"),
      "simplepassword"
    );

    userEvent.click(getByRole("button", { name: /change password/i }));

    await waitFor(() => {
      expect(
        getByText(
          "The password must contain small and capital letters, numbers and special characters."
        )
      ).toBeInTheDocument();
      expect(onSubmitMock).not.toHaveBeenCalled();
    });
  });
});
