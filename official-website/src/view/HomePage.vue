<template>
    <div id="HomePage">
        <!-- 轮播图 -->
        <div id="swiper" class="container-fuild" >
            <div class="swiper-container banner-swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in bannerList" :key="index">
                        <img class="swiper-lazy" :src="item.bannerUrl" alt="轮播图">
                        <!-- <div class="swiper-lazy-preloader"></div> -->
                    </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
                
                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
        </div>
        <div style="width:1202px;margin:0px auto;" id="bodyBox">
          <!-- 概要 -->
            <div id="bigData" class="container-fuild" style="width:100%;">
                <div class="row bigData-container"  style="width:1202px">
                    <!-- 新闻动态 --> 
                    <div class="col-xs-12 col-sm-12 col-md-4  zoomIn" style="margin-right:65px">
                        <span class="bodyTitle">新闻动态</span>
                        <div style="border-top:1px solid #E4E4E4;margin-top:7px;width:359px;">
                            <!-- 遍历这个item组件 -->
                            <div  style="border-bottom:1px dashed #E4E4E4;height:60px;line-height:60px;display:flex;" 
                                  v-for="(info,infoindex) in InformationList" :key="infoindex" @click="showInfoDeail(info.id)">
                                <span style="width:330px;word-break:break-all;flex:3;">{{info.title}}</span>
                                <span style="margin-left:11px;color:#999999;flex:1;overflow:hidden">{{info.createtime}}</span>
                            </div>
                        </div>
                    </div>
                    <!-- 企业概况 -->
                    <div class="col-xs-12 col-sm-12 col-md-4" style="margin-right:64px;">
                        <span class="bodyTitle">企业概况</span>
                        <div style="border-top:1px solid #E4E4E4;padding-top:11px;margin-top:7px;width:431px;">
                            <p style="text-indent:2em;line-height:36px;font-size:14px;"> 中药创建于2005年，前期投资3000万，占地面积28余亩，标准化生产车间及辅助用房建筑面积1000平方米。展望未来，公司承载重任，以“承中药之文化，扬国药之精髓，铸人类之健康”为使命，以“百亿中药”为目标，继续致力于现代中药、中药饮片与配方颗粒、中医药健康产业等板块的发展。 中药创建于2005年，前期投资3000万，占地面积28余亩，标准化生产车间及辅助用房建筑面积1000平方米。展望未来，公司承载重任，以“承中药之文化，扬国药之精髓。 </p>
                        </div>    
                    </div>
                    <!-- 联系我们 --> 
                    <div class="col-xs-12 col-sm-12 col-md-4" style="width:211px;">
    
                        <span style=" color:#01A946;font-size: 16px;line-height: 22px;padding-bottom: 8px;">联系我们</span>
    
                        <div style="width:212px;height:58px; position: relative;">
    
                            <span style="position: absolute;left:64px;top:14px; color: #FFFFFF;line-height: 19px;">服务热线</span>
    
                            <span style="position: absolute;left:64px;top:34px;color: #FFFFFF;line-height: 19px;">0808-281920-00</span>
    
                            <img src="@/assets/img/contact.png" alt="联系我们" style="display:inline-bloack;width:100%;height:100%">
    
                        </div>
    
                        <div id="map" class="wow zoomIn" style="display:block;height:211px;width:212px"></div>
    
                        <div style="margin-top:18px;word-break:break-all;width:205px;height:40px;color:#888888;font-size:14px;">公司地址: 贵阳市南明区亚太中心 贵阳市南明区亚太中心</div>
    
                        <div style="margin-top:12px;color:#888888;font-size:14px;">传真号码: 17138518551</div>
    
                    </div>
                </div>
            </div>
            <!-- 产品展示-->
            <div id="bigData" style="padding-top:0px;width:100%;" class="container-fuild" >
                <div class="row bigData-container" style="width:1202px;">
                    <span class="bodyTitle">产品展示</span>
                    <div style="border-top:1px solid #E4E4E4;margin-top:7px;">
                        <!-- 遍历这个item组件 -->
                            <div v-for="(item,index) in GoodsList" :key="index" class="imgBox col-xs-6 col-sm-6 col-md-4" >
                                <img :src=item.picUrl alt="产品展示" @click="showGoodsDetail(item.id)"/>
                            </div>
                    </div>    
                </div>
            </div>
            <!-- 技术实力 -->
            <div id="bigData" style="padding-top:0px;width:100%;" class="container-fuild">
                <div class="row bigData-container" style="width:1202px;">
                    <span class="bodyTitle">技术实力</span>
                    <div style="border-top:1px solid #E4E4E4;margin-top:7px;">              
                      <el-row  class="tac" style="margin-top:19px;">
                           <!-- 左侧导航组件 -->
                          <leftNav :data-list="dataList" @currentNavMenu="currentNavMenu"/>
                          <!-- 左侧内容区域 -->
                          <el-col  style="margin-left:21px;margin-top:-15px;width:1032px">
                              <div class="row" style="width:100%">
                                   <div  v-for="(item,index) in TechnologyList" :key="index" class=" col-xs-12 col-sm-12 col-md-4">
                                      <Card  class="card"  :technology-item="item" @PraiseSuccess="praiseSuccessHandler"/>
                                  </div>
                              </div>
                          </el-col>
                      </el-row>          
                    </div>  
                </div>
            </div>
        </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import { WOW } from "wowjs";
