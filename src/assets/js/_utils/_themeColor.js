'use strict';

import { Cookie } from './_cookie';
/**
 * デフォルトの背景色、文字色を変更するクラス
 *
 * @param string color colorのcss変数名
 * @param string bgColor backgroundのcss変数名
 */
export class ThemeColor {
  constructor(color, bgColor) {
    this.DOM = {};
    this.COLOR = color;
    this.BG_COLOR = bgColor;
    this.DOM.btns = document.querySelectorAll('.js-theme');
    this.DOM.body = document.querySelector('body');
    this.COOKIE_NAME = 'themeColor';
    this.cookie = new Cookie();

    this.colors = {
      white: {
        color: '#333',
        bgColor: '#fff',
      },
      black: {
        color: '#fff',
        bgColor: '#333',
      },
      yellow: {
        color: '#333',
        bgColor: '#f2c922',
      },
    };

    this._setUserDefault();
    this._addEvent();
  }

  /**
   * ページロード時にユーザーのクッキーによってテーマカラーを設定する
   */
  _setUserDefault() {
    const val = this.cookie.get(this.COOKIE_NAME);
    const theme = val ?? 'white';

    this._set(theme);
  }

  _addEvent() {
    this.DOM.btns.forEach(($btn) =>
      $btn.addEventListener('click', (e) => {
        this._set(e.target.dataset.theme);
      })
    );
  }

  _set(theme) {
    this._setStyles(theme);

    this._setBodyClass(theme);

    this._setCookie(this.COOKIE_NAME, theme);
  }

  _setStyles(theme) {
    const _that = this;
    const obj = {
      [`${_that.COLOR}`]: `${this.colors[theme].color}`,
      [`${_that.BG_COLOR}`]: `${this.colors[theme].bgColor}`,
    };

    for (const key in obj) {
      document.documentElement.style.setProperty(key, obj[key]);
    }
  }

  _setBodyClass(theme) {
    const keyword = 'theme-';
    const newBodyClass = `${keyword}${theme}`;

    const bodyClasses = this.DOM.body.classList;

    const removeTargets = [];
    bodyClasses.forEach((val) => {
      if (val.startsWith(keyword)) {
        removeTargets.push(val);
      }
    });

    if (removeTargets.length > 0) {
      removeTargets.map((val) => bodyClasses.remove(val));
    }

    bodyClasses.add(newBodyClass);

    if (newBodyClass !== 'theme-white') {
      bodyClasses.add('theme-colored');
    }
  }

  _setCookie(name, value) {
    this.cookie.set(name, value);
  }
}
