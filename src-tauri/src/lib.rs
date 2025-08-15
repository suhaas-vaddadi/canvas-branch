pub mod auth;
use auth::delete_key;
use auth::check_user;
use auth::save_user;
pub mod courses;
use courses::fetch_courses;
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/




#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![fetch_courses, check_user, save_user, delete_key])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
