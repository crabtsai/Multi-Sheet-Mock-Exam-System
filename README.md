# Multi-Sheet-Mock-Exam-System
# 多科目模擬考系統｜檔案設定說明

本說明適用於：

- `多科目模擬考_會員功能可收合.html`
- `config.js`
- `firebase-config.js`

建議部署時將 HTML 重新命名為 `index.html`。

---

## 1. 建議檔案結構

將以下檔案放在同一個資料夾：

```text
your-project/
├─ index.html
├─ config.js
├─ firebase-config.js
└─ README.md
```

其中：

| 檔案 | 用途 |
|---|---|
| `index.html` | 模擬考主程式 |
| `config.js` | 系統名稱、Google Sheet、題數、科目等設定 |
| `firebase-config.js` | Firebase 專案連線設定 |
| `README.md` | 本說明文件 |

---

# 2. `index.html` 怎麼設定

原始檔可直接使用：

```text
多科目模擬考_會員功能可收合.html
```

部署前建議改名：

```text
index.html
```

HTML 內已經引用：

```html
<script src="./config.js"></script>
<script src="./firebase-config.js"></script>
```

因此 `config.js` 與 `firebase-config.js` 必須和 `index.html` 放在同一層。

一般情況下，不需要直接修改 `index.html` 裡面的程式碼，只要調整另外兩個設定檔即可。

---

# 3. `config.js` 設定

請建立一個新的 `config.js`，內容可先使用以下範例。

## 3.1 自動讀取 Google Sheet 所有分頁

此模式需要 Google Sheets API Key。

```javascript
window.APP_CONFIG = {
  app: {
    title: "多科目模擬考練習"
  },

  auth: {
    emailDomain: "ipas-exam.local"
  },

  googleSheet: {
    // Google 試算表 ID
    sheetId: "請貼上你的 Google Sheet ID",

    // Google Sheets API Key
    apiKey: "請貼上你的 Google Sheets API Key",

    // 預設開啟的科目
    // 可填分頁名稱轉換後的 id，也可先留空
    defaultSubjectId: "",

    // true：自動抓取所有可見分頁
    autoDiscoverSubjects: true,

    // 不想顯示的分頁
    excludeSheetNames: [
      "設定",
      "說明"
    ],

    // 自動讀取失敗時的備援清單
    subjects: []
  },

  exam: {
    totalScore: 100,
    passScore: 70,
    defaultQuestionCount: 20,

    questionCountOptions: [
      10, 20, 30, 40, 50,
      60, 70, 80, 90, 100
    ]
  }
};
```

---

## 3.2 不使用 Google Sheets API Key

沒有 API Key 時，不能自動列出所有分頁，但仍可手動指定分頁。

```javascript
window.APP_CONFIG = {
  app: {
    title: "多科目模擬考練習"
  },

  auth: {
    emailDomain: "ipas-exam.local"
  },

  googleSheet: {
    sheetId: "請貼上你的 Google Sheet ID",

    apiKey: "",

    // 關閉自動搜尋分頁
    autoDiscoverSubjects: false,

    defaultSubjectId: "social",

    subjects: [
      {
        id: "social",
        name: "社會",
        sheetName: "社會",
        description: "社會科題庫"
      },
      {
        id: "history",
        name: "歷史",
        sheetName: "歷史",
        description: "歷史科題庫"
      },
      {
        id: "geography",
        name: "地理",
        sheetName: "地理",
        description: "地理科題庫"
      }
    ]
  },

  exam: {
    totalScore: 100,
    passScore: 70,
    defaultQuestionCount: 20,
    questionCountOptions: [10, 20, 30, 40, 50]
  }
};
```

---

## 3.3 使用 `gid` 指定分頁

也可以不用 `sheetName`，改填分頁的 `gid`：

```javascript
subjects: [
  {
    id: "social",
    name: "社會",
    gid: "0"
  },
  {
    id: "history",
    name: "歷史",
    gid: "123456789"
  }
]
```

`sheetName` 與 `gid` 填其中一種即可。

建議：

- 分頁名稱不常修改：使用 `sheetName`
- 分頁名稱可能改名：使用 `gid`

---

# 4. Google Sheet 設定

## 4.1 找出 Sheet ID

Google Sheet 網址範例：

```text
https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/edit#gid=0
```

其中：

```text
1AbCdEfGhIjKlMnOpQrStUvWxYz
```

就是：

```javascript
sheetId: "1AbCdEfGhIjKlMnOpQrStUvWxYz"
```

---

