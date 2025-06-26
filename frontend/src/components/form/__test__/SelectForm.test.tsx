import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectForm from "../SelectForm";

describe("SelectForm", () => {
  it("renders the select with all menu items", async () => {
    const mockSetFormData = vi.fn();
    const menuItems = ["facile", "media", "difficile"];

    render(
      <SelectForm
        menuItems={menuItems}
        setFormData={mockSetFormData}
        value={"facile"}
      />
    );

    const select = screen.getByRole("combobox");
    await userEvent.click(select);

    for (const item of menuItems) {
      const option = await screen.findByRole("option", { name: item });
      expect(option).toBeInTheDocument();
    }
  });

  it("calls setFormData on selection change", async () => {
    const mockSetFormData = vi.fn();
    const menuItems = ["facile", "media", "difficile"];

    render(
      <SelectForm
        menuItems={menuItems}
        setFormData={mockSetFormData}
        value={"facile"}
      />
    );

    const select = screen.getByRole("combobox");
    await userEvent.click(select);

    const option = await screen.findByRole("option", { name: "media" });
    await userEvent.click(option);

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
  });
});
