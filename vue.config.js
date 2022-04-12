module.exports = {
    // 选项...
    lintOnSave:false,
    publicPath: process.env.NODE_ENV === 'production'
    ? '/movie_app/' // test20200915 為 repo 名稱
    : '/'
  }