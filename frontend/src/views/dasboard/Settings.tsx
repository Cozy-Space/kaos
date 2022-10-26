import { faSpinner, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent } from "react";
import { LabeledInput } from "../../components/LabeledInput";
import { useLogin } from "../../hooks/LoginHook";

export function Settings() {
  const loginApi = useLogin();

  const handleChangePassword = (event: any) => {
    event.preventDefault();
    loginApi.changePassword(
      event.currentTarget.oldPassword.value,
      event.currentTarget.newPassword.value
    );
  };

  return (
    <div className="text-center">
      <form
        onSubmit={handleChangePassword}
        className="w-full text-left max-w-md  border-slate-500 rounded-lg py-4 inline-flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold text-slate-700">Change Password</h1>
        <p className="text-slate-500">Use this form to update your password.</p>
        <LabeledInput label="Old Password" type="password" name="oldPassword" />
        <LabeledInput label="New Password" type="password" name="newPassword" />
        {loginApi.passwordChangeFailed && (
          <div className="text-red-400">password change failed</div>
        )}
        <button
          type="submit"
          className="flex items-center justify-center gap-1 px-2 py-3 relative text-white bg-slate-600 rounded-lg
        hover:bg-slate-700 active:top-0.5 transition-colors"
        >
          <div>Login</div>
          {loginApi.changingPassword ? (
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
