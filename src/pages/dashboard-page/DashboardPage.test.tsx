import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DashboardPage from "./DashboardPage";
import { CustomThemeContext } from "../../contexts/ThemeContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import blogData from "../../data/blog-data";

const mockToggleColorMode = jest.fn();

jest.mock("../../components/blog-table/BlogTable", () => ({
  __esModule: true,
  default: ({ blogPosts }: { blogPosts: any[] }) => (
    <div data-testid="mock-blog-table">
      {blogPosts.map((p) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </div>
  ),
}));
const renderWithProviders = (
  ui: React.ReactElement,
  mode: "light" | "dark" = "light"
) => {
  const theme = createTheme({ palette: { mode } });

  return render(
    <CustomThemeContext.Provider
      value={{ toggleColorMode: mockToggleColorMode }}
    >
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

describe("DashboardPage", () => {
  beforeEach(() => {
    localStorage.clear();
    mockToggleColorMode.mockClear();
  });

  it("renders the dashboard title", () => {
    renderWithProviders(<DashboardPage />);
    expect(screen.getByText(/blog you/i)).toBeInTheDocument();
  });

  it("loads blog posts from localStorage if available", () => {
    const mockData = [{ id: 1, title: "Test Post", content: "Hello world" }];
    localStorage.setItem("localBlogData", JSON.stringify(mockData));

    renderWithProviders(<DashboardPage />);
    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });

  it("falls back to default blogData if localStorage is empty", () => {
    renderWithProviders(<DashboardPage />);
    expect(screen.getByText(blogData[0].title)).toBeInTheDocument();
  });

  it("saves blog posts to localStorage on state change", () => {
    renderWithProviders(<DashboardPage />);
    expect(localStorage.getItem("localBlogData")).toBeTruthy();
  });

  it("toggles theme when the button is clicked", () => {
    renderWithProviders(<DashboardPage />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockToggleColorMode).toHaveBeenCalled();
  });

  it("shows correct icon based on theme mode", () => {
    const { rerender } = renderWithProviders(<DashboardPage />, "light");
    expect(screen.getByTestId("DarkModeIcon")).toBeInTheDocument();

    rerender(
      <CustomThemeContext.Provider
        value={{ toggleColorMode: mockToggleColorMode }}
      >
        <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
          <DashboardPage />
        </ThemeProvider>
      </CustomThemeContext.Provider>
    );

    expect(screen.getByTestId("LightModeIcon")).toBeInTheDocument();
  });
});