import BMap from "BMap";
import Card from "./homePage/component/card"
import leftNav from './homePage/common/leftNav.vue';
import goodsDetails from "./homePage/goodsDetails.vue"
import {getActiveAdd,getInformationList,getGoodsList,getGoodsDetail,getTechnologyList} from "@/api/api.js"

export default {
    name: "HomePage",
    components:{
        Card,
        leftNav,
        goodsDetails
    },
    data() {
        return {
            //banner轮播图
            bannerList:[],
            //新闻动态
            InformationList:[],
            //产品展示
            GoodsList:[],
            //技术实力(双向绑定 重新赋值 实现数据点击刷新)
            TechnologyList:[],
            //记录左侧导航栏当前点击的下标
            currentNavIndex:0,

            // 首页 左侧导航栏 数据
            dataList:[
                "中医药馆",
                "中医食善馆",
                "药品房",
                "中药种植基地",
                "生产药厂"
            ]   
        };
    },
    created(){
        // 获取轮播图
        getActiveAdd(1).then(res=>{
            this.bannerList=res.data
        }).catch(err=>{
            console.log(err)
        })
        //获取新闻列表
        getInformationList().then(res=>{
            this.InformationList=res.data.items
        }).catch(err=>{

        })
        //获取产品列表
        getGoodsList().then(res=>{
            this.GoodsList=res.data.items;
        }).catch(err=>{

        })
        //获取技术实力列表 classid为第一个导航栏index
        this.getTechnologyLists(0);
    },
    mounted() {
        /* banner-swiper */
        new Swiper(".banner-swiper", {
            loop: true, // 循环模式选项
            effect: "fade",
            centeredSlides : true,
            //自动播放
            autoplay: {
                delay: 5000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
                
            },
            // 如果需要分页器
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            // 延迟加载
            lazy: {
                loadPrevNext: true,
            },
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
        });
        
        /* wowjs动画 */
        var wow = new WOW({
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: true,
            live: true,
        });
        wow.init();
        // 地图
        var map = new BMap.Map("map"); // 创建地图实例
        var point = new BMap.Point(104.58765, 26.47954); // 创建点坐标
        map.centerAndZoom(point, 18); // 初始化地图，设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        var marker = new BMap.Marker(point); // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中
        var infoWindow = new BMap.InfoWindow(
            "公司地址"
        ); // 创建信息窗口对象
        map.openInfoWindow(infoWindow, map.getCenter()); // 打开信息窗
    },
    methods:{
        //显示商品详情
        showGoodsDetail(goodsId){
            var _this=this;
            getGoodsDetail(goodsId).then(res=>{
                //开启弹窗 传递数据
                _this.$layer.iframe({
                            content: {
                                content: goodsDetails,
                                parent: _this,
                                data:{
                                    detailsData:res.data.detail
                                }
                            },
                            area:['80%','550px'],
                            title: '产品详情',
                            cancel:()=>{
                                
                            }
                            });
            }).catch(err=>{

            })
        },
        //技术实力 列表(页面初始化调一次 classid为第一个导航条   点击时调一次classid为当前点击的classid)
        getTechnologyLists(classId){
            getTechnologyList(classId).then(res=>{
                this.TechnologyList=res.data.items
                console.log(this.TechnologyList);
            }).catch(err=>{

            })
        },
        //左侧导航栏 当前点击的条目下标
        currentNavMenu(index){
            this.currentNavIndex=index;
            this.getTechnologyLists(index);
        },
        //点赞成功刷新数据
        praiseSuccessHandler(status){
            this.getTechnologyLists(this.currentNavIndex);
        },
        //查看新闻详情
        showInfoDeail(informationId){
            this.router.push({
                path:"/infoDetail",
                name:"infoDetail",
                });
            localStorage.setItem("informationId",informationId);
        }




    }
};
</script>
<style scoped>
/* 整体盒子 */

