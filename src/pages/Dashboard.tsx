import { invoke } from "@tauri-apps/api/core";

export default function Dashboard() {
  async function deleteKey() {
    await invoke("delete_key");
  }
  return (
    <div>
      <p>Hello this is the dashboard</p>
      <button
        onClick={() => {
          deleteKey();
        }}
      >
        Delete Key
      </button>
    </div>
  );
}
