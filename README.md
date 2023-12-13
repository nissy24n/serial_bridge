# Serial port Bridge v0.0.1

## 概要
2つのシリアルポート同士でデータを送受信するプログラムです。  
X68000Zなどを2台それぞれUART-シリアルポート接続してシリアルポート同士で送受信できます。

## インストール
実行にはNode.jsが必要です。下記からダウンロードしてインストールしてください。  
https://nodejs.org/ja

本プロジェクトをGitクローンまたはzipダウンロードし、展開したフォルダ配下で下記コマンドを実行してください。実行に必要なモジュールがインストールされます。
~~~
> npm i
~~~
※Windowsで動作確認しています。macOSやLinuxでも問題ないと思いますが未確認です。  

## 使い方
下記のコマンドで使い方と使用可能なシリアルポートの一覧が表示されます。
~~~
> node serial
~~~
実行結果（例）
~~~
Serial port Bridge v0.0.1 by nobu24

usage:
  node serial <Serial port Name> <Serial port Name>

Serial port list:
  [COM4] Silicon Labs CP210x USB to UART Bridge (COM4)
  [COM3] USB Serial Port (COM3)
  [COM5] com0com - serial port emulator (COM5)
  [COM6] com0com - serial port emulator (COM6)
~~~

送受信するシリアルポート名を2つ指定して実行します。  
（例）シリアルポート[COM3]と[COM4]で送受信する場合
~~~
> node serial COM3 COM4
~~~
シリアルポート名1とシリアルポート名2が表示され、Ready!と表示されれば準備完了です。  
~~~
Serial port 1: COM3
Serial port 2: COM4
Ready!
~~~
シリアルポート1とシリアルポート2で送受信します。  

## 仕様
・シリアルポートの通信は、下記固定です。  
　38400bps/ビット長8ビット/パリティなし/ストップビット1ビット/フロー制御無し  
・下記のパッケージを利用しています。npmインストールを行うと下記パッケージおよび依存関係のモジュールがインストールされます。  
　[Node SerialPort](https://serialport.io/)  
・下記のシリアルアダプタで動作確認しています。  
　DSD TECH SH-U09C2（FT232RLチップ）  
　DSD TECH SH-U09B（CP2102Nチップ）  

## リリースノート

### 0.0.1

初版
