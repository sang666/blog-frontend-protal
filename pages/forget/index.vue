<template>
    <div>
      <Row>
        <Col :xs="0" :sm="4" :md="6" :lg="8">Col</Col>
        <Col :xs="24" :sm="16" :md="12" :lg="8">
          <div class="forget-box">



          <div class="forget-from-container" >
            <div class="forget-title-box">
              <span class="forget-title">找回密码</span>
            </div>
            <Form   :label-width="95">

              <!--<FormItem required  label="密码" >
                <Input type="password" v-model="originalPasswrod" placeholder="请输入新密码"></Input>
              </FormItem>-->
              <FormItem required  label="邮箱" >
                <Input v-model="user.email" placeholder="请输入邮箱" ></Input>
              </FormItem>
              <FormItem required  label="邮箱验证码" >
                <Row>
                  <Col span="12">
                    <Input type="text" v-model="forgetInfo.email_code" number placeholder="输入邮箱验证码"></Input>
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
                      <Input type="text" v-model="forgetInfo.captcha_code" number placeholder="请输入人类验证码"></Input>
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
                <Button type="primary" @click="handleSubmit()">找回密码</Button>
              </FormItem>
            </Form>
          </div>
            <div class="update-password" v-if="showType==='resetPassword'">
              <Form   :label-width="95">

                <FormItem required  label="新密码" >
                  <Input type="password" v-model="originalPasswrod" placeholder="请输入新密码" ></Input>
                </FormItem>

                <FormItem >
                  <Button type="primary" @click="updatePassword()">确认密码</Button>
                </FormItem>

              </Form>
            </div>

          </div>
        </Col>
        <Col :xs="0" :sm="4" :md="6" :lg="8">Col</Col>
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
            email:'',
            password:''
          },
          forgetInfo:{
            captcha_code:'',
            captcha_key:'',
            email_code:''
          },
          captchaPath:'',
          originalPasswrod:'',
          countDownText:'重新发送',
          isCountDowning: false,
          showType:'verifyCode'

        }
      },
      methods: {
        updatePassword(){
          if (this.originalPasswrod === '') {
            this.$Message.error('新密码不能为空')
            return;
          }
          if (this.user.email === '') {
            this.$Message.error('邮箱不能为空')
            return;
          }
          if (this.forgetInfo.email_code === '') {
            this.$Message.error('邮箱验证码不能为空')
            return;
          }
          //转换密码
          this.user.password = hex_md5(this.originalPasswrod)
          api.updatePassword(this.forgetInfo.email_code,this.user).then(resp=>{
            if (resp.code === api.success_code) {
              this.$Message.success(resp.message)
              location.href="/login"
            }else {
              this.$Message.error(resp.message)
              this.showType='verifyCode'
              this.user.email=''
              this.user.password=''
              this.forgetInfo.email_code=''
              this.forgetInfo.captcha_code=''
              this.updateVerifyCode()
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
        updateVerifyCode() {
          this.captchaPath = '/biz/user/captcha?captcha_key=' + this.forgetInfo.captcha_key + "&random=" + Date.parse(new Date());

        },

        handleSubmit(){
          if (this.user.email === '') {
            this.$Message.error('请输入邮箱地址')
            return;
          }
          if (this.forgetInfo.email_code === '') {
            this.$Message.error('请输入邮箱验证码')
            return;
          }
          if (this.forgetInfo.captcha_code === '') {
            this.$Message.error('请输入人类验证码')
            return;
          }
          api.updatePasswordByEmail(this.forgetInfo.captcha_code,this.forgetInfo.captcha_key,this.forgetInfo.email_code,this.user.email).then(resp=>{
            if (resp.code === api.success_code) {
              this.showType='resetPassword'
            }else {
              this.$Message.error(resp.message)
              this.updateVerifyCode()
            }
          })

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
          api.getVerifyCode(this.user.email,'forget').then(resp=>{
            if (resp.code === api.success_code) {
              this.startCountDown();
              this.$Message.success(resp.message)

            }else {
              this.$Message.error(resp.message)
            }
          })

        },

      },

      mounted() {
        this.forgetInfo.captcha_key = Date.parse(new Date());
        this.updateVerifyCode();
      }
    }
</script>

<style >
  .forget-title-box{
    margin-bottom: 40px;
  }
  .forget-title{
    margin-left: 40px;
    font-size: 24px;

    font-weight: 600;
  }
  .forget-from-container{
    margin-top: 10%;

    width: 100%;
  }

</style>
