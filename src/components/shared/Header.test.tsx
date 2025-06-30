import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("初期表示確認", () => {
    render(<Header />);

    // headerタグがあること
    const header = screen.getByRole("banner"); // role="banner" は <header> の暗黙の role
    expect(header).toBeInTheDocument();

    // 見出しテキストが表示されること
    expect(
      screen.getByRole("heading", { level: 1, name: "Az Task" }),
    ).toBeInTheDocument();

    // 画像が存在すること（alt 属性で判定）
    expect(screen.getByAltText("Application logo")).toBeInTheDocument();
  });
});
