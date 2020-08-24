import request from "../utils/request";

const baseUrl = `http://localhost:8004`;

export const  success_code=20000;

export const getAdminInfo=(userId)=>{
  if (process.client) {
    return request.requestGet(`/portal/web_site_info/user_info/${userId}`)
  }else {
    return request.requestGet(baseUrl+`/portal/web_site_info/user_info/${userId}`)

  }
}


export const getCategories=()=>{
  if (process.client) {
    return request.requestGet(`/portal/web_site_info/list`)
  }
  return request.requestGet(baseUrl+`/portal/web_site_info/list`)
}

export const getLoops=()=>{
  if (process.client) {
    return request.requestGet(`/portal/web_site_info/loop`)

  }
  return request.requestGet(baseUrl+`/portal/web_site_info/loop`)
}
export const getTopArticles=()=>{
  if (process.client) {
    return request.requestPost(`/portal/Article/TopArticle/1/5`)

  }
  return request.requestPost(baseUrl+`/portal/Article/TopArticle/1/5`)
}

export const getArticles=(categoryId,current,size)=>{

  if (categoryId !== '') {
    return request.requestGet(`/portal/Article/list/${categoryId}/${current}/${size}`)
  }

  if (process.client) {
    //客户端
    return request.requestPost(`/portal/Article/list/${current}/${size}`)

  }else {
    //服务端
    return request.requestPost(baseUrl+`/portal/Article/list/${current}/${size}`)

  }
  //return request.requestPost(baseUrl+`/portal/Article/list/${current}/${size}`)
}

export const getLabels=(size)=>{
  return request.requestGet(`/portal/Article/labels/${size}`)
}

/*export const getArticleByCategoryId=(categoryId,current,limit)=>{
  if (categoryId !== '') {
    return request.requestGet(`/portal/Article/list/${categoryId}/${current}/${limit}`)
  }
  return request.requestGet(`/portal/Article/list/${categoryId}/${current}/${limit}`)
}*/
export const getLinkList=()=>{
  if (process.client) {
    return request.requestGet(`/portal/web_site_info/friend_link`)
  }
  return request.requestGet(baseUrl+`/portal/web_site_info/friend_link`)
}
