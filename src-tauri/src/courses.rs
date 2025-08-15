use reqwest::Client;
use reqwest::header::{HeaderMap, HeaderValue, AUTHORIZATION};
use crate::auth;
use auth::check_user;


#[tauri::command]
pub async fn fetch_courses() -> Result<String, String> {
    let password = check_user();

    if &password == "false"{
        return Err("Error 404".to_string());
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