#HomePage {
    width: 100%;
}

/* 轮播图 */

#swiper {
    height: 600px;
}

#swiper .banner-swiper {
    width: 100%;
    height: 100%;
}

#swiper .banner-swiper .swiper-slide img {
    width: 100%;
    height: 100%;
}

#swiper .banner-swiper .swiper-slide {
    position: relative;
}

#swiper .banner-swiper .swiper-slide-title {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999999999;
    width: 100%;
    height: 100%;
    color: #fff;
    background: rgba(51, 51, 51, 0.534);
    text-align: center;
    line-height: 80px;
}

#swiper .banner-swiper .swiper-slide-title>h1 {
    font-size: 50px;
    margin-top: 12%;
}

#swiper .banner-swiper .swiper-slide-title>p {
    font-size: 20px;
    margin-top: 1%;
    font-weight: 700;
}

/* 标题文字 */

.bodyTitle {
    color: #01A946;
    border-bottom: 2px solid #01A946;
    padding-bottom: 1px;
    font-size: 16px;
    line-height: 22px;
    padding-bottom: 8px;
}

#bigData {
    padding: 100px;
    transition: all ease 0.6s;
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
}

#bigData .bigData-title {
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
}

#bigData p {
    font-size: 14px;
    color: #333;
    line-height: 2rem;
}

#bigData .bigData-device {
    margin: 50px 0 20px;
}


/* 轮播图 */

#contactUs {
    color: #fff;
    height: 400px;
    background: url("../assets/img/contact_us_bg.jpg") 0 0 no-repeat;
    background-size: 100% 100%;
    transition: all ease 0.6s;
}

#contactUs .contactUs-container {
    padding-top: 50px;
}

#contactUs .contactUs-container button {
    width: 300px;
    height: 50px;
    margin-top: 40px;
}

#contactUs .contactUs-container .contactUs-contactWay span {
    display: inline-block;
    width: 48px;
    height: 48px;
    margin: 30px;
}

#contactUs .contactUs-container .contactUs-contactWay span:nth-of-type(1) {
    background: url("../assets/img/weixin.png") 0 0 no-repeat;
    background-size: 100% 100%;
}

#contactUs .contactUs-container .contactUs-contactWay span:nth-of-type(2) {
    background: url("../assets/img/weibo.png") 0 0 no-repeat;
    background-size: 100% 100%;
}

