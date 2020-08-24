<template>
  <div class="index-page-box clear-fix">

    <Row>
      <Spin size="large" fix v-if="spinShow"></Spin>
      <Col  :xs="0" :sm="4" :md="6" :lg="{span:4 }">

        <Affix>
          <div class="index-left-part float-left default-border-radius">
            <div class="index-left-user-info">
              <div class="user-avatar">
                <img :src="userInfo.avatar" >
              </div>
              <div class="user-username">
                <span v-text="userInfo.userName"></span>
              </div>
              <div class="user-sign">
                <span v-text="userInfo.sign"></span>
              </div>
            </div>
            <div class="left-user-self-links">
              <span class="sob_blog sobwechat"></span>
              <span class="sob_blog sobgithub"></span>
              <span class="sob_blog soblink"></span>
            </div>
            <div class="left-categories-box">
              <div class="categories-item default-border-radius" v-for="(item,index) in categories" :key="index">
                <span v-text="item.name" @click="listArcitleByCategoryId(item)"></span>
              </div>
            </div>
          </div>
        </Affix>
        <div class="test-left"></div>




      </Col>
      <Col class="index-center-part default-border-radius float-left" :xs="24" :sm="16" :md="12" :lg="{span:13,offset: 1 }">
          <div class="loop-box">
            <Carousel autoplay :autoplay-speed=speed v-model="value2" radius-dot loop>
              <CarouselItem v-for="(item,index) in loops" :key="index">
                <img :src="item.imageUrl" style="object-fit: cover">
              </CarouselItem>
            </Carousel>
          </div>

        <div class="top-articles-box default-border-radius">
          <div class="top-article-item" v-for="(item,index) in TopArticles" :key="index">
            <!--<Col  :xs="4" :sm="6" :md="9" :lg="8">
              <div class="top-article-cover">
                <img :src="item.cover" >
              </div>
            </Col>-->
            <!--<Col :xs="24" :sm="24" :md="24" :lg="24">-->
              <div class="top-article-title">
                <span class="top-tips">置顶</span>
                <span class="top-title">{{item.title}}</span>
              </div>
            <Row>
              <Col :xs="24" :sm="24" :md="24" :lg="24">
                <div class="top-article-summary ">
                  <p>{{item.summary}}</p>
                  <span class="read-more float-fight">阅读全文</span>
                </div>
                <div class="top-tag">
                  <div class="top-tags float-left" v-for="(tags,indexs) in item.labelList" :key="indexs">
                    <Tag color="volcano">{{tags}}</Tag>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <!--发布状态的文章-->
        <div class="top-articles-box default-border-radius">
          <div class="top-article-item" v-for="(item,index) in Articles" :key="index">
            <Row class="last-articles">
              <Col :xs="0"  :lg="8">
                <div class="top-article-cover">
                  <img :src="item.cover" >
                </div>
              </Col>
              <Col :xs="24"  :lg="16">
                <div>
                  <div class="top-article-title">
                    <span class="top-title">{{item.title}}</span>
                  </div>
                  <div class="top-article-summary ">
                    <p>{{item.summary}}</p>
                    <span class="read-more float-fight">阅读全文</span>
                  </div>
                  <div class="top-tag">
                    <div class="top-tags float-left" v-for="(tags,indexs) in item.labelList" :key="indexs">
                      <Tag color="volcano">{{tags}}</Tag>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div class="article-page-navigation">
          <Page :total="pageNavigation.total" :page-size="pageNavigation.size"  :current="pageNavigation.current" @on-change="changepage" show-total />
        </div>

      </Col>

      <Col class="index-right-part default-border-radius float-left" :xs="0" :sm="4" :md="6" :lg="{span:5,offset: 1 }">
        <Affix>

        <div class="right-card">
            <div class="card-title">
              内容搜索
            </div>
            <div class="card-content">
              <Input v-model="keyword" icon="ios-search-outline" placeholder="你有什么想搜索的吗" style="width: 80%;margin: 20px;" />
            </div>
          </div>


        <div class="right-card">
          <div class="card-title">
            热门标签
          </div>
          <div class="card-content">
            <div class="labels-list-box">
              <client-only>
                <wordcloud
                  :data="defaultWords"
                  nameKey="name"
                  :rotate="rotate"
                  :fontSize="fontsize"
                  :margin="margin"
                  valueKey="count"
                  :showTooltip="false"
                  :wordClick="wordClickHandler">
                </wordcloud>
              </client-only>

            </div>

          </div>
        </div>
        </Affix>

      </Col>

    </Row>
    <BackTop></BackTop>

  </div>
</template>

<script>
  import getColor from '../utils/getColor'
