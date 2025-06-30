import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import userEvent from "@testing-library/user-event";
import { AppDateForm } from "./AppDateForm";
import { format } from "date-fns";

// RHF を含んだラッパーコンポーネント
const Wrapper = ({
  value,
  onChange,
  placeholder,
  isRequired,
}: {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  value: any;
  onChange?: (...event: any[]) => void;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  placeholder?: string;
  isRequired?: boolean;
}) => {
  const form = useForm();
  return (
    <FormProvider {...form}>
      <AppDateForm
        title="日付"
        value={value}
        onChange={onChange ? onChange : jest.fn()}
        placeholder={placeholder}
        isRequired={isRequired}
      />
    </FormProvider>
  );
};

describe("AppDateForm", () => {
  it("日付・任意項目指定なし", () => {
    render(<Wrapper value={null} />);
    // タイトル
    expect(screen.getByText("日付")).toBeInTheDocument();
    // プレースホルダー
    expect(screen.getByText("日付を選択してください")).toBeInTheDocument();
    // 必須マーク（*）
    expect(
      screen.queryByText((text) => text.includes("*")),
    ).not.toBeInTheDocument();
  });

  it("プレースホルダー指定", () => {
    render(<Wrapper value={null} placeholder="日付を選択" />);
    expect(screen.getByText("日付を選択")).toBeInTheDocument();
  });

  it("日付指定", () => {
    const date = new Date(2024, 4, 1);
    render(<Wrapper value={date} />);
    expect(screen.getByText(format(date, "yyyy/MM/dd"))).toBeInTheDocument();
  });

  it("必須指定", () => {
    render(<Wrapper value={null} isRequired={true} />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("日付をクリアボタン押下時", async () => {
    const handleChange = jest.fn();
    const date = new Date(2024, 4, 1);
    render(<Wrapper value={date} onChange={handleChange} />);

    // 日付表示ボタンをクリックしてポップオーバーを開く
    await userEvent.click(
      screen.getByRole("button", { name: /2024\/05\/01/i }),
    );

    // 日付をクリアボタンを押す
    await userEvent.click(screen.getByRole("button", { name: "日付をクリア" }));

    // onChange 関数(引数:undefined)が呼ばれること
    expect(handleChange).toHaveBeenCalledWith(undefined);
  });
});