#contactUs .contactUs-container .contactUs-contactWay span:nth-of-type(3) {
    background: url("../assets/img/twitter.png") 0 0 no-repeat;
    background-size: 100% 100%;
}

/* 产品展示 */

.imgBox {
    width: 140px;
    height: 140px;
    margin-top: 9px;
    padding-left: 0;
    margin-right: 28px;
}

.imgBox img {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 4px;
}

.card{
    width:324px;
    height:311px;
    border-radius: 5px;
    margin-right: 30px;
    margin-bottom: 31px;
}

/* 媒体查询（手机） */
@media screen and (max-width: 768px) {
    #bodyBox{
        width:100% !important;
        overflow: hidden;
    }





    #swiper {
        height: 200px;
    }
    #bigData {
        padding: 30px;
    }
    #bigData .bigData-title {
        font-size: 20px;
    }
    #bigData .bigData-device {
        font-size: 20px;
        margin: 10px 0 10px;
    }
    #contactUs {
        height: 200px;
        transition: all ease 0.6s;
    }
    #contactUs .contactUs-container {
        padding-top: 0;
    }
    #contactUs .contactUs-container h1 {
        font-size: 25px;
    }
    #contactUs .contactUs-container h3 {
        font-size: 18px;
    }
    #contactUs .contactUs-container button {
        width: 200px;
        height: 30px;
        margin-top: 20px;
    }
    #contactUs .contactUs-container .contactUs-contactWay span {
        display: inline-block;
        width: 28px;
        height: 28px;
        margin: 10px;
    }
    #customer {
        padding: 30px 0;
        box-sizing: border-box;
        background: #fff;
    }
    #customer .customer-title {
        font-size: 16px;
        font-weight: bold;
    }
    #customer .customer-logo img {
        width: 48px;
        height: 48px;
    }
    #customer .customer-block {
        padding: 30px;
    }
    #customer .customer-block>div {
        padding: 30px 0;
    }
    #whyChooseUs {
        padding: 20px 0;
        transition: all ease 0.6s;
    }
    #whyChooseUs .whyChooseUs-title p:nth-of-type(1) {
        font-size: 20px;
        font-weight: 700;
    }
    #whyChooseUs .whyChooseUs-title p:nth-of-type(2) {
        font-size: 12px;
    }
    #whyChooseUs .server-block {
        padding: 50px 0;
        border: 1px solid #ccc;
        border-bottom: 5px solid #ccc;
    }
    #whyChooseUs .server-block img {
        width: 48px;
        height: 48px;
    }
    #whyChooseUs .server-block>p {
        font-size: 20px;
        margin: 30px 0;
    }
    #whyChooseUs .server-block>div {
        color: #ccc;
    }
    .CardtextBox .title{
        width: 10px;
    }
}

/* 媒体查询（平板） */

@media screen and (min-width: 768px) and (max-width: 996px) {
    
   #bodyBox{
       margin-top: 100px !important;
   }
    #swiper {
        height: 400px;
    }
    #bigData {
        padding: 60px;
    }
    #bigData .bigData-title {
        font-size: 30px;
    }
    #bigData .bigData-device {
        font-size: 30px;
        margin: 30px 0 15px;
    }
    #contactUs {
        height: 300px;
    }
    #contactUs .contactUs-container {
        padding-top: 50px;
    }
    #contactUs .contactUs-container h1 {
        font-size: 30px;
    }
    #contactUs .contactUs-container h3 {
        font-size: 20px;
    }
    #contactUs .contactUs-container button {
        width: 300px;
        height: 50px;
        margin-top: 30px;
    }
    #contactUs .contactUs-container .contactUs-contactWay span {
        display: inline-block;
        width: 32px;
        height: 32px;
        margin: 15px;
    }
    #customer .customer-title {
        font-size: 24px;
    }
    #whyChooseUs {
        padding: 20px 0;
    }
}
</style>

