import { useLoginApi } from "../hooks/LoginHook";

export function CreateAccount() {
  const loginApi = useLoginApi();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    loginApi.create(e.target.username.value, e.target.password.value);
  };

  return (
    <div>
      <form className="inline-flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          className="px-2 py-1 bg-slate-200 rounded-lg"
          type="text"
          name="username"
        />
        <input
          className="px-2 py-1 bg-slate-200 rounded-lg"
          type="password"
          name="password"
        />
        <input
          className="px-2 py-1 bg-slate-200 rounded-lg"
          type="submit"
          value="Create"
        />
      </form>
    </div>
  );
}
