<template>
  <div class="index-page-box">
    <Row>

      <Col :xs="0"  :lg="6">
        <Affix :offset-top="18">
        <div class="article-right-recommend float-fight">
          <div class="right-recommend-title">
            推荐文章
          </div>
          <Divider></Divider>

          <div class="right-recommend-list" v-for="(item,index) in recommentList" :key="index">
            <div class="recommend-title">
              <a :href="'/article/'+item.id">{{item.title}}</a>
            </div>

            <div class="recomment-summary">
              {{item.summary}}
            </div>

            <div class="recommend-info">
              <Icon size="16" type="ios-calendar" />
              <span>{{item.createTime}}</span>
              <Icon size="16" type="md-eye" />

              <span>{{item.viewCount}}</span>
            </div>

            <div class="recommend-label">
              <Tag style="margin-right: 10px" size="default" color="default" v-for="(item,index) in item.labelList" :key="index">
                {{item}}
              </Tag>
            </div>

          </div>


        </div>
        </Affix>
        <div class="test-left"></div>
      </Col>
      <Col :xs="24"  :lg="18">
        <Col :xs="24" :sm="4" :md="6" :lg="15">

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

            <div class="catalog-box" id="article-content-category-box"></div>
            <div id="article-content" class="article-content" v-html="articles.content">

            </div>

          </div>

          <div class="article-comment-box">
            <div class="article-comment-input">

              <Input v-model="comment.content" @on-focus="checkUser" type="textarea"  maxlength="256" show-word-limit :autosize="{minRows: 4,maxRows: 5}" placeholder="请输入评论..." />
              <Button type="primary" @click="postComment" class="comment-btn float-fight">提交评论</Button>
            </div>
            <div class="article-comment-list-box">
              <div class="comment-list-header">
                文章评论
              </div>
              <div class="article-comment-item clear-fix" v-for="(item,index) in commentList " :key="index">
                <div class="article-comment-user-info">
                  <img :src="item.userAvatar" >
                  <span class="comment-user-name">{{item.userName}}</span>
                  <Tag v-if="item.state===3" size="default" color="success">置顶</Tag>
                </div>

                <div class="article-comment-reply" v-if="item.parentContent!==null">
                  <span>回复：{{item.parentContent}}</span>
                </div>

                <div class="article-comment-content">
                  {{item.content}}
                </div>

                <div class="article-comment-action">
                  <span><Icon size="18" style="margin-right: 5px" type="ios-calendar-outline"/>{{item.createTime}}</span>
                  <span class="reply-button" @click="onReplyClick(item.id)">回复</span>
                </div>

                <div class="article-reply-box" :id="'sub_input_'+item.id">
                <div class="article-reply-comment">
                  <Input style="margin-top: 5px" v-model="subComment" @on-focus="checkUser" type="textarea"  maxlength="256" show-word-limit :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入评论..." />
                  <Button type="primary" @click="postSubComment(item.content,item.articleId)" class="comment-btn float-fight">提交回复</Button>
                </div>
                <div class="post-article-reply-comment">

                </div>
                </div>

              </div>

            </div>
            <div class="article-page-navigation">
              <Page :total="pageNavigation.total" :page-size="pageNavigation.size"  :current="pageNavigation.current" @on-change="changepage" show-total />
            </div>

            <div class="no-comment-box" v-if="commentList.length===0">
              暂时没有评论,赶快来评论把~
            </div>

          </div>

        </Col>

        <Col class="index-right-part default-border-radius float-left" :xs="0" :sm="16" :md="12" :lg="{span:9}" >
          <Affix :offset-top="18">
            <div class="article-right-catelog float-left">

              <div class="article-right-catelog-title">
                文章目录
              </div>
              <Divider></Divider>
              <div class="article-right-catelog-content" id="article-catelog-container"></div>

            </div>

          </Affix>
            <!--<div class="article-right-card float-left">
              <div class="right-card-title">
                热门标签
              </div>
              <div class="right-card-content">
                <WorldCloud></WorldCloud>
              </div>
            </div>-->

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

    <BackTop></BackTop>

  </div>
