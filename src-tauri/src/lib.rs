use reqwest::header::{HeaderMap, HeaderValue, AUTHORIZATION};
mod auth;
use auth::check_user;
use auth::save_user;
use reqwest::Client;
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

#[tauri::command]
async fn fetch_courses(token: &str) -> Result<String, String> {
    let mut password = check_user();

    if &password == "false"{
        password = token.to_string();
        let _ = save_user(&token);
    }


    let mut headers = HeaderMap::new();
    let auth_value = format!("Bearer {}", &password);
    let head = HeaderValue::from_str(&auth_value).unwrap();

    headers.insert(AUTHORIZATION, head);
    
    let resp = Client::new()
        .get("https://canvas.instructure.com/api/v1/courses")
        .headers(headers)
        .send()
        .await.unwrap();

    let json_body: serde_json::Value = resp.json().await.unwrap();

    Ok(serde_json::to_string_pretty(&json_body).unwrap())
}



#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![fetch_courses, check_user, save_user])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
