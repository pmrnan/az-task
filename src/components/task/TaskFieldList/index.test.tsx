import { render, screen } from "@testing-library/react";
import { TaskFieldList } from "@/components/task/TaskFieldList";
import { Status } from "@/generated/prisma";

// モックのカスタムフック
jest.mock("@/hooks/useTaskFieldList", () => ({
  useTaskFieldList: jest.fn(),
}));
const mockUseTaskFieldList =
  require("@/hooks/useTaskFieldList").useTaskFieldList;

describe("TaskFieldList", () => {
  // テストデータ
  const mockTask = [
    {
      id: 1,
      userId: 1,
      title: "テストタスク_未着手",
      status: Status.NOT_STARTED,
      priority: null,
      limitDate: null,
    },
    {
      id: 2,
      userId: 1,
      title: "テストタスク_着手中",
      status: Status.DOING,
      priority: null,
      limitDate: null,
    },
    {
      id: 3,
      userId: 1,
      title: "テストタスク_完了",
      status: Status.DONE,
      priority: null,
      limitDate: null,
    },
  ];

  beforeEach(() => {
    mockUseTaskFieldList.mockReturnValue({
      notStartedTasks: mockTask,
      doingTasks: [],
      doneTasks: [],
      isLoading: false,
      onDragStart: jest.fn(),
      onDrop: jest.fn(),
      allowDrop: jest.fn(),
    });
  });

  it("初期表示確認", () => {
    render(<TaskFieldList />);

    // 3つのTaskFieldが表示されること
    expect(screen.getByText("未着手")).toBeInTheDocument();
    expect(screen.getByText("着手中")).toBeInTheDocument();
    expect(screen.getByText("完了")).toBeInTheDocument();

    // 各タスクが描画されること
    expect(screen.getByText("テストタスク_未着手")).toBeInTheDocument();
    expect(screen.getByText("テストタスク_着手中")).toBeInTheDocument();
    expect(screen.getByText("テストタスク_完了")).toBeInTheDocument();

    // ローディング画面が表示されないこと
    expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
  });

  it("ローディング中", () => {
    mockUseTaskFieldList.mockReturnValueOnce({
      notStartedTasks: [],
      doingTasks: [],
      doneTasks: [],
      isLoading: true,
      onDragStart: jest.fn(),
      onDrop: jest.fn(),
      allowDrop: jest.fn(),
    });
    render(<TaskFieldList />);

    // ローディング画面が表示されること
    expect(screen.queryByTestId("loading-spinner")).toBeInTheDocument();
  });
});