</template>

<script>
  import catelog from '../../utils/headerLineHandler'
  import hljs from 'highlight.js'
  import 'highlight.js/styles/a11y-dark.css'
import Logo from '~/components/Logo.vue'
import * as api from '../../api/api'

  let lastInput = null;

  export default {
  components: {
    Logo
  },
  data() {
    return {
      modal1: false,
      targetImagePath:'',
      subComment:'',
      comment:{
        content:'',
        articleId:'',
        parentContent:null,


      }
    }
  },
  async asyncData({params}){

     let result = await api.getArticleDetail(params.id);
     let recommentArticleList = await  api.getRecommentArticle(result.data.article.id,5)
     let commentRes = await api.getCommentsByArticleId(result.data.article.id,1,6);


    let pageNavigation = {
      current:commentRes.data.rows.current,
      size:commentRes.data.rows.size,
      total:commentRes.data.rows.total,
    }

    //console.log(recommentArticleList.data.rows);
    //console.log(commentRes.data.rows.records);
    return{
      pageNavigation:pageNavigation,
          articles:result.data.article,
      recommentList:recommentArticleList.data.rows,
      commentList:commentRes.data.rows.records
        }
  },
  methods: {

    postSubComment(parentContent,articleId){
      let blogToken = document.cookie.indexOf('blog_token');
      if (blogToken === -1) {
        location.href="/login?redirect="+location.href
        return
      }
      //检查数据
      if (this.subComment === '') {
        this.$Message.error('回复内容不能为空')
        return
      }
      //处理数据
      this.comment.content=this.subComment
      this.comment.parentContent = parentContent
      this.comment.articleId=articleId
      //console.log(this.comment);
      api.postComment(this.comment).then(resp=>{
        if (resp.code === api.success_code) {
          this.getArticleCommentById();
          this.resetComment();
          this.$Message.success(resp.message)
        }else {
          this.$Message.error(resp.message)
        }
      })
    },

    onReplyClick(item){
      let  subInputBox = document.getElementById('sub_input_'+item)
      this.subComment=''
      if (subInputBox) {
        if (lastInput) {
          lastInput.style.display='none'
        }
        lastInput = subInputBox;
        subInputBox.style.display='block'
      }


    },
    changepage(page){
      api.getCommentsByArticleId(this.articles.id,page,6).then(resp=>{
        if (resp.code === api.success_code) {
          this.commentList=resp.data.rows.records

        }else{
          this.$Message.error(resp.message)
        }

      })
    },
    showImage(event) {
      this.modal1 = true
      this.targetImagePath = event.target.src
    },
    postComment(){
      //检查是否登录
      let blogToken = document.cookie.indexOf('blog_token');
      if (blogToken === -1) {
        location.href="/login?redirect="+location.href
        return
      }
      //检查内容
      if (this.comment.content === '') {
        this.$Message.warning('请输入评论内容')
        return;
      }

      this.comment.articleId=this.articles.id

      //提交内容
      api.postComment(this.comment).then(resp=>{
        if (resp.code === api.success_code) {
          this.getArticleCommentById();
          this.resetComment();
          this.$Message.success(resp.message)
        }else {
          this.$Message.error(resp.message)
        }
      })



    },
    resetComment(){
      this.comment.content=''
      this.subComment=''
    },
    checkUser(){
      //检查是否有效
      api.getLoginInfo().then(resp=>{
        if (resp.code === 20001) {
          location.href="/login?redirect="+location.href
        }
      })
    },
    getArticleCommentById(){

      this.pageNavigation.current = 1;

      api.getCommentsByArticleId(this.articles.id,this.pageNavigation.current,6).then(resp=>{
        if (resp.code === api.success_code) {
          this.commentList=resp.data.rows.records
          this.pageNavigation.current=resp.data.rows.current
          this.pageNavigation.size=resp.data.rows.size
          this.pageNavigation.total=resp.data.rows.total
        }else{
          this.$Message.error(resp.message)
        }

      })
    }
  },
  mounted() {

    hljs.initHighlighting()
    new catelog({
      contentEl:'article-content',
      catalogEl:'article-catelog-container',
      selector:['h1', 'h2', 'h3']

    });

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

  .article-reply-box{
    display: none;
  }

  .article-page-navigation{
    margin-top: 20px;
    text-align: center;
  }

  .comment-btn{
    margin-top: 14px;
  }

  .article-comment-input{
    margin-bottom: 40px;

  }

  .no-comment-box{
    text-align: center;
    padding: 10px;
    cursor: pointer;
    margin-top: 20px;
  }

  .comment-user-name{
    font-weight: 600;
    color: #697183;
    font-size: 16px;
  }
  .article-comment-reply{
    padding: 10px;
    background: #F5F5F5;
    margin-left: 30px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;

  }

  .article-comment-content{
    padding: 10px;
    margin-left: 20px;
  }

  .reply-button{
    cursor: pointer;

  }
  .reply-button:hover{
    color: #2D8CF0

  }

  .article-comment-action{
    text-align: right;
  }

  .article-comment-item{

    padding: 10px 0;
    border-bottom: #E8EAEC solid 1px;
  }


  .article-comment-user-info img{
    width: 26px;
    height: 26px;
    border-radius: 50%;
    vertical-align: middle;
  }

  .article-comment-box{
    margin-top: 20px;
    padding: 20px;
    width: 100%;

    background: #fff;
    border-radius: 4px;
  }

  .comment-list-header{
    font-size: 16px;
    font-weight: 600;
    color: #515A6E;
  }

  .cl-link-active >span{
    display: block;
    color: #2D8CF0 !important;
    background: #F9F9F9 !important;
  }



  .test-left{
    width: 100%;
    padding: 20px;
  }
  #article-catelog-container li span:hover{
    color: #2D8CF0;
    cursor: pointer;
  }
  #article-catelog-container li span{
    cursor: pointer;

  }

  #article-catelog-container ul{
    margin-left: 20px;
    line-height: 30px;
    font-size: 16px;
    font-weight: 500;

  }


  #article-catelog-container {
    margin-top: 20px;
  }
  .catalog-box{
    display: none;
  }
  .article-right-catelog-content{
    padding: 10px;
  }
  .article-right-catelog-title{
    padding: 10px;
    font-weight: 600;
    font-size: 16px;
  }
  .article-right-catelog{
    padding: 14px;
    margin-left: 50px;
    width: 70%;
    border-radius: 4px;
    background: #fff;
    margin-bottom: 20px;
  }

  .right-card-content .wordCloud .text{
    cursor: pointer;
  }

  .recommend-title a:hover{
    color: #2D8CF0;
  }
  .recommend-title a{
    color: #515A6E;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
  }
  .recommend-title{
    margin-bottom: 6px;
  }


  .right-recommend-list{
    margin-bottom: 14px;
  }

  .index-page-box{
    margin-top: 30px;
  }

  .article-right-card{
    margin-left: 50px;
    width: 70%;
    border-radius: 4px;
    background: #fff;
    margin-bottom: 20px;
  }
  .article-right-card .right-card-title{
    padding: 10px;
    font-weight: 600;
    font-size: 16px;

  }


  .article-right-recommend{

    margin-right: 40px;
    padding: 14px;
    margin-left: 50px;
    width: 70%;
    border-radius: 4px;
    background: #fff;
    margin-bottom: 20px;
  }
  .article-right-recommend .right-recommend-title{
    padding: 10px;
    font-weight: 600;
    font-size: 16px;

  }

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

</style>
