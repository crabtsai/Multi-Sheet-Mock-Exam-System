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
    sheetId: "1sd7HtAS6h6ZoYaUFrIQBxc7VpLNItAAesNOkMnWyrZc",

    // 網頁第一次開啟時預設選擇的科目 id。
    defaultSubjectId: "ipas-basic",

    subjects: [
      // 新增科目範例一：使用同一份試算表的另一個 gid。
      // 將 enabled 改成 true，並把 gid 改成該分頁網址 #gid= 後面的數字。
      {
        id: "nature",
        name: "自然",
        gid: "自然",
        description: "自然科題庫",
        enabled: True
      },

      // 新增科目範例二：也可直接用 Google Sheet 分頁名稱。
      // 分頁改名時，這裡也要跟著修改。
      {
        id: "society",
        name: "社會",
        sheetName: "社會",
        description: "社會科題庫",
        enabled: True
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
