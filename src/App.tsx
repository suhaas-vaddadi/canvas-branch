import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import type { Course } from "./types";

function App() {
  const [token, setToken] = useState("");
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [error, setError] = useState<string>("No error");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    try {
      setCourses(JSON.parse(await invoke("test_rest", { token })));
    } catch (error) {
      const err = error as Error;
      setError(err.message);
    }
  }

  return (
    <main className="container">
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setToken(e.currentTarget.value)}
          placeholder="Paste Your Token"
        />
        <button type="submit">Fetch Courses</button>
      </form>
      {courses && courses?.map((course) => <p> {course.name} </p>)}
      {error && <p>{error}</p>}
    </main>
  );
}

export default App;
