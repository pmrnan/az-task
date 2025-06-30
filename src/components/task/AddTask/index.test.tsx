import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddTask } from "@/components/task/AddTask";

// モック関数
const mockPostTask = jest.fn();

// モックのカスタムフック
jest.mock("@/hooks/useAddTask", () => ({
  useAddTask: () => ({
    postTask: mockPostTask,
  }),
}));

describe("AddTask", () => {
  beforeAll(() => {
    // Fakeタイマー有効化
    jest.useFakeTimers({ advanceTimers: true });
  });

  afterAll(() => {
    // テスト後にタイマーを戻す
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("フォーム送信時に postTask が呼ばれる", async () => {
    render(<AddTask />);

    // 日付を固定
    jest.setSystemTime(new Date("2025-07-01T00:00:00"));

    // タスク名入力
    await userEvent.type(screen.getByLabelText(/タスク名/i), "テストタスク");

    // 優先度選択
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "高" }));

    // 期日入力
    await userEvent.click(
      screen.getByRole("button", {
        name: /日付を選択してください/i,
      }),
    );
    const dayCell = document.querySelector('[data-day="2025-07-02"]');
    const button = dayCell?.querySelector("button");
    await userEvent.click(button!);

    // フォーム送信
    fireEvent.click(screen.getByRole("button", { name: "追加" }));

    // postTask が呼ばれたか確認
    await waitFor(() => {
      expect(mockPostTask).toHaveBeenCalledTimes(1);
      expect(mockPostTask).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "テストタスク",
          priority: "HIGH",
          limitDate: new Date("2025-07-02T00:00:00"),
        }),
      );
    });
  });
});
