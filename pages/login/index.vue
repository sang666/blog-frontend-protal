<template>
    <div>
      <Row>
        <Col :xs="0" :sm="4" :md="6" :lg="5">
          <div class="login-left"></div>
        </Col>
        <Col :xs="24" :sm="16" :md="12" :lg="14">
          <div class="login-box clear-fix">
            <div class="login-item">
              <Form    >
                <FormItem >
                  <Input type="text" v-model="user.userName" placeholder="用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem >
                  <Input type="password" v-model="originalPasswrod" placeholder="密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem >

                  <Input type="text" v-model="loginInfo.verifyCode" placeholder="验证码">
                    <Icon type="ios-send-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem class="login-button-box">
                  <img :src="captchaPath" @click="updateVerifyCode" class="captcha-code float-left">
                  <Button  class="login-button float-left" size="large"  @click="doLogin">登录</Button>
                  <div class="forget-box float-fight"><span><a href="/forget">忘记密码?</a></span></div>
                </FormItem>

              </Form>
            </div>

          </div>

        </Col>
        <Col :xs="0" :sm="4" :md="6" :lg="5">
          <div class="login-right"></div>
        </Col>
      </Row>

    </div>
</template>

<script>
  import {hex_md5} from "../../utils/md5";
  import * as api from '../../api/api'
  export default {
        name: "index",
      data() {
        return {
          isCommiting:false,
          user: {
            userName:'',
            password:''
          },
          originalPasswrod:'',
          loginInfo:{
            verifyCode:'',
            from:'p_',
            captcha_key:''
          },
          captchaPath:''

        }
      },
      methods: {
        doLogin(){
          //检查数据
          if (this.user.userName === '') {
            this.$Message.warning('用户名不能为空');
            return
          }
          if (this.originalPasswrod === '') {
            this.$Message.warning('密码不能为空');
            return
          }
          if (this.loginInfo.verifyCode === '') {
            this.$Message.warning('验证码不能为空');
            return
          }
          if (this.isCommiting) {
            return;
          }
          this.isCommiting = true;
          this.user.password=hex_md5(this.originalPasswrod)
          api.doLogin(this.loginInfo.verifyCode,this.loginInfo.captcha_key,this.user).then(resp=>{
            this.isCommiting=false
            //如果成功则跳转---判断角色，如果是普通用户，跳转到门户页，如果是管理员，跳转到管理中心

            if (resp.code === api.success_code) {
              this.$Message.success(resp.message)
              //todo:需要判断角色
              //this.$router.push({path:'/index'});
              //从地址中获取到redirect
              let redirect = this.$route.query.redirect
              if (redirect) {
                location.href = redirect
              }else {
                location.href = "/"
              }
            }else{
              this.updateVerifyCode();
              this.$Message.error(resp.message)
            }
          })
          //防止重复提交
          //提交数据
          //处理结果
        },
        handleSubmit(name) {
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.$Message.success('Success!');
            } else {
              this.$Message.error('Fail!');
            }
          })
        },

        updateVerifyCode(){
          this.captchaPath = '/biz/user/captcha?captcha_key='+this.loginInfo.captcha_key+"&random="+Date.parse(new Date());

        }
      },
      mounted() {
        //todo:检查登录是否有效
        //如果已经登录了，跳转到管理员界面

        this.loginInfo.captcha_key = Date.parse(new Date());
        this.updateVerifyCode();
      }
    }
</script>

<style >
  .forget-box{
    margin-top: 10px;
  }
  .login-button-box{
    text-align: center;
  }

  .login-button{
    margin-left: 25%;
    margin-top: 7px;
  }
  .captcha-code{

    cursor: pointer;
    border: solid 1px #e6e6e6;
    border-radius: 4px;
    width: 40%;
    height: 9%;

  }
  .login-right {
    width: 100%;
    height: 1px;
  }
  .login-left{
    width: 100%;
    height: 1px;
  }
  .login-item{
    margin-left: 25%;
    width: 50%;
  }
  .login-box{

    text-align: center;
    margin-top: 20%;
    margin-bottom: 10%;
  }

</style>
