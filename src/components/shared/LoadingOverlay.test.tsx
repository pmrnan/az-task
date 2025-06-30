import { render, screen } from "@testing-library/react";
import { LoadingOverlay } from "./LoadingOverlay";

describe("LoadingOverlay", () => {
  it("初期表示確認", () => {
    const { container } = render(<LoadingOverlay />);

    // ローディングスピナーが表示されること
    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toBeInTheDocument();

    // オーバーレイの背景クラスが付与されること
    const overlay = container.firstChild as HTMLElement;
    expect(overlay.className).toMatch(/bg-gray-800\/70/);
    expect(overlay.className).toMatch(/backdrop-blur-sm/);
  });

  it("className 指定", () => {
    const { container } = render(<LoadingOverlay className="custom-class" />);
    const overlay = container.firstChild as HTMLElement;
    expect(overlay.className).toMatch(/custom-class/);
  });
});
