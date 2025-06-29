import { render, screen, fireEvent } from "@testing-library/react";
import { Status } from "@/generated/prisma";
import { TaskField } from "@/components/task/TaskFieldList/TaskField";
import { Task } from "@/types/Task";

describe("TaskField", () => {
  // モック関数
  const mockOnDragStart = jest.fn();
  const mockOnDrop = jest.fn();
  const mockAllowDrop = jest.fn((e) => e.preventDefault());

  // テストデータ
  const mockTask: Task = {
    id: 1,
    userId: 1,
    title: "テストタスク",
    status: Status.NOT_STARTED,
    priority: null,
    limitDate: null,
  };
  const fieldStatusOption = {
    key: Status.NOT_STARTED,
    statusName: "未着手",
    badgeClass: "bg-gray-300",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("初期表示確認", () => {
    render(
      <TaskField
        fieldStatusOption={fieldStatusOption}
        tasks={[mockTask]}
        onDragStart={mockOnDragStart}
        onDrop={mockOnDrop}
        allowDrop={mockAllowDrop}
      />
    );

    // ステータスバッジが表示されること
    expect(screen.getByText("未着手")).toBeInTheDocument();
    // タスクが表示されること
    expect(screen.getByText("テストタスク")).toBeInTheDocument();
  });

  it("Drop 時", () => {
    const { container } = render(
      <TaskField
        fieldStatusOption={fieldStatusOption}
        tasks={[mockTask]}
        onDragStart={mockOnDragStart}
        onDrop={mockOnDrop}
        allowDrop={mockAllowDrop}
      />
    );

    // Drop 実行
    const fieldContainer = container.querySelector(".task-container")!;
    fireEvent.drop(fieldContainer);

    // onDrop 関数が呼び出されること
    expect(mockOnDrop).toHaveBeenCalledWith(Status.NOT_STARTED);
  });

  it("DragOver 時", () => {
    const { container } = render(
      <TaskField
        fieldStatusOption={fieldStatusOption}
        tasks={[mockTask]}
        onDragStart={mockOnDragStart}
        onDrop={mockOnDrop}
        allowDrop={mockAllowDrop}
      />
    );

    // DragOver 実行
    const fieldContainer = container.querySelector(".task-container")!;
    fireEvent.dragOver(fieldContainer);

    // allowDrop 関数が呼び出されること
    expect(mockAllowDrop).toHaveBeenCalled();
  });
});
