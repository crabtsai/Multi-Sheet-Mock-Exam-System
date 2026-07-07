// 多科目萬用設定檔
// 每個 Google Sheet 分頁都要使用相同欄位：
// 題號、範圍、題目類型、題目、選項1、選項2、選項3、選項4、正確答案、解析
window.APP_CONFIG = {
  app: {
    title: "多科目模擬考練習"
  },

  auth: {
    emailDomain: "ipas-exam.local"
  },

  googleSheet: {
    // 多數科目都放在同一份試算表時，只需在這裡設定一次 sheetId。
    sheetId: "1EEBoG6cWlhsnrkstmQakv2ZNJ7TymplYewcX30E3Khw",

    // 網頁第一次開啟時預設選擇的科目 id。
    defaultSubjectId: "ipas-basic",

    subjects: [
      {
        id: "ipas-basic",
        name: "AI 應用規劃師初級",
        gid: "0",
        description: "目前原始題庫分頁。",

        // 只有原本已經上線、有舊會員紀錄的科目才設 true。
        // 整份設定最多只能有一個 legacyKeyMode:true。
        legacyKeyMode: true
      },

      // 新增科目範例一：使用同一份試算表的另一個 gid。
      // 將 enabled 改成 true，並把 gid 改成該分頁網址 #gid= 後面的數字。
      {
        id: "social",
        name: "社會",
        gid: "請填入社會分頁的gid",
        description: "社會科題庫",
        enabled: false
      },

      // 新增科目範例二：也可直接用 Google Sheet 分頁名稱。
      // 分頁改名時，這裡也要跟著修改。
      {
        id: "history",
        name: "歷史",
        sheetName: "歷史",
        description: "歷史科題庫",
        enabled: false
      },

      // 新增科目範例三：題庫也可以放在另一份 Google Sheet。
      // {
      //   id: "geography",
      //   name: "地理",
      //   sheetId: "另一份試算表的ID",
      //   gid: "0"
      // }
    ]
  },

  exam: {
    totalScore: 100,
    passScore: 70,
    defaultQuestionCount: 20,
    questionCountOptions: [10,20,30,40,50,60,70,80,90,100]
  }
};
