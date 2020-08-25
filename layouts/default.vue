<template>
  <div id="blog-box">

    <Row class="blog-header clear-fix default-border-radius">
      <Col :xs="0" :sm="4" :md="6" :lg="4">
        <div class="logo-box float-left">
          <div class="logo">
            san-blog
          </div>
        </div>
      </Col>
      <Col :xs="24" :sm="16" :md="12" :lg="16">
        <div class="navigation-box float-fight">
          <nuxt-link to="/">
            <span><i class="sob_blog sobhome"></i>首页</span>
          </nuxt-link>
          <nuxt-link to="about">
            <span><i class="sob_blog sobabout_line"></i>关于</span>
          </nuxt-link>
          <nuxt-link to="link">
            <span><i class="sob_blog soblink"></i>友链</span>
          </nuxt-link>
            <span @click="toSearch"><Icon type="ios-search" size="24" />搜索</span>

        </div>
      </Col>
      <Col :xs="0" :sm="4" :md="6" :lg="4">
        <div class="login-tips-text-box float-fight">
          <nuxt-link to="login">
            <span class="link-item"><i class="sob_blog sobfingermap "></i>登录</span>
          </nuxt-link>
          <nuxt-link to="register">
            <span class="link-item"><i class="sob_blog sobmembers-add"></i>注册</span>
          </nuxt-link>


        </div>
      </Col>
    </Row>
    <!--<div class="blog-header clear-fix default-border-radius">
      <div class="logo-box float-left">
        <div class="logo">
          san-blog
        </div>

      </div>
      <div class="login-tips-text-box float-fight">
        <span><i class="sob_blog sobfingermap "></i>登录</span>
        <span><i class="sob_blog sobmembers-add"></i>注册</span>
      </div>
      <div class="navigation-box float-fight">
        <nuxt-link to="/">
          <span><i class="sob_blog sobhome"></i>首页</span>
        </nuxt-link>
        <nuxt-link to="/about">
          <span><i class="sob_blog sobabout_line"></i>关于</span>
        </nuxt-link>
        <nuxt-link to="/link">
          <span><i class="sob_blog soblink"></i>友链</span>
        </nuxt-link>
      </div>

      <div class="user-info-box float-fight" style="display: none">
        用户信息
      </div>
    </div>-->
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
<script>
  export default {
    methods: {
      toSearch() {
        location.href="/search"
      }
    },
  }
</script>

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
    background: #F4F6F7;
  }
  #blog-box{
    width: 96%;
/*
    width: 1140px;
*/

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
  .login-tips-text-box .link-item:hover{
    color: dodgerblue;
    margin-right: 10px;
    font-size: 16px;
  }
  .login-tips-text-box .link-item{
    color: #737f90;
    margin-right: 10px;
    font-size: 16px;
  }
  .login-tips-text-box{
    margin-right: 10px;
    font-size: 16px;
  }
  .navigation-box {
    margin-right: 5%;

  }
  .navigation-box span{
    margin-right: 20px;
    color: #737f90;
    cursor: pointer;
    font-size: 18px;
  }
  .navigation-box span:hover, .login-tips-text-box span:hover{
    color: #74818e;
  }
  .default-border-radius{
    border-radius: 4px;
  }

  .navigation-box i{
    font-size: 20px;
    font-weight: 600;
  }
  .login-tips-text-box span{
    margin-right:  10px;
    cursor: pointer;
  }
</style>
