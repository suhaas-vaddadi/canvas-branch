use keyring::{Entry};
use reqwest::Client;

const SERVICE: &str = "canvas_app";
const USERNAME: &str = "user_token";


#[tauri::command]
async fn fetch_courses<R: Runtime>(app: tauri::AppHandle<R>, window: tauri::Window<R>) -> Result<(), String> {
  Ok(())
}