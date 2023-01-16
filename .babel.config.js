module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      ['@babel/preset-env'],
      {
        targets: ['last 1 version', '> 1%', 'not dead'],
        useBuildIns: 'usage',
        corejs: { version: '3', proposals: true },
      },
    ],
  };
};
