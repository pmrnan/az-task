import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeleteWithConfirm } from "./DeleteWithConfirm";

describe("DeleteWithConfirm", () => {
  it("初期表示確認", async () => {
    const onDeleteMock = jest.fn();

    render(
      <DeleteWithConfirm
        confirmMessage="本当に削除しますか？"
        deleteButton={<button>削除</button>}
        onDelete={onDeleteMock}
      />
    );

    // 削除ボタンを押下する
    const triggerButton = screen.getByText("削除");
    await userEvent.click(triggerButton);

    // ダイアログの確認メッセージが表示されること（非同期描画のため waitFor）
    await waitFor(() => {
      expect(screen.queryByText("本当に削除しますか？")).toBeInTheDocument();
    });

    // 各ボタンが表示されること
    expect(screen.queryByText("削除する")).toBeInTheDocument();
    expect(screen.queryByText("キャンセル")).toBeInTheDocument();
  });

  it("削除するボタン押下時", async () => {
    const onDeleteMock = jest.fn();

    render(
      <DeleteWithConfirm
        confirmMessage="本当に削除しますか？"
        deleteButton={<button>削除</button>}
        onDelete={onDeleteMock}
      />
    );

    // 削除ボタンを押下する
    const triggerButton = screen.getByText("削除");
    await userEvent.click(triggerButton);

    // ダイアログが表示される
    await waitFor(() => {
      expect(screen.queryByText("本当に削除しますか？")).toBeInTheDocument();
    });

    // 「削除する」ボタンを押下する
    const confirmButton = screen.getByText("削除する");
    await userEvent.click(confirmButton);

    // onDelete 関数が呼ばれること
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });

  it("キャンセルボタン押下時", async () => {
    const onDeleteMock = jest.fn();

    render(
      <DeleteWithConfirm
        confirmMessage="本当に削除しますか？"
        deleteButton={<button>削除</button>}
        onDelete={onDeleteMock}
      />
    );

    // 削除ボタンを押下する
    await userEvent.click(screen.getByText("削除"));

    // ダイアログが表示される
    await waitFor(() => {
      expect(screen.queryByText("本当に削除しますか？")).toBeInTheDocument();
    });

    // 「キャンセル」ボタンを押下する
    await userEvent.click(screen.getByText("キャンセル"));

    // キャンセル後、モーダルが非表示になること
    await waitFor(() => {
      expect(
        screen.queryByText("本当に削除しますか？")
      ).not.toBeInTheDocument();
    });

    // onDelete 関数が呼ばれないこと
    expect(onDeleteMock).not.toHaveBeenCalled();
  });
});
