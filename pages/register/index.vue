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
                  <Input  type="text" v-model="user.userName" @on-blur="checkUsernames" placeholder="请输入用户名"></Input>
                  <span v-if="isUserName==='1'" class="error-icon"><Icon  type="md-close" />该用户名已注册</span>
                  <span v-if="isUserName==='0'" class="success-icon"><Icon   type="md-checkmark" />该用户名可以使用</span>
                </FormItem>
                <FormItem required  label="密码" >
                  <Input type="password" v-model="originalPasswrod" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem required  label="邮箱" >
                  <Input v-model="user.email" placeholder="请输入邮箱" ></Input>
                </FormItem>
                <FormItem required  label="邮箱验证码" >
                  <Row>
                    <Col span="12">
                      <Input type="text" v-model="registerInfo.email_code" number placeholder="输入邮箱验证码"></Input>
                    </Col>
                    <Col span="12">
                      <div class="code-button float-fight">
                        <!--<Button @click="getVerifyCode" type="primary">获取邮箱验证码</Button>-->
                        <Button v-if="!isCountDowning" class="verify-code-button-box" type="primary" @click="getVerifyCode">获取验证码</Button>
                        <Button v-else class="verify-code-button-box" type="primary" @click="getVerifyCode" disabled>{{countDownText}}</Button>
                      </div>
                    </Col>
                  </Row>
                </FormItem>
                <FormItem required  label="验证码" >
                  <Row>
                    <Col span="12">
                      <div class="verifyCode-text">
                        <Input type="text" v-model="registerInfo.captcha_code" number placeholder="请输入人类验证码"></Input>
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
  import * as api from "../../api/api";
  import {hex_md5} from "../../utils/md5";

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
          countDownText:'重新发送',
          isCountDowning: false,
          isUserName:'',
          originalPasswrod:'',
        }
      },
      methods: {
        checkUsernames(){

          if (this.user.userName === '') {
            this.isUserName=''
            return
          }
          api.checkUserName(this.user.userName).then(resp=>{
            if (resp.code === api.success_code) {
              this.isUserName='0'
            }else {
              this.isUserName='1'
            }
          })

        },
        startCountDown(){
          let time = 60;
          this.isCountDowning = true;
          let _this = this;
          let interval = setInterval(function () {
            //执行倒计时内容
            time--;
            if (time <= 0) {
              this.isCountDowning = false
              clearInterval(interval)
            }
            _this.countDownText = '重新发送('+time+')';
          },1000);
        },
        getVerifyCode(){

          if (this.user.email === '') {
            this.$Message.error('请输入邮箱地址')
            return;
          }
          let reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
          if (!reg.test(this.user.email)) {
            this.$Message.error('邮箱地址不正确')
            return
          }
          api.getVerifyCode(this.user.email,'register').then(resp=>{
            if (resp.code === api.success_code) {
              this.startCountDown();
              this.$Message.success(resp.message)

            }else {
              this.$Message.error(resp.message)
            }
          })

        },

        handleSubmit () {
          //检查内容
          if (this.user.userName === '') {
            this.$Message.error('用户名不能为空');
            return
          }
          if (this.originalPasswrod === '') {
            this.$Message.error('密码不能为空');
            return
          }
          if (this.registerInfo.captcha_code === '') {
            this.$Message.error('验证码不能为空');
            return
          }
          if (this.user.email === '') {
            this.$Message.error('邮箱不能为空');
            return
          }
          if (this.registerInfo.email_code === '') {
            this.$Message.error('邮箱验证码不能为空');
            return
          }
          //转换密码
          this.user.password = hex_md5(this.originalPasswrod)
          //提交数据
          api.register(this.registerInfo.captcha_code,this.registerInfo.captcha_key,this.registerInfo.email_code,this.user).then(resp=>{
            if (resp.code === 20002) {
              this.$Message.success(resp.message)
              location.href="/login"
            }else {
              this.$Message.error(resp.message)
              this.updateVerifyCode()
            }
          })
          //


        },

        updateVerifyCode() {
          this.captchaPath = '/biz/user/captcha?captcha_key=' + this.registerInfo.captcha_key + "&random=" + Date.parse(new Date());

        }

      },
      mounted() {
        this.registerInfo.captcha_key = Date.parse(new Date());
        this.updateVerifyCode();
      }
    }
</script>

<style >
  .success-icon{
    color: #19be6b;
  }
  .error-icon{
    color: #ed4014;
  }
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
