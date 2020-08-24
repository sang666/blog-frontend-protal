<template>
  <div class="index-page-box">
    <!--<Row>
      <Col  :xs="0" :sm="4" :md="6" :lg="{span:4 }">
        <div class="link-left"></div>
      </Col>
      <Col :xs="24" :sm="16" :md="12" :lg="14">
        <div class="link-title">

        </div>

        <div class="link-list">
          <div class="link-item" v-for="(item,index) in linkList" :key="index">
            <div>{{item.name}}</div>
          </div>
        </div>
      </Col>

      <Col  :xs="0" :sm="4" :md="6" :lg="{span:5,offset: 1 }">
        <div class="link-right"></div>
      </Col>

    </Row>-->
    <Row>
      <!--left-->
      <Col :xs="0" :sm="4" :md="6" :lg="4">
        <div class="link-left">

        </div>
      </Col>

      <!--center-->
      <Col :xs="24" :sm="16" :md="12" :lg="16">
        <div class="link-title">

        </div>

        <div class="link-list-box clear-fix">
          <div class="link-item float-left" v-for="(item,index) in linkList" :key="index">
            <a :href="item.url" target="_blank">
              <img :src="item.logo">
            </a>

          </div>
        </div>
      </Col>
      <!--right-->
      <Col :xs="0" :sm="4" :md="6" :lg="4">
        <div class="link-right">

        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import * as api from '../../api/api'
import Logo from '~/components/Logo.vue'
export default {


  components: {
    Logo
  },
  asyncData(){
    return  api.getLinkList().then(resp=>{
      console.log(resp.data);
      return{
        linkList:resp.data.item
      }
    })
  }
}
</script>

<style>
  .link-item{
    margin: 20px;
    cursor: pointer;
    width: 25%;
  }
  .link-item img{
    border-radius: 4px;
    width: 100%;
    height: 100%;
  }
  .link-left{
    width: 100%;
    height: 1px;
    background: #F4F6F7;
  }
  .link-right{
    width: 100%;
    height: 1px;
    background: #F4F6F7;
  }
</style>
