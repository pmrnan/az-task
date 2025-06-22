import Image from "next/image";

export const Header = () => {
  return (
    <header id="header">
      <div className="flex items-center gap-x-5">
        <div className="pl-4">
          <Image
            aria-hidden
            src="/aztask_logo.png"
            alt="Application logo"
            width={32}
            height={32}
          />
        </div>
        <h1>Az Task</h1>
      </div>
    </header>
  );
};
