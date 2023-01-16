'use strict';

import { Cookie } from './_cookie';
/**
 * ベースのフォントサイズを変更
 * クッキーに保存する
 *
 * @param string VAR css変数の名前
 */
export class Zoom {
  constructor(VAR) {
    this.DOM = {};
    this.options = [16, 32];
    this.currIndex = 0;
    this.VAR = VAR;
    this.COOKIE_NAME = 'fontIndex';
    this.cookie = new Cookie();

    this._setUserDefault();
  }

  /**
   * ページロード時にユーザーのクッキーによってフォントサイズを設定する
   */
  _setUserDefault() {
    const val = this.cookie.get(this.COOKIE_NAME);
    const fontIndex = val ?? 0;

    this.currIndex = fontIndex;

    this._set();
  }

  zoomIn() {
    this.currIndex++;

    if (this.options[this.currIndex]) {
      this._set();
    } else {
      this.currIndex--;
      alert('これ以上フォントサイズを大きく出来ません。');
    }
  }

  zoomOut() {
    this.currIndex--;

    if (this.options[this.currIndex]) {
      this._set();
    } else {
      this.currIndex++;
      alert('これ以上フォントサイズを小さく出来ません。');
    }
  }

  default() {
    this.currIndex = 0;
    this._set();
  }

  _set() {
    document.documentElement.style.setProperty(
      this.VAR,
      `${this.options[this.currIndex]}px`
    );
    this.cookie.set(this.COOKIE_NAME, this.currIndex);
  }
}
