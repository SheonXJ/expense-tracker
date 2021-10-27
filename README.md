# Expense Tracker
此專案提供使用者紀錄支出(包含:名稱、日期、類別、金額...)

## 功能列表
* 可以`註冊帳號`及使用`Facebook第三方登入方式`及`登出`
* 可以`新增支出`(包含名稱、日期、類別、金額等資料)
* 可以`修改`已建立之支出資料
* 可以`刪除`已建立之支出資料
* 可以選擇類別`搜尋`此類別資料

## 安裝流程
* 利用終端機(Terminal)，Clone專案至目標位置

  ```
  git clone https://github.com/TimZXJ/expense-tracker.git
  ```

* 進入專案資料夾

  ```
  cd expense-tracker
  ```

* 安裝 npm packages

  ```
  npm install
  ```

* 載入種子資料

  ```
  npm run seed
  ```

* 開啟伺服器

  ```
  npm run dev
  ```
  * 當終端機(Terminal)出現`App is running on http://localhost:3000`表示伺服器已成功開啟。

* 在瀏覽器中入輸入網址:http://localhost:3000

## 種子資料
```
name: user1
email: user1@example.com
password: 12345678
```

```
name: user2
email: user2@example.com
password: 12345678
```