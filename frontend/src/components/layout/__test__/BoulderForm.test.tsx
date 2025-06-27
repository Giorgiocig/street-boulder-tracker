import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi, expect } from "vitest";
import BoulderForm from "../BoulderForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("BoulderForm", () => {
  it("submits the form with correct data", async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    render(
      <QueryClientProvider client={queryClient}>
        <BoulderForm />
      </QueryClientProvider>
    );

    await user.type(screen.getByLabelText("nome"), "Test Boulder");
    await user.type(screen.getByLabelText("descrizione"), "Una descrizione");
    await user.type(screen.getByLabelText("lat"), "45.0");
    await user.type(screen.getByLabelText("long"), "9.0");

    // click on select
    const select = screen.getByRole("combobox");
    await user.click(select);

    // select difficulty
    const listbox = await screen.findByRole("listbox");
    const mediaOption = within(listbox).getByText("medio");
    await user.click(mediaOption);

    //submit form
    const submitBtn = screen.getByRole("button", { name: /salva boulder/i });
    await user.click(submitBtn);

    expect(consoleSpy).toHaveBeenCalledWith({
      name: "Test Boulder",
      description: "Una descrizione",
      difficulty: "medio",
      latitude: 45.0,
      longitude: 9.0,
      createdAt: expect.any(String),
    });

    consoleSpy.mockRestore();
  });
});
