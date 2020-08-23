<template>
  <div id="blog-box">
    <div class="blog-header clear-fix default-border-radius">
      <div class="logo-box float-left">
        <div class="logo">
          san-blog
        </div>

      </div>
      <div class="login-tips-text-box float-fight">
        登录|注册
      </div>
      <div class="navigation-box float-fight">
        <span>首页</span>
        <span>关于</span>
        <span>友链</span>
      </div>

      <div class="user-info-box float-fight" style="display: none">
        用户信息
      </div>
    </div>
    <Nuxt />
    <div class="blog-footer">
      <div class="copy-fight-box">
        <p>我的客栈已营业：0年180天8时12分44秒 (*๓´╰╯`๓) 赣ICP备20004408号-1</p>
      </div>


      <div>
        <span>关于我们</span>
        |
        <span>联系我们</span>
        |
        <span>友情链接</span>

      </div>
    </div>
  </div>
</template>

<style>

  .logo-box{
    margin-left: 10px;
  }
  .logo-box .logo{
    color: #737f90;
    font-size: 28px;
    font-weight: 600;
  }

  a{
    text-decoration: none;
  }
  .copy-fight-box{
    margin-bottom: 10px;
  }
  .blog-footer{
    padding-bottom: 30px;
    text-align: center;
  }
  *{
    padding: 0;
    margin: 0;
  }
  .blog-header{
    line-height: 30px;
    background: #fff;
    padding: 10px;
    margin-top: 20px;
  }
  body{
    background: #f2f2fa;
  }
  #blog-box{
    width: 1140px;
    margin: 0 auto;
  }
  .float-left{
    float: left;
  }
  .float-fight{
    float: right;
  }

  .clear-fix{
    overflow: hidden;
    zoom: 1;
  }
  .login-tips-text-box{
    margin-right: 10px;
    font-size: 16px;
  }
  .navigation-box {
    margin-right: 50px;

  }
  .navigation-box span{
    margin-right: 40px;
    color: #737f90;
    cursor: pointer;
    font-size: 18px;
  }
  .navigation-box span:hover{
    color: 74818e;
  }
  .default-border-radius{
    border-radius: 4px;
  }
</style>
