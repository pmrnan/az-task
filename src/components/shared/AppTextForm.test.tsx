import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider } from "react-hook-form";
import { AppTextForm } from "./AppTextForm";

// RHF を含んだラッパーコンポーネント
const Wrapper = ({
  value,
  onChange,
  placeholder,
  isRequired,
}: {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  value?: any;
  onChange?: (...event: any[]) => void;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  placeholder?: string;
  isRequired?: boolean;
}) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <AppTextForm
        title="名前"
        value={value}
        onChange={onChange ? onChange : jest.fn()}
        placeholder={placeholder}
        isRequired={isRequired}
      />
    </FormProvider>
  );
};

describe("AppTextForm", () => {
  it("入力値・任意項目指定なし", () => {
    render(<Wrapper />);
    // タイトル
    expect(screen.getByText("名前")).toBeInTheDocument();
    // プレースホルダー
    expect(screen.getByPlaceholderText("入力してください")).toBeInTheDocument();
    // 必須マーク（*）
    expect(
      screen.queryByText((text) => text.includes("*")),
    ).not.toBeInTheDocument();
  });

  it("プレースホルダー指定", () => {
    render(<Wrapper placeholder="名前を入力" />);
    expect(screen.getByPlaceholderText("名前を入力")).toBeInTheDocument();
  });

  it("入力値指定", () => {
    render(<Wrapper value="佐藤" />);
    expect(screen.getByDisplayValue("佐藤")).toBeInTheDocument();
  });

  it("必須指定", () => {
    render(<Wrapper isRequired={true} />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("テキスト入力時", async () => {
    const handleChange = jest.fn();
    render(<Wrapper onChange={handleChange} />);

    const input = screen.getByPlaceholderText("入力してください");

    // 各文字入力ごとに onChange 関数が呼ばれること
    await userEvent.type(input, "田");
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0].target.value).toBe("田");
    await userEvent.type(input, "中");
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange.mock.calls[1][0].target.value).toBe("田中");
  });
});
