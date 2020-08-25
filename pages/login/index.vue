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
                  <Input type="password" v-model="user.password" placeholder="密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem >

                  <Input type="text" v-model="loginInfo.verifyCode" placeholder="验证码">
                    <Icon type="ios-send-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem>
                  <img :src="captchaPath" @click="updateVerifyCode" class="captcha-code float-left">
                  <Button  class="login-button float-fight" size="large"  @click="handleSubmit">登录</Button>
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
    export default {
        name: "index",
      data() {
        return {
          user: {
            userName:'',
            password:''
          },
          loginInfo:{
            verifyCode:'',
            from:'p_',
            captcha_key:''
          },
          captchaPath:''

        }
      },
      methods: {
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
          this.captchaPath = 'http://localhost:8004/biz/user/captcha?captcha_key='+this.loginInfo.captcha_key+"&random="+Date.parse(new Date());

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
  .login-button{
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
