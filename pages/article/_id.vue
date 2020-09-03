<template>
  <div class="index-page-box">
    <Row>

      <Col :xs="0"  :lg="6">Col</Col>
      <Col :xs="24"  :lg="18">
        <Col :xs="24" :sm="4" :md="6" :lg="14">

          <div class="article-content-box">

            <div class="article-title">
              <h1 v-text="articles.title"></h1>
            </div>

            <div class="article-info">

              <img :src="articles.avatar" >
              <span class="article-username">{{articles.userName}}</span>
              <span>发表于</span>
              <Icon size="24" type="ios-calendar" />

              <span>{{articles.createTime}}</span>
              <Icon size="24" type="md-eye" />

              <span>{{articles.viewCount}}</span>
            </div>

            <div class="article-label">
              <Tag style="margin-right: 10px" color="volcano" v-for="(item,index) in articles.labelList" :key="index">
                {{item}}
              </Tag>
            </div>

            <div class="article-content" v-html="articles.content">

            </div>

          </div>
        </Col>
        <Col :xs="0" :sm="16" :md="12" :lg="{span:9,offset: 1}" >

          <div class="article-right-box">
            目录
          </div>
        </Col>
      </Col>
    </Row>
    <div class="dialog-detail-part">
      <Modal
        v-model="modal1"
        >
        <img :src="targetImagePath" >
      </Modal>
    </div>
  </div>
</template>

<script>
  import hljs from 'highlight.js'
  import 'highlight.js/styles/github.css'
import Logo from '~/components/Logo.vue'
import * as api from '../../api/api'
export default {
  components: {
    Logo
  },
  data() {
    return {
      modal1: false,
      targetImagePath:''
    }
  },
  asyncData({params}){

    return api.getArticleDetail(params.id).then(resp=>{
      if (resp.code === api.success_code) {

        return{
          articles:resp.data.article
        }
      }
    })
  },
  methods: {
    showImage(event) {
      this.modal1 = true
      this.targetImagePath = event.target.src
    }
  },
  mounted() {
    hljs.initHighlighting()
    //遍历图片
    /*let contentBox = document.getElementById('article-content');
    let images = contentBox.querySelectorAll('img')
    images.forEach(item=>{
      item.addEventListener('click',this.showImage)
    })*/
  }
}
</script>

<style>
  .article-content h2{
    padding-top: 10px;
    padding-bottom: 10px;

  }
  .article-content img{
    padding: 10px 0;
  }
  .article-content pre code{
    word-break: break-all;
    padding: 10px;
    font-size: 16px;
  }
  .article-content pre{
    overflow: auto;
    padding: 10px 0;
  }
  .article-content hr{
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .article-content ul{
    margin-left: 10px;

  }
  .article-content{
    margin-top: 16px;
  }

  .article-content h1{
    color: #000;
    line-height: 40px;
  }

  .article-content p ,.article-content ul{
    line-height: 24px;
    font-size: 16px;
    padding: 10px 0;
  }

  .article-content img{


    max-width: 100%;

  }
  .article-label{
    margin-top: 14px;
    margin-left: 48px;
  }
  .article-info{
    margin-top: 24px;
  }

  .article-info .article-username{
    font-weight: 600;
  }
  .article-info img{
    width: 32px;
    height: 32px;
    border-radius: 50%;

    margin-right: 12px;
    vertical-align: middle;
  }

  .article-info span{
    font-size: 16px;
    margin-right: 5px;
    line-height: 32px;
    margin-top: 24px;
  }
.article-content-box{
  padding: 20px;
  width: 100%;

  background: #fff;
  border-radius: 4px;
}
  .article-right-box{
    width: 100%;
    height: 300px;
    background: gold;
  }
</style>
