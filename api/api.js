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

export const searchArticles=(current,limit,keyword)=>{
  if (process.client) {
    return request.requestGet(`/portal/search/${current}/${limit}?keyword=${keyword}`)

  }
  return request.requestGet(baseUrl+`/portal/search?keyword=${encodeURI(keyword)}&page=${current}&size=${limit}`)
}
export const doLogin=(verifyCode,captcha_key,user)=>{

  return request.requestPost(`/biz/user/login/${verifyCode}/${captcha_key}?from=p_`,user)
}


export const getLoginInfo=()=>{

  return request.requestGet(`/biz/user/check-token`)
}


export const doLogout=()=>{

  return request.requestGet(`/biz/user/logout`)
}


export const getVerifyCode=(email,type)=>{

  return request.requestGet(`/biz/user/verify_code?email=${email}&type=${type}`)

}


export const checkUserName=(UserName)=>{

  return request.requestGet(`/biz/user/userName?userName=${UserName}`)

}

export const register=(captcha_code,captcha_key,email_code,user)=>{

  return request.requestPost(`/biz/user/join_in?captcha_code=${captcha_code}&captcha_key=${captcha_key}&email_code=${email_code}`,user)

}


export const updatePasswordByEmail=(captcha_code,captcha_key,email_code,email )=>{

  return request.requestGet(`/biz/user/check_email_code?captcha_code=${captcha_code}&captcha_key=${captcha_key}&email_code=${email_code}&email=${email}`)

}


export const updatePassword=(verifyCode,user)=>{

  return request.requestPut(`/biz/user/password/${verifyCode}`,user)

}


export const getArticleDetail=(id)=>{


  return request.requestGet(baseUrl+`/portal/Article/${id}`)

}


export const getRecommentArticle=(id,size)=>{

  return request.requestGet(baseUrl+`/portal/Article/recommend/${id}/${size}`)

}


export const getCommentsByArticleId=(articleId,current,limit)=>{
  if (process.client) {
    return request.requestGet(`/portal/comment/${articleId}/${current}/${limit}`)

  }
  return request.requestGet(baseUrl+`/portal/comment/${articleId}/${current}/${limit}`)

}


export const postComment=(comment)=>{

  return request.requestPost(`/portal/comment/comment`,comment)

}
