# **webpack WordPress用の開発環境**
## **docker必須**
### node v16.15.1
- webpackの主な設定→webpack.common.js
- wp, phpについての設定->wp-env.json(https://ja.wordpress.org/team/handbook/block-editor/reference-guides/packages/packages-env/)
<br>

# **説明**
## **webpack周りについて**
- src内で作業、dist内に吐き出す
- 基本的にはwpと同じディレクトリ構造
- dataフォルダ内にWorpPressのデータを格納
- WordPressのファイルはマシンのホームディレクトリの .wp-env という隠しフォルダ内にある
<br>

## **dataフォルダ内について**
- plugins内にプラグインを格納(勝手に入る)
- sqlにデータベースを格納(importとexportが必要)
- ↓ データベースのデータをexport <br>
```$ npm run wp-env run cli wp db export sql/wpenv.sql ```
- ↓データベースのデータをimport <br>
```$ npm run wp-env run cli wp db import sql/wpenv.sql ```
<br>

# **使い方**
- wp-env.jsonを変更し、開発環境を本番環境をできるだけ揃える
- webpack.common.jsのある階層まで移動し、```$ npm i ``` 
- ```$ npm run wp-env start```でwpのインストール
- ```$ npm run wp-env stop```停止
- .wp-env.jsonファイルを更新した場合は、停止した後に ```$ npm run wp-env start --update``` で再起動
- ```$ npm run start``` でローカルサーバーが立ち上がる

# 初期設定のwpのログイン情報
|  KEY  |  VAL  |
| ---- | ---- |
|  User  |  admin  |
|  Password  |  password  |
|  Database  |  wordpress  |
