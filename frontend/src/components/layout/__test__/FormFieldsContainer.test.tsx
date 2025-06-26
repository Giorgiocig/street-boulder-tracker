import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import FormFieldsContainer from "../FormFieldsContainer";

describe("BoulderFormContainer", () => {
  it("should render TextField", async () => {
    const handleChange = vi.fn();
    render(
      <FormFieldsContainer
        fields={[
          {
            id: "textfield-name",
            label: "nome",
            name: "name",
            variant: "outlined",
            onChange: handleChange,
            value: "hello",
          },
        ]}
      />
    );
    const textFieldInput = screen.getByLabelText("nome");
    expect(textFieldInput).toBeInTheDocument();
  });
  it("should render Select", async () => {
    const handleChange = vi.fn();
    render(
      <FormFieldsContainer
        fields={[
          {
            select: true,
            setFormData: handleChange,
            menuItems: ["facile"],
            value: "facile",
          },
        ]}
      />
    );
    const selectInput = screen.getByRole("combobox");
    expect(selectInput).toBeInTheDocument();
  });
  it("should render TextField and Select", async () => {
    const handleChange = vi.fn();
    render(
      <FormFieldsContainer
        fields={[
          {
            select: true,
            setFormData: handleChange,
            menuItems: ["facile"],
            value: "facile",
          },
          {
            id: "textfield-name",
            label: "nome",
            name: "name",
            variant: "outlined",
            onChange: handleChange,
            value: "hello",
          },
        ]}
      />
    );
    const textFieldInput = screen.getByLabelText("nome");
    const selectInput = screen.getByRole("combobox");
    expect(textFieldInput).toBeInTheDocument();
    expect(selectInput).toBeInTheDocument();
  });
});