## 4.2 找出分頁名稱

Google Sheet 底部的分頁標籤名稱，就是 `sheetName`。

例如：

```text
社會
歷史
地理
```

設定：

```javascript
sheetName: "社會"
```

名稱必須完全一致，包括：

- 空格
- 符號
- 中文
- 英文字母大小寫

---

## 4.3 找出分頁 gid

先點選指定分頁，再查看網址最後面：

```text
#gid=123456789
```

設定：

```javascript
gid: "123456789"
```

---

## 4.4 Google Sheet 權限

試算表必須設為：

```text
知道連結的任何人可以檢視
```

操作方式：

1. 開啟 Google Sheet
2. 點右上角「共用」
3. 一般存取權改成「知道連結的任何人」
4. 權限選擇「檢視者」

若試算表不是公開可檢視，網頁會讀不到題庫。

---

## 4.5 題庫第一列欄位

每一個題庫分頁的第一列建議使用：

```text
題號
範圍
題目類型
題目
選項1
選項2
選項3
選項4
正確答案
解析
```

範例：

| 題號 | 範圍 | 題目類型 | 題目 | 選項1 | 選項2 | 選項3 | 選項4 | 正確答案 | 解析 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 第一章 | 選擇題 | 下列何者正確？ | A內容 | B內容 | C內容 | D內容 | 2 | 第二個選項正確 |

正確答案可使用：

```text
1
2
3
4
```

或：

```text
A
B
C
D
```

---

# 5. Google Sheets API Key 設定

只有使用：

```javascript
autoDiscoverSubjects: true
```

時才需要 API Key。

## 建立方式

1. 開啟 Google Cloud Console
2. 建立或選擇專案
3. 進入「API 和服務」
4. 啟用 `Google Sheets API`
5. 進入「憑證」
6. 建立 `API 金鑰`
7. 將 API Key 貼到：

```javascript
apiKey: "你的 API Key"
```

## 建議限制

API Key 建議設定：

- 應用程式限制：HTTP 參照網址
- API 限制：Google Sheets API

GitHub Pages 範例：

```text
https://你的帳號.github.io/*
```

本機測試可另外加入：

```text
http://localhost/*
http://127.0.0.1/*
```

注意：前端 API Key 不是密碼，真正的保護方式是設定 API 限制與網站來源限制。

---

# 6. `firebase-config.js` 設定

請建立：

```text
firebase-config.js
```

內容：

```javascript
window.FIREBASE_CONFIG = {
  apiKey: "你的 Firebase apiKey",
  authDomain: "你的專案.firebaseapp.com",
  projectId: "你的 Firebase projectId",
  storageBucket: "你的專案.firebasestorage.app",
  messagingSenderId: "你的 messagingSenderId",
  appId: "你的 appId",
  measurementId: "你的 measurementId"
};
```

---

## 6.1 Firebase 設定從哪裡取得

1. 進入 Firebase Console
2. 選擇你的專案
3. 點「專案設定」
4. 找到「你的應用程式」
5. 選擇 Web App
6. 找到 Firebase SDK 設定
7. 複製設定內容到 `firebase-config.js`

---

# 7. Firebase Authentication 設定

系統支援：

- 帳號密碼登入
- Google 登入

## 7.1 啟用帳號密碼登入

Firebase Console：

```text
Authentication
→ Sign-in method
→ Email/Password
→ 啟用
```

系統畫面輸入的是自訂帳號，例如：

```text
cloud001
```

程式會自動轉成：

```text
cloud001@ipas-exam.local
```

這個 Email 不需要真的存在。

可在 `config.js` 調整：

```javascript
auth: {
  emailDomain: "ipas-exam.local"
}
```

---

## 7.2 啟用 Google 登入

Firebase Console：

```text
Authentication
→ Sign-in method
→ Google
→ 啟用
```

---

## 7.3 設定 Authorized domains

若部署在 GitHub Pages，請在：

```text
Authentication
→ Settings
→ Authorized domains
```

加入：

```text
你的帳號.github.io
```

若使用自訂網域，也要加入自訂網域。

---

# 8. Firestore Database 設定

Firebase Console：

```text
Firestore Database
→ 建立資料庫
```

建議使用 Production mode，再自行設定安全規則。

系統會使用的主要集合：

```text
users
leaderboard
```

使用者資料大致結構：

```text
users/{uid}/profile/main
users/{uid}/practiceHistory/main
users/{uid}/wrongStats/{questionId}
users/{uid}/stats/{subjectId}
users/{uid}/examStats/main
users/{uid}/examStatsByName/{nameId}
```

