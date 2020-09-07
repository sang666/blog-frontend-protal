<template>
<div class="search-box">
  <Row>
    <Col :xs="0" :sm="4" :md="6" :lg="5">
      <div class="right-box"></div>
    </Col>
    <Col :xs="24" :sm="16" :md="12" :lg="{ span: 12 }">

      <div class="input-box">
        <div class="input-box-item">
          <Input v-model="keyword" search   @keyup.enter.native="toSearchPage"  placeholder="搜索内容" style="width: 95%;margin-top: 20px;margin-bottom: 20px;" />
        </div>
        </div>
      <div class="search-left-part float-left">
          <div class="search-result-count-info">
            找到约<span v-text="searchResult.rows.total"></span>条结果
          </div>
        <div class="search-result-list-box" v-if="searchResult.rows.total!==0" >
          <div class="top-article-item"  v-for="(item,index) in searchResult.rows.list" :key="index">
            <!--<Col  :xs="4" :sm="6" :md="9" :lg="8">
              <div class="top-article-cover">
                <img :src="item.cover" >
              </div>
            </Col>-->
            <!--<Col :xs="24" :sm="24" :md="24" :lg="24">-->
            <div class="top-article-title">
              <span class="top-title">
                <a :href="'/article/'+item.id" v-html="item.title"></a>
              </span>
            </div>
            <Row>
              <Col :xs="24" :sm="24" :md="24" :lg="24">
                <div class="top-article-summary ">
                  <Tag class=" float-left" color="lime">摘要</Tag>
                  <p style="margin-left: 10px" v-html="item.summary"></p>
                  </div>

                <div class="top-article-summary">
                  <Tag class="float-left" color="geekblue">内容</Tag>
                  <div v-html="item.content" class="content-box"></div>

                </div>

                <div class="top-tag">
                  <div class="top-tags float-fight" v-for="(tags,indexs) in item.labelList" :key="indexs">
                    <Tag color="volcano">{{tags}}</Tag>
                  </div>
<!--
                  <span class="read-more float-fight">阅读全文</span>
-->
                </div>
              </Col>
            </Row>
          </div>



        </div>
        <div class="search-result-empty-box" v-else >
          <div class="box-icon">
            <Icon size="200" type="logo-dropbox" />
          </div>

          <div class="empty-text">
            没有找到相关内容
          </div>
        </div>
        <div class="search-result-navigation clear-fix">
          <div class="search-pre float-left" v-if="!isFirst">
            <a :href="'/search?keyword='+keyword+'&page='+(page-1)+'&size='+size">&lt;&lt;上一页</a>
          </div>
          <div class="search-next float-fight" v-if="!isLast">
            <a :href="'/search?keyword='+keyword+'&page='+(page+1)+'&size='+size">下一页&gt;&gt;</a>
          </div>
        </div>
      </div>
    </Col>
    <Col :xs="0" :sm="4" :md="6" :lg="{ span: 6, offset: 1 }">
      <div class="search-right-part">
        <div class="right-card">
          <div class="card-title">
            热门标签
          </div>
          <Divider></Divider>
          <div class="card-content">
            <div class="labels-list-box">
              <WorldCloud></WorldCloud>

            </div>

          </div>
        </div>
      </div>
    </Col>
  </Row>
  <BackTop></BackTop>
</div>
</template>

<script>
  import * as api from '../../api/api'
    export default {
      data() {
        return {
          keyword:''
        }
      },
      methods: {
        toSearchPage(){
          this.keyword = this.keyword.trim();
          if (this.keyword==='') {
            return;
          }
          location.href="/search?keyword="+encodeURI(this.keyword)

        },
      },
      asyncData({query}){

        let keyword = query.keyword?query.keyword:'';
        let page=query.page?query.page:1;
        let size=query.size?query.size:8;

        return api.searchArticles(page,size,keyword).then(resp=>{
          return {
            isFirst:resp.data.rows.first,
            isLast:resp.data.rows.last,
            searchResult: resp.data,
            keyword:keyword,
            page:parseInt(page),
            size:parseInt(size)
          }

        })
      }
    }
</script>

<style>
  .test-left{
    width: 100%;
    padding: 20px;
  }
  .top-article-title .top-title a{
    color: #606060;
  }
  .top-article-title .top-title a:hover{
    color: #2D8CF0;
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
  .search-result-empty-box{
    text-align: center;

  }
  .input-box-item {
/*
    margin-left: 20px;
*/
    width: 95%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .input-box{
    width: 100%;
    text-align: center;
  }

  .search-pre:hover, .search-next:hover{

    color: dodgerblue;
  }
  .search-pre, .search-next{
    cursor: pointer;
  }
  .search-pre-disable, .search-next-disable{
    cursor: not-allowed;
  }
  .search-result-navigation{

    padding: 20px;
  }
  .content-box{
    margin-left: 10px;
  }
  .ivu-input-group .ivu-input {

    height: 40px;
  }
  .right-box{
    width: 100%;
    height: 1px;
    background: #ffffff;
  }
  .top-article-item{
    border-radius: 4px;
    background: #fff;
    margin-bottom: 20px;

    padding: 10px;
  }

  .top-article-title .top-title{
    font-size: 24px;
    margin-left: 10px;
    cursor: pointer;
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

  .search-result-list-box{
    margin-top: 10px;
  }



  .search-left-part{
    width: 90%;
    margin-left: 20px;
    margin-bottom: 40px;


  }

  .search-right-part{
    padding: 10px;
    border-radius: 4px;
    margin-top: 32%;
    width: 80%;
    background: #fff;

  }
  .search-input-box{
    text-align: center;
    width: 100%;
    height: 50px;
    background: orangered;
    margin-bottom: 25px;
  }
  .top-tag{
    margin-top: 8px;
  }
  .top-article-summary{
    margin-top: 5px;
  }
  .content-tag{
    margin-left: 10px;
  }

</style>
