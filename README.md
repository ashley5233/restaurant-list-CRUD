# Restaurant List - 餐廳清單
+ 使用 Node.js + Express + Mongodb 打造的餐廳美食網站，在此專案能夠利用搜尋功能來尋找餐廳。
+ 並且能夠新增、修改、刪除餐廳的詳細資訊至資料庫。
+ 能夠依照餐廳名稱、類別、分數來排列順序

![restaurant-index-image](https://res.cloudinary.com/dnivakimu/image/upload/v1616076638/restaurant-index-image_iriskn.png)
![restaurant-list-image](https://res.cloudinary.com/dnivakimu/image/upload/v1616076637/restaurant-list-image_p7fsgm.png)
![restaurant-edit-image](https://res.cloudinary.com/dnivakimu/image/upload/v1616076634/restaurant-edit-image_fcca3i.png)

## 功能列表
+ 透過餐廳名稱搜尋
+ 顯示餐廳詳細資料包括類別、地址、電話、評分、圖片等資料
+ 點選-新增餐廳按鈕，能夠自己創建新餐廳資訊
+ 點選-修改按鈕，能夠修改既有餐廳資訊
+ 點選-刪除按鈕，能夠刪除餐廳資訊
+ 下拉選單能排列餐廳順序
+ 可變換列表模式


## 啟動方式
+ 將專案clone到本地端
```
https://github.com/ashley5233/restaurant-list-CRUD.git
```
+ 進入到專案資料夾
```
cd restaurant-list-CRUD
```
+ 安裝npm
```
$npm install
```
+ 啟動專案
```
$npm run dev
```
+ 建立種子資料
```
$npm run seed
```
+ 當終端機出現以下畫面，表示成功連接。
```
Express is running on http://localhost:3000
```

## 開發環境
+ Node.js -v10.15.0
+ Express -4.17.1
+ Express-Handlebars-5.2.1
+ mongoose: 5.11.18
