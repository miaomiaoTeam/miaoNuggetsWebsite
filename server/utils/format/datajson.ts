export function dataToJson<Data extends DB.Base>(
  data: Data,
  options: {
    bool?: getBoolKey<Data>[]
    json?: getJsonKey<Data>[]
  }
) {
  const { bool, json } = options
  if (bool) {
    for (const key of bool) {
      // @ts-ignore
      data[key] = Boolean(data[key])
    }
  }
  if (json) {
    for (const key of json) {
      // @ts-ignore
      data[key] = JSON.parse(data[key])
    }
  }
  return data
}

dataToJson.user = function (user: DB.UserList) {
  return dataToJson(user, {
    json: ['follow_label', 'follow_user', 'like_article', 'collect_article'],
  })
}
dataToJson.users = function (users: DB.UserList[]) {
  return users.map(dataToJson.user)
}

dataToJson.tab = function (tabs: DB.TabsLabelList) {
  return dataToJson(tabs, {
    bool: ['in_menu', 'is_show'],
  })
}
dataToJson.tabs = function (tabs: DB.TabsLabelList[]) {
  return tabs.map(dataToJson.tab)
}

dataToJson.tag = function (tags: DB.FollowLabelList) {
  return dataToJson(tags, {
    bool: ['is_show'],
  })
}
dataToJson.tags = function (tags: DB.FollowLabelList[]) {
  return tags.map(dataToJson.tag)
}

dataToJson.category = function (categorys: DB.CategoryList) {
  return dataToJson(categorys, {
    bool: ['is_show'],
  })
}
dataToJson.categorys = function (categorys: DB.CategoryList[]) {
  return categorys.map(dataToJson.category)
}

dataToJson.article = function (articles: DB.ArticleList) {
  return dataToJson(articles, {
    json: ['tag_ids'],
  })
}
dataToJson.articles = function (articles: DB.ArticleList[]) {
  return articles.map(dataToJson.article)
}

dataToJson.ad = function (ads: DB.ADList) {
  return dataToJson(ads, {
    bool: ['is_show'],
  })
}
dataToJson.ads = function (ads: DB.ADList[]) {
  return ads.map(dataToJson.ad)
}
