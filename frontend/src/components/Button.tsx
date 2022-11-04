import classNames from "classnames";

export function Button({ className, children, large = false, ...rest }: any) {
  return (
    <button
      {...rest}
      className={classNames(
        " justify-center flex items-center gap-2 px-3 transition-colors",
        { "h-14 rounded-lg": large },
        { "h-8 rounded-full": !large },
        className
      )}
    >
      {children}
    </button>
  );
}
