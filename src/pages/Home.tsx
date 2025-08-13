import { useEffect, useState } from "react";
import settings from "../assets/settings_demo.png";
import integration from "../assets/integration_demo.png";
import accessToken from "../assets/access_token_demo.png";
import accessTokenCopy from "../assets/copy_access_token_demo.png";
import { useNavigate } from "react-router";
import { invoke } from "@tauri-apps/api/core";

export default function HomePage() {
  const [apiKey, setApiKey] = useState<string>("");
  const [showKey, setShowKey] = useState<boolean>(false);
  const navigate = useNavigate();

  async function saveKey() {
    await invoke("save_user", { key: apiKey.trim() });
    navigate("/dashboard");
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-neutral-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-fuchsia-500/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-10">
        <header className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex justify-center flex-col items-center text-center w-full">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Connect your Canvas
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-neutral-300">
              Follow the three steps below to securely add your Canvas API
              token. Your token is stored only on your device and is never
              shared.
            </p>
          </div>
        </header>

        <ol className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Step 1 */}
          <li className="relative rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <div className="absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 text-neutral-900 ring-2 ring-cyan-300/40">
              <span className="text-xl font-black">1</span>
            </div>

            <h2 className="mt-2 text-lg font-semibold text-white">
              Log in to your Canvas account
            </h2>
            <p className="mt-1 text-sm text-neutral-300">
              Open your institution&apos;s Canvas site and sign in. Then select
              the settings from your account dropdown.
            </p>

            <div className="mt-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 ring-1 ring-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_60%)]" />
                <img
                  className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-1"
                  src={settings}
                />
              </div>
            </div>
          </li>

          {/* Step 2 */}
          <li className="relative rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <div className="absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 text-neutral-900 ring-2 ring-cyan-300/40">
              <span className="text-xl font-black">2</span>
            </div>

            <h2 className="mt-2 text-lg font-semibold text-white">
              Navigate to "Approved Integrations"
            </h2>

            <div className="mt-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 ring-1 ring-white/5">
                <img
                  className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-1"
                  src={integration}
                />
              </div>
            </div>
          </li>

          {/* Step 3 */}
          <li className="relative rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <div className="absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 text-neutral-900 ring-2 ring-cyan-300/40">
              <span className="text-xl font-black">3</span>
            </div>

            <h2 className="mt-2 text-lg font-semibold text-white">
              Generate a new access token
            </h2>

            <p className="mt-1 text-sm text-neutral-300">
              Your access token must have a purpose for canvas to authorize it.
              You can enter any value you want. Canvas uses this as an
              identifier for each token.
            </p>

            <div className="mt-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 ring-1 ring-white/5">
                <img
                  className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-1"
                  src={accessToken}
                />
              </div>
            </div>
          </li>

          {/* Step 4 */}
          <li className="relative rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <div className="absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 text-neutral-900 ring-2 ring-cyan-300/40">
              <span className="text-xl font-black">4</span>
            </div>

            <h2 className="mt-2 text-lg font-semibold text-white">
              Copy your access token
            </h2>

            <p className="mt-1 text-sm text-neutral-300">
              This key authorizes this application to access canvas data on your
              behalf. We will never use this to modify anything without you
              knowing. Please read our terms below for further details.
            </p>

            <div className="mt-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 ring-1 ring-white/5">
                <img
                  className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-1"
                  src={accessTokenCopy}
                />
              </div>
            </div>
          </li>

          {/* Step 5 */}
        </ol>

        <div className="relative rounded-2xl border mt-6 border-neutral-800 bg-neutral-900/50 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] w-full">
          <div className="absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 text-neutral-900 ring-2 ring-cyan-300/40">
            <span className="text-xl font-black">5</span>
          </div>

          <h2 className="mt-2 text-lg font-semibold text-white">
            Paste your API key
          </h2>
          <p className="mt-1 text-sm text-neutral-300">
            Your key is saved locally on this device. This app will only read
            data, never modify or submit anything to Canvas.
          </p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3">
              <input
                type={"password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.currentTarget.value)}
                placeholder="Paste your Canvas API token"
                className="min-w-0 flex-1 rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              />
              <button
                type="button"
                onClick={() => saveKey()}
                className="bg-cyan-500 border px-3 py-2 text-xs text-neutral-300 hover:border-cyan-400"
              >
                {`Submit`}
              </button>
            </div>
          </div>
        </div>

        <div className="w-full mt-6 rounded-lg border border-neutral-800 bg-neutral-900/60 p-3 text-xs text-neutral-300">
          <div className="w-full mb-1 font-semibold text-neutral-200">
            Privacy & Safety
          </div>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <span className="font-medium">Local-only:</span> Your API key is
              stored in your browser&apos;s local storage within this app. It
              never leaves your device.
            </li>
            <li>
              <span className="font-medium">Read-only:</span> The key is used
              only to fetch and display assignment information. This app will
              never modify or submit assignments.
            </li>
            <li>
              You can clear or replace your key at any time by removing it from
              local storage.
            </li>
          </ul>
        </div>

        <footer className="mt-10 flex items-center justify-between text-xs text-neutral-400">
          <span>
            Need help? Check your institution&apos;s Canvas docs for exact menu
            labels; they may vary slightly.
          </span>
        </footer>
      </div>
    </div>
  );
}
