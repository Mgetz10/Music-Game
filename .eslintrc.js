module.exports = {
  plugins: ['prettier'],
  extends: 'airbnb-base',
  env: {
    browser: true
  },
  rules: {
    'prettier/prettier': 'error'
  }
};
