import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppLayout from "./AppLayout";

describe("AppLayout", () => {
  test("Should be render the Outlet inside a Container", () => {
    const { container } = render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>
    );

    const mainElement = container.querySelector('main');
    expect(mainElement).toBeInTheDocument();

    const containerElement = container.querySelector('.chakra-container');
    expect(containerElement).toBeInTheDocument();
  });
});
