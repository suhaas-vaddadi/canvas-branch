use reqwest::header::{HeaderMap, HeaderValue, AUTHORIZATION};
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn test_rest(token: &str) -> Result<String, String> {
    let mut headers = HeaderMap::new();
    let auth_value = format!("Bearer {}", token);
    let head = HeaderValue::from_str(&auth_value).unwrap();

    headers.insert(AUTHORIZATION, head);

    let client = reqwest::Client::new();
    let resp = client
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
        .invoke_handler(tauri::generate_handler![greet, test_rest])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
