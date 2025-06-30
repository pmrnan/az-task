import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { AppSelectForm } from "./AppSelectForm";

const options = [
  { value: "apple", label: "りんご" },
  { value: "banana", label: "バナナ" },
];

// RHF を含んだラッパーコンポーネント
const Wrapper = ({
  value,
  onChange,
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
      <AppSelectForm
        title="フルーツ"
        value={value}
        onChange={onChange ? onChange : jest.fn()}
        options={options}
        isRequired={isRequired}
      />
    </FormProvider>
  );
};

describe("AppSelectForm", () => {
  it("選択値・任意項目指定なし", () => {
    render(<Wrapper value={null} />);
    // タイトル
    expect(screen.getByText("フルーツ")).toBeInTheDocument();
    // 初期選択値
    expect(screen.getByText("-- 未選択 --")).toBeInTheDocument();
    // 必須マーク（*）
    expect(
      screen.queryByText((text) => text.includes("*")),
    ).not.toBeInTheDocument();
  });

  it("選択値指定", () => {
    render(<Wrapper value="apple" />);
    expect(
      screen.queryByText((text) => text.includes("りんご")),
    ).toBeInTheDocument();
  });

  it("必須指定", () => {
    render(<Wrapper value={null} isRequired={true} />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("選択肢を開いて選択", async () => {
    const handleChange = jest.fn();
    render(<Wrapper value={null} onChange={handleChange} />);

    // セレクトを開く
    fireEvent.click(screen.getByText("-- 未選択 --"));

    // 選択肢が表示される
    expect(screen.getByText("りんご")).toBeInTheDocument();
    expect(screen.getByText("バナナ")).toBeInTheDocument();

    // バナナを選択する
    fireEvent.click(screen.getByText("バナナ"));

    // onChange 関数(引数:banana)が呼ばれること
    expect(handleChange).toHaveBeenCalledWith("banana");
  });

  it("未選択を選んだとき null が渡される", async () => {
    const handleChange = jest.fn();
    render(<Wrapper value="apple" onChange={handleChange} />);

    // セレクトを開く
    fireEvent.click(screen.getByText("りんご"));

    // 選択肢が表示される
    expect(screen.getByText("-- 未選択 --")).toBeInTheDocument();
    expect(screen.getByText("バナナ")).toBeInTheDocument();

    // 未選択を選択する
    fireEvent.click(screen.getByText("-- 未選択 --"));

    // onChange 関数(引数:null)が呼ばれること
    expect(handleChange).toHaveBeenCalledWith(null);
  });
});