import Logo from '~/components/Logo.vue'
import * as api from '../api/api'
export default {
  components: {
  },
  data() {
    return {
      spinShow:false,
      value2: 0,
      speed:4000,
      pageSize:8,
      keyword:'',
      fontsize:[20,50],
      rotate:{from: 0, to: 0, numOfOrientation: 5 },
      margin:{top: 0, right: 0, bottom: 0, left: 10 },
      defaultWords: [],
      currentCategoryId:''
    }
  },
  methods: {
    listArcitleByCategoryId(item){
      this.spinShow=true
      console.log(item);
      //重置页码
      this.pageNavigation.current = 1;
      this.currentCategoryId = item.id
      //请求数据
      api.getArticles(this.currentCategoryId,this.pageNavigation.current,5).then(resp=>{

        if (resp.code === api.success_code) {
          this.Articles = resp.data.rows.records
          this.goUp()
          this.pageNavigation.current=resp.data.rows.current
          this.pageNavigation.size=resp.data.rows.size
          this.pageNavigation.total=resp.data.rows.total
          this.spinShow=false
        }else{
          this.$Message.error(resp.message)
        }
      })
      //处理结果
    },
    goUp(){
      let nowTop = document.body.scrollTop || document.documentElement.scrollTop; // 获取当前滚动条位置
      if (nowTop > 0) {
        window.requestAnimationFrame(this.goUp);
        window.scrollTo (0,nowTop - (nowTop/5));
      }
    },

    listLabels(){
      api.getLabels(20).then(resp=>{
        if (resp.code === api.success_code) {
          this.defaultWords = resp.data.rows

        }
      })
    },
    wordClickHandler(name,value,vm){

    },
    changepage(page) {
      this.spinShow=true

      //加载当前页的内容
      api.getArticles(this.currentCategoryId,page,this.pageNavigation.size).then(resp=>{

        if (resp.code === api.success_code) {
          this.Articles = resp.data.rows.records
          this.goUp()
          this.spinShow=false
        }else{
          this.$Message.error(resp.message)
        }
      })
    }
  },
  mounted() {
    this.listLabels();

  },


  async asyncData({params}){
    let userInfo = await api.getAdminInfo('1283426670663364609');
    let getCategories = await api.getCategories();
    let getLoops = await api.getLoops();
    let TopArticles = await api.getTopArticles();

    //在服务端渲染的
    let ArticleList = await api.getArticles('',1,4);

    let pageNavigation = {
        current:ArticleList.data.rows.current,
        size:ArticleList.data.rows.size,
        total:ArticleList.data.rows.total,
    }
    let tempCateGories = [];
    tempCateGories.push({
      name:'全部分类',
      id:''
    })
    tempCateGories = tempCateGories.concat(getCategories.data.categories)

    return {
      pageNavigation:pageNavigation,
      categories:tempCateGories,
      userInfo:userInfo.data.newUser,
      loops:getLoops.data.loopers,
      TopArticles:TopArticles.data.rows.records,
      Articles:ArticleList.data.rows.records,
      page:ArticleList.data.rows,

    }

  }
}
</script>

<style>
  .test-left{
    width: 100%;
    padding: 20px;
  }
  .wordCloud .text{
    cursor: pointer;
  }
  .labels-list-box{

  }
  .right-card{
    width: 100%;
    border-radius: 4px;
    background: #fff;
    margin-bottom: 20px;
  }
  .right-card .card-title{
    padding: 10px;
    font-weight: 600;
    font-size: 16px;

  }
  .article-page-navigation{
    text-align: center;
  }
  .read-more:hover{
    border: #F4F6F7 solid 1px;
  }
  .read-more{
    border: #F5F5F5 solid 1px;
    border-radius: 4px;
    cursor: pointer;
    padding: 3px 10px;
  }
  .top-article-summary{
    margin-top: 20px;
  }
  .top-article-title .top-tips{
    padding: 3px 10px ;
    border-radius: 4px;
    background: #ff9900;
    font-size: 16px;
    color: #fff;
  }
  .top-article-title .top-title{
    font-size: 24px;
    margin-left: 10px;
  }
  .top-article-item{
    border-radius: 4px;
    background: #fff;
    margin-bottom: 20px;

    padding: 10px;
  }

  .top-articles-box{
    padding: 10px;

  }
  .top-article-cover{
    width: 90%;
    height: 150px;
  }
  .top-article-cover img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
  .loop-box img{
    width: 100%;
    height: 300px;
    border-radius: 4px;
  }
  .left-categories-box .categories-item:hover{
    background: #f5f5f5;
  }
  .left-categories-box .categories-item{
    padding: 10px 5px;
    cursor: pointer;
    color: #999999;

  }
  .left-categories-box{
    margin-top: 20px;
    text-align: center;
  }

  .left-user-self-links span:hover{
    color: #606060;
  }
  .left-user-self-links{
    text-align: center;
    margin-top: 20px;
  }
  .left-user-self-links span{
    cursor: pointer;
    font-size: 25px;
    font-weight: 600;
    margin-left: 15px;
    color: #cacaca;
    margin-right: 15px;
  }
  .index-left-user-info{
    text-align: center;
  }
  .index-left-user-info .user-avatar img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .index-page-box{

    margin-top: 20px;
    margin-bottom: 20px;
  }
  /*1140px 24px 660 240*/
  .index-left-part{
    width: 100%;
    /*width: 240px;*/
    background: #fff;
    padding: 20px;

  }

  .index-right-part{
   height: 600px;
  }
  .index-center-part{

    /*width: 800px;*/



  }
  .user-avatar{
    margin-top: 10px;
  }
  .user-username{
    margin-top: 15px;
    font-size: 18px;
    color: #606060;
  }
  .user-sign{
    margin-top: 10px;
    color: #cacaca;

  }
</style>
