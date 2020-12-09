import {Service} from "./index.js"
// -------------------HomePage------------------------
//	广告--列表
export function getActiveAdd(type) {
    return Service({
      url: 'api/banner/getActiveAd',
      params:{type:type}
    })
}
//新闻动态列表(下拉刷新)
export function getInformationList(){
    return Service({
        url: 'api/commom/getInformationList',
        params: { pageNo: 1 ,pageSize:10}
      })
}
//公告列表
export function getAnnouncementList(){
    return Service({
        url:'api/commom/getAnnouncementList',
        params:{}
    })
}

//产品列表
export function  getGoodsList(classId){
    return Service({
        url:"api/commom/getGoodsList",
        params:{
            pageNo:1,
            pageSize:40,
            classId:classId
        }
    })
}
//产品类目列表
export function getGoodsClassList(){
    return Service({
        url:'api/commom/getGoodsClassList',
        params:{
            
        }
    })
}

//商品详情
export function  getGoodsDetail(goodsId){
    return Service({
        url:"api/commom/getGoodsDetail",
        params:{
            goodsId
        }
    })

}
//技术实力列表
export function getTechnologyList(classId){
    return Service({
        url:"api/commom/getTechnologyList",
        params:{
            pageNo:1,
            pageSize:10,
            classId
        }
    })
}
//技术实力类目列表
export function getTechnologyClassList(){
    return Service({
        url:'api/commom/getTechnologyClassList',
        params:{
            pageNo:1,
            pageSize:10
        }
    })
}



//技术实力 详情
export function getTechnologyDetail(technologyId){
    return Service({
        url:'api/commom/getTechnologyDetail',
        params:{
            technologyId:technologyId
        }
    })
}

//点赞和取消点赞
export function updateTechnologyPraise(technologyId){
    return Service({
        url:"api/commom/updateTechnologyPraise",
        params:{
            technologyId
        }
    })
}
//企业商城
export function getCompanyShopList(){
    return Service({
        url:"api/commom/getCompanyShopList",
        params:{

        }

    })
}
//文章列表 (公司简介  企业文化)
export function getCompanyList(){
    return Service({
        url:"api/commom/getCompanyList",
        params:{}
    })
}
//13.	预约--门店列表
export function getShopList(){
    return Service({
        url:"api/commom/getShopList",
        params:{

        }
    })
}
//14.	预约--门店服务列表
export function getServiceList(shopId){
    return Service({
        url:"api/commom/getServiceList",
        params:{
            shopId:shopId
        }
    })
}
//15.	预约--添加预约
export function addConvention(params){
    return Service({
        url:"api/commom/addConvention",
        params:params
    })

}
//新闻详情
export function getInformationDetail(informationId){
    return Service({
        url:"api/commom/getInformationDetail",
        params:{
            informationId:informationId
        }
    })
}