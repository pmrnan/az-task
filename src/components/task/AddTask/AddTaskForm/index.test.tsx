import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddTaskForm } from "./index";

describe("AddTaskForm", () => {
  beforeAll(() => {
    // Fakeタイマー有効化
    jest.useFakeTimers({ advanceTimers: true });
  });

  afterAll(() => {
    // テスト後にタイマーを戻す
    jest.useRealTimers();
  });

  const setup = () => {
    const onValid = jest.fn();
    const onInValid = jest.fn();
    render(<AddTaskForm onValid={onValid} onInValid={onInValid} />);
    return { onValid, onInValid };
  };

  it("初期表示確認", () => {
    setup();

    expect(screen.getByText("タスク名")).toBeInTheDocument();
    expect(screen.getByText("優先度")).toBeInTheDocument();
    expect(screen.getByText("期日")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "追加" })).toBeInTheDocument();
  });

  it("追加_異常系_タスク名が空", async () => {
    const { onValid, onInValid } = setup();

    fireEvent.click(screen.getByRole("button", { name: "追加" }));

    await waitFor(() => {
      expect(onValid).not.toHaveBeenCalled();
      expect(onInValid).toHaveBeenCalled();
      expect(screen.getByText("タスク名は必須です")).toBeInTheDocument();
    });
  });

  it("追加_異常系_タスク名が50文字以上", async () => {
    const { onValid, onInValid } = setup();

    // タスク名入力
    await userEvent.type(
      screen.getByLabelText(/タスク名/i),
      "012345678901234567890123456789012345678901234567890"
    );

    fireEvent.click(screen.getByRole("button", { name: "追加" }));

    await waitFor(() => {
      expect(onValid).not.toHaveBeenCalled();
      expect(onInValid).toHaveBeenCalled();
      expect(
        screen.getByText("タスク名は50文字以内で入力してください")
      ).toBeInTheDocument();
    });
  });

  it("追加_正常系", async () => {
    const { onValid } = setup();
    // 日付を固定
    jest.setSystemTime(new Date("2025-07-01T00:00:00"));

    // タスク名入力
    await userEvent.type(screen.getByLabelText(/タスク名/i), "テストタスク");

    // 優先度選択
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "高" }));

    // 期日選択
    await userEvent.click(
      screen.getByRole("button", {
        name: /日付を選択してください/i,
      })
    );
    const dayCell = document.querySelector('[data-day="2025-07-02"]');
    const button = dayCell?.querySelector("button");
    await userEvent.click(button!);

    // フォーム送信
    fireEvent.click(screen.getByRole("button", { name: "追加" }));

    await waitFor(() => {
      expect(onValid).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "テストタスク",
          priority: "HIGH",
          limitDate: new Date("2025-07-02T00:00:00"),
        })
      );
    });
  });
});
