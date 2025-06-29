import { render, screen } from "@testing-library/react";
import { StatusBadge } from "./index";

describe("StatusBadge", () => {
  it("初期表示確認", () => {
    render(<StatusBadge statusName="完了" class="bg-green-500 text-white" />);

    // 指定したステータスが表示されること
    expect(screen.getByText("完了")).toBeInTheDocument();

    // 指定されたクラスが適用されること
    const badge = screen.getByText("完了").parentElement;
    expect(badge).toHaveClass("bg-green-500");
    expect(badge).toHaveClass("text-white");
    expect(badge).toHaveClass("task-status-badge"); // デフォルトのクラスも確認
  });
});
