'use strict';
import '@sass/style';

window.addEventListener('DOMContentLoaded', () => {
  async function asyncFunc() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('await');
        return resolve('await');
      }, 2000);
    });
  }

  const init = async () => {
    await asyncFunc();
    console.log('aaa');
  };

  init();
});