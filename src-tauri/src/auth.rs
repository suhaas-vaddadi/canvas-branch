use keyring::{Entry};

const SERVICE: &str = "canvas_app";
const USERNAME: &str = "user_token";

#[tauri::command]
pub fn check_user() -> String {
    if let Ok(entry) = Entry::new(&SERVICE, &USERNAME){
        if let Ok(password) = entry.get_password(){
            return password;
        }
    }
    "false".to_string()
}


#[tauri::command]
pub fn save_user(key: &str) -> Result<(), ()>{
    if let Ok(entry) = Entry::new(&SERVICE, &USERNAME){
        if let Ok(_) = entry.set_password(key){
            return Ok(()); 
        }
    }
    return Err(());
}

#[tauri::command]
pub fn delete_key() -> Result<(), ()>{
    if let Ok(entry) = Entry::new(&SERVICE, &USERNAME){
        if let Ok(_) = entry.delete_credential(){
            return Ok(());
        }
    }
    return Err(());
}

