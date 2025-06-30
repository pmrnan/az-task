import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Status, Priority } from "@/generated/prisma/index.js";
import { TaskItem } from "./index";

// モック関数
const mockOnDelete = jest.fn();
const mockGetPriorityIconConst = jest.fn(() => ({
  class: "bg-red-500",
}));

// モックのカスタムフック
jest.mock("@/hooks/useTaskItem", () => ({
  useTaskItem: () => ({
    onDelete: mockOnDelete,
    getPriorityIconConst: mockGetPriorityIconConst,
  }),
}));

describe("TaskItem", () => {
  // テストデータ
  const mockTask = {
    id: 1,
    userId: 1,
    title: "テストタスク",
    priority: Priority.HIGH,
    limitDate: new Date("2025-06-30"),
    status: Status.DOING,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("初期表示確認", () => {
    render(
      <TaskItem
        key={mockTask.id}
        task={mockTask}
        fromStatus={Status.DONE}
        onDragStart={jest.fn()}
      />,
    );

    // タスク名が表示されていること
    expect(screen.getByText("テストタスク")).toBeInTheDocument();

    // 優先度アイコンが正しく表示されていること
    const icon = screen.getByTestId("priority-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("bg-red-500"); // 優先度：高に適用されるクラス

    // 日付が正しく表示されていること
    expect(screen.getByText("2025/06/30")).toBeInTheDocument();
  });

  it("タスク詳細ダイアログ表示確認", async () => {
    const { container } = render(
      <TaskItem
        key={mockTask.id}
        task={mockTask}
        fromStatus={Status.NOT_STARTED}
        onDragStart={jest.fn()}
      />,
    );

    // モーダルを開く
    const taskTitles = container.querySelectorAll("h1.border-b-1");

    const target = Array.from(taskTitles).find(
      (el) => el.textContent === "テストタスク",
    );
    expect(target).toBeInTheDocument();
    userEvent.click(target!);

    // モーダル内の内容を検証
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText("テストタスク")).toBeInTheDocument();
    expect(within(dialog).getByText("優先度")).toBeInTheDocument();
    expect(within(dialog).getByText("高")).toBeInTheDocument();
    expect(within(dialog).getByText("期日")).toBeInTheDocument();
    expect(within(dialog).getByText("2025/06/30")).toBeInTheDocument();
    expect(within(dialog).getByText("ステータス")).toBeInTheDocument();
    expect(within(dialog).getByText("着手中")).toBeInTheDocument();
  });

  it("タスク削除_実行", async () => {
    render(
      <TaskItem
        key={mockTask.id}
        task={mockTask}
        fromStatus={Status.NOT_STARTED}
        onDragStart={jest.fn()}
      />,
    );
    const user = userEvent.setup();

    // 削除ボタンをクリック（クラスで識別）
    const deleteButton = screen.getByTestId("delete-button");
    await user.click(deleteButton);

    // 確認メッセージ表示
    const confirm = await screen.findByText("タスクを削除しますか？");
    expect(confirm).toBeInTheDocument();

    // 確認ダイアログの「削除する」ボタンを押す
    const confirmYes = screen.getByRole("button", { name: /削除する/i });
    await user.click(confirmYes);

    // onDelete 関数が呼び出されること
    expect(mockOnDelete).toHaveBeenCalledWith(1, Status.DOING);
  });

  it("タスク削除_キャンセル", async () => {
    render(
      <TaskItem
        key={mockTask.id}
        task={mockTask}
        fromStatus={Status.NOT_STARTED}
        onDragStart={jest.fn()}
      />,
    );
    const user = userEvent.setup();

    // 削除ボタンをクリック（クラスで識別）
    const deleteButton = screen.getByTestId("delete-button");
    await user.click(deleteButton);

    // 確認ダイアログの「キャンセル」ボタンを押す
    const confirmNo = screen.getByRole("button", { name: /キャンセル/i });
    await user.click(confirmNo);

    // onDelete 関数が呼び出されないこと
    expect(mockOnDelete).not.toHaveBeenCalled();
  });
});
