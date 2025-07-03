import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AlertDialog from "../AlertDialog";

describe("Alert Boulder", () => {
  it("should render correct title", () => {
    const setIsOpenAlertDialog = vi.fn();
    const handleDelete = vi.fn();
    render(
      <AlertDialog
        open={true}
        setOpen={setIsOpenAlertDialog}
        handleDelete={handleDelete}
        boulderName={"boulder name"}
      />
    );
    expect(screen.getByTestId("alert-dialog-title")).toBeInTheDocument();
  });

  it("should close when annulla is clicked", async () => {
    const user = userEvent.setup();

    const setIsOpenAlertDialog = vi.fn();
    const handleDelete = vi.fn();

    render(
      <AlertDialog
        open={true}
        setOpen={setIsOpenAlertDialog}
        handleDelete={handleDelete}
        boulderName={"boulder name"}
      />
    );

    const closeDialogBtn = screen.getByRole("button", { name: "Annulla" });
    await user.click(closeDialogBtn);
    expect(setIsOpenAlertDialog).toHaveBeenCalledWith(false);
  });

  it("should delete and close when accetta is clicked", async () => {
    const user = userEvent.setup();
    const setIsOpenAlertDialog = vi.fn();
    const handleDelete = vi.fn();

    render(
      <AlertDialog
        open={true}
        setOpen={setIsOpenAlertDialog}
        handleDelete={handleDelete}
        boulderName={"boulder name"}
      />
    );

    const acceptBtn = screen.getByRole("button", { name: "Accetta" });
    await user.click(acceptBtn);

    expect(handleDelete).toHaveBeenCalled();
    expect(setIsOpenAlertDialog).toHaveBeenCalledWith(false);
  });
});
