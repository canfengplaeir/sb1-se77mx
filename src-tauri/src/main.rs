#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use chrono::Utc;
use tauri::Manager;

#[tauri::command]
fn get_current_time() -> String {
    Utc::now().to_rfc3339()
}

#[tauri::command]
async fn sync_time(ntp_server: String) -> Result<String, String> {
    // 这里应该实现实际的NTP时间同步逻辑
    // 为了示例，我们只返回当前时间
    Ok(Utc::now().to_rfc3339())
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_current_time, sync_time])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}