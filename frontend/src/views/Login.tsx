import classNames from "classnames";
import { useState } from "react";
import { useLogin } from "../hooks/LoginHook";
import { faLock, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Login() {
  const loginApi = useLogin();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    loginApi.login(e.target.username.value, e.target.password.value);
  };

  return (
    <div className="text-center">
      <form
        className="w-full relative top-10 inline-block text-left max-w-md  border-slate-500 rounded-lg px-6 py-4 inline-flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-slate-700">Login</h1>
        <p className="text-slate-500">
          Please contact fred to get access to this tool.{" "}
        </p>
        <LabeledInput type="text" name="username" label="Username" />
        <LabeledInput type="password" name="password" label="Password" />
        {loginApi.loginFailed && (
          <div className="text-red-400">Login failed</div>
        )}
        <button
          type="submit"
          className="flex items-center justify-center gap-1 px-2 py-3 relative text-white bg-slate-600 rounded-lg
        hover:bg-slate-700 active:top-0.5 transition-colors"
        >
          <div>Login</div>
          {loginApi.loggingIn ? (
            <FontAwesomeIcon
              className="w-3 h-3 animate-spin"
              icon={faSpinner}
            />
          ) : (
            <FontAwesomeIcon className="w-3 h-3" icon={faLock} />
          )}
        </button>
      </form>
    </div>
  );
}

interface LabeledInputProps {
  label: string;
  type: string;
  name: string;
}

function LabeledInput({ label, type, name }: LabeledInputProps) {
  const [value, setValue] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);

  const active = !!value || focus;

  return (
    <div className="relative">
      <div
        className={classNames(
          "absolute left-3 pointer-events-none transition-all text-slate-500 ",
          { "top-2.5 text-md italic": !active },
          { "top-1 text-xs ": active }
        )}
      >
        {label}
      </div>
      <input
        className="pb-1 pt-4 w-full px-3 border border-slate-400 rounded-lg"
        name={name}
        type={type}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
}
