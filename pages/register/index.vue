<template>
    <div class="register-box clear-fix">
      <Row>
        <Col :xs="0" :sm="4" :md="6" :lg="8">
          <div class="register-left-box"></div>
        </Col>
        <Col :xs="24" :sm="16" :md="12" :lg="8">
          <div class="register-info">
            <div class="register-item">
              <div class="register-title-box">
                <span class="register-title">注册</span>
              </div>
              <Form   :label-width="95">
                <FormItem required label="用户名" >
                  <Input  type="text" v-model="user.userName" number></Input>
                </FormItem>
                <FormItem required  label="密码" >
                  <Input type="password" v-model="user.password"></Input>
                </FormItem>
                <FormItem required  label="邮箱" >
                  <Input v-model="user.email" ></Input>
                </FormItem>
                <FormItem required  label="邮箱验证码" >
                  <Row>
                    <Col span="12">
                      <Input type="text" v-model="registerInfo.email_code" number></Input>
                    </Col>
                    <Col span="12">
                      <div class="code-button float-fight">
                        <Button @click="getVerifyCode" type="primary">获取邮箱验证码</Button>
                      </div>
                    </Col>
                  </Row>
                </FormItem>
                <FormItem required  label="验证码" >
                  <Row>
                    <Col span="12">
                      <div class="verifyCode-text">
                        <Input type="text" v-model="registerInfo.captcha_code" number></Input>
                      </div>
                    </Col>
                    <Col span="12">
                      <div class="verifyCode-img ">
                        <img class="float-fight" :src="captchaPath" @click="updateVerifyCode" >
                      </div>
                    </Col>
                  </Row>
                </FormItem>

                <FormItem >
                  <Button type="primary" @click="handleSubmit()">注册</Button>
                </FormItem>
              </Form>
            </div>

          </div>
        </Col>
        <Col :xs="0" :sm="4" :md="6" :lg="8">
          <div class="register-right-box"></div>
        </Col>
      </Row>
    </div>
</template>

<script>

    export default {
        name: "index",
      data() {
        return {
          user:{
            userName:'',
            password:'',
            email:''
          },
          registerInfo:{
            captcha_code:'',
            captcha_key:'',
            email_code:''
          },
          captchaPath:'',
        }
      },
      methods: {
        getVerifyCode(){

        },

        handleSubmit () {

        },

        updateVerifyCode(){
          this.captchaPath = '/biz/user/captcha?captcha_key='+this.registerInfo.captcha_key+"&random="+Date.parse(new Date());

        }
      },
      mounted() {
        this.registerInfo.captcha_key = Date.parse(new Date());
        this.updateVerifyCode();
      }
    }
</script>

<style >
  .register-title-box{
    margin-bottom: 40px;
  }
  .register-title{
    margin-left: 40px;
    font-size: 24px;

    font-weight: 600;
  }

  .register-right-box{
    width: 100%;
    height: 1px;
  }
  .register-left-box{
    width: 100%;
    height: 1px;
  }
  .code-button{
    margin-left: 25%;
  }
  .verifyCode-text input{
      margin-top: 15px;

  }
  .verifyCode-img img{
    cursor: pointer;
    width: 80%;
    height: 46px;
  }
  .email-text{
    margin-left: 20%;
  }
  .register-info{
    margin-bottom: 30%;
    width: 100%;
  }
  .register-item{
    margin-top: 10%;

    width: 100%;
  }

</style>
