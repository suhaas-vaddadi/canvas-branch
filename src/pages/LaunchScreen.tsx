import { invoke } from "@tauri-apps/api/core";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function LaunchScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    async function check_user() {
      const str: string = await invoke("check_user", {});
      if (str == "false") {
        navigate("/instructions");
      } else {
        navigate("/dashboard");
      }
    }
    check_user();
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-white">
      <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin mb-6" />
      <h1 className="text-2xl font-semibold tracking-wide text-slate-200">
        Mural
      </h1>
    </div>
  );
}