排行榜：

```text
leaderboard/{leaderboardId}
```

---

# 9. Firestore Rules 範例

以下規則可作為基本版本：

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function signedIn() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return signedIn() && request.auth.uid == userId;
    }

    match /users/{userId}/{document=**} {
      allow read, write: if isOwner(userId);
    }

    match /leaderboard/{docId} {
      allow read: if true;

      allow create: if signedIn()
        && request.resource.data.uid == request.auth.uid;

      allow update: if signedIn()
        && resource.data.uid == request.auth.uid
        && request.resource.data.uid == request.auth.uid;

      allow delete: if false;
    }
  }
}
```

更新規則後請點：

```text
發布
```

注意：請先在測試環境確認規則符合需求，再正式公開。

---

# 10. GitHub Pages 部署

## 10.1 專案檔案

GitHub 儲存庫根目錄放：

```text
index.html
config.js
firebase-config.js
README.md
```

## 10.2 啟用 Pages

GitHub 儲存庫：

```text
Settings
→ Pages
→ Deploy from a branch
→ main
→ /(root)
→ Save
```

部署網址通常是：

```text
https://你的帳號.github.io/儲存庫名稱/
```

---

# 11. 會員功能收合區

目前版本的「會員錯題紀錄」已調整為：

- 登入狀態直接顯示
- 登入欄位預設隱藏
- 多個會員按鈕預設隱藏
- 點「會員登入與錯題功能」右側 `＋` 展開
- 展開後顯示 `－`
- 再次點擊即可收合

這個功能不影響：

- Firebase 登入
- 錯題複習
- 排行榜
- 清除練習紀錄
- 清除錯題統計

---

# 12. LINE 貼圖與 FB 按鈕

目前頂部有兩個連結：

```text
追蹤 FB｜雲橫介工程師
LINE 貼圖一覽
```

LINE 貼圖連結：

```text
https://line.me/S/shop/sticker/author/3564401/top?lang=zh-Hant&utm_source=gnsh_staut
```

若要修改，請在 `index.html` 找到：

```html
<div class="topFollowBar">
```

並修改其中的 `<a href="...">`。

---

# 13. 常見錯誤排查

## 顯示「尚未設定 googleSheet.apiKey」

原因：

```javascript
autoDiscoverSubjects: true
```

但沒有填 API Key。

解法二選一：

```javascript
apiKey: "填入 API Key"
```

或：

```javascript
autoDiscoverSubjects: false
```

並手動設定 `subjects`。

---

## 顯示「Google Sheet 載入失敗」

檢查：

- Sheet ID 是否正確
- 分頁名稱是否完全一致
- gid 是否正確
- 試算表是否開放「知道連結的任何人可以檢視」
- 第一列欄位名稱是否正確

---

## Firebase 登入失敗

檢查：

- `firebase-config.js` 是否正確
- Authentication 是否啟用 Email/Password
- Google 登入是否啟用
- GitHub Pages 網域是否加入 Authorized domains

---

## Firestore 權限不足

檢查：

- Firestore Rules 是否發布
- 使用者是否已登入
- `users/{uid}` 是否只允許本人讀寫
- leaderboard 是否允許本人新增與更新

---

## 排行榜要求索引

如果瀏覽器主控台出現 Firestore index 錯誤，可點錯誤訊息附帶的連結建立索引。

常見欄位：

```text
subjectKey
totalPoints
```

排序方向通常為：

```text
subjectKey：Ascending
totalPoints：Descending
```

---

# 14. 最簡單的設定流程

1. 將 HTML 改名為 `index.html`
2. 建立 `config.js`
3. 填入 Google Sheet ID
4. 決定是否使用 Google Sheets API Key
5. 建立 `firebase-config.js`
6. 啟用 Firebase Authentication
7. 建立 Firestore Database
8. 發布 Firestore Rules
9. 將 GitHub Pages 網域加入 Authorized domains
10. 上傳到 GitHub Pages 測試

---

# 15. 建議正式上線前測試

請確認以下功能：

- 可讀取所有科目
- 可切換 Google Sheet 分頁
- 題目與答案正常
- 訪客可練習
- 帳號密碼可登入
- Google 登入正常
- 已練題目不會重複出現
- 錯題可正常累積
- 各科目錯題分開
- 各科目排行榜分開
- 清除紀錄只影響目前科目
- 手機版畫面正常
- 夜間模式正常
- FB 與 LINE 貼圖連結正常
