const CATEGORY = require('./categoryIcon')

module.exports.switchCategoryIcon = function (category) {
  switch (category) {
    case '家居物業':
      category = CATEGORY.home
      break
    case '交通出行':
      category = CATEGORY.transportation
      break
    case '休閒娛樂':
      category = CATEGORY.entertainment
      break
    case '餐飲食品':
      category = CATEGORY.food
      break
    case '其他':
      category = CATEGORY.else
      break
  }
  return category
}