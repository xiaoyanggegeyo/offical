<template>
    <div id="HomePage" v-cloak>
        <div id="swiper" class="container-fuild" >
            <div class="swiper-container banner-swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in bannerList" :key="index">
                        <a :href="item.link == ''?'':item.link">
                            <img class="swiper-lazy" :src="item.bannerUrl" alt="轮播图">
                        </a>
                    </div>
                </div>
           
                <div class="swiper-pagination"></div>
          
                <div class="swiper-button-prev arrow" ></div>
                <div class="swiper-button-next arrow"></div>
            </div>
        </div>
        <!--公告 -->
         <div class="newsBox">
            <el-row :gutter="24">
                <el-col :span="24" >
                    <div class="newCard" @click="showNoticeDetail(AnnouncementList)">
                        <div class="innerBox">
                            <div class="topBox">
                            <span class="title">{{AnnouncementList.title}}</span>
                            <span class="time">{{AnnouncementList.createtime}}</span>
                        </div>
                        <div class="subtitle">{{AnnouncementList.abstract==null || !AnnouncementList.abstract ?"无内容":AnnouncementList.abstract }}</div>
                        <span class="tab">公告</span>
                        <div class="line"></div>
                        </div>
                    </div> 
                </el-col>
            </el-row>
        </div>
        <!-- 公司概况 -->
        <div class="companySurvy">
            <span class="title">公司概况</span>
            <span class="engTitle">Company summary</span>
            <span class="border"></span>
            <div class="content">中药创建于2005年，前期投资3000万，占地面积28余亩，标准化生产车间及辅助用房建筑面积1000平方米。展望未来，公司承载重任，以“承中药之文化，扬国药之精髓，铸人类之健康”为使命，以“百亿中药”为目标，继续致力于现代中药、中药饮片与配方颗粒、中医药健康产业等板块的发展。 中药创建于2005年，前期投资3000万，占地面积28余亩，标准化生产车间及辅助用房建筑面积1000平方米。展望未来，公司承载重任，以“承中药之文化，扬国药之精髓。</div>
            <div class="bigImgBox">
                <img src="~@/assets/img/homePage_body1.png" alt="">
                <img src="~@/assets/img/homePage_body2.png" alt="">
                <img src="~@/assets/img/homePage_body3.png" alt="">
            </div>
        </div>
        <div class="productShow">
            <span class="title">产品展示</span>
             <span class="engTitle">product display</span>
             <span class="border"></span>
             <div class="contentBox">
                 <div class="productImg"><img :src="product.img" alt=""></div>
                 <div class="bottomImg"></div>
                 <div class="detail">
                     <div class="subtitle">{{product.subtitle}}</div>
                     <div v-html="product.detail"></div>
                 </div>
             </div>
        </div>
         <!-- 产品展示-->
        <div id="bigData" class="container-fuild" style="margin-top:100px">
            <div class="bigData-container" style="width:78%;">
                <div class="row product" style="margin:0 auto;padding-left:7%">
                    <!-- 遍历这个item组件 -->
                        <div v-for="(item,index) in GoodsList" :key="index" class="imgBox col-xs-6 col-sm-6 col-md-4">
                            <img :src=item.picUrl alt="产品展示" @click="showGoodsDetail(item.id)"/>
                            <div style="text-align: center;font-size:25px;color: #333333;margin-top:8px">{{item.name}}</div>
                        </div>
                </div>    
            </div>
        </div>
        <!-- 地图 -->
        <div id="map" class="wow zoomIn" style="display:block;height:211px;width:100%;margin-top:100px;"></div>
        <!-- 技术实力 -->
        <div class="technology">
            <span class="title">技术实力</span>
             <span class="engTitle">technology strength</span>
             <span class="border"></span>
             <div class="row" style="width:100%;margin-top:66px;">
                <div  v-for="(item,index) in TechnologyList" :key="index" class="col-xs-12 col-sm-12 col-md-6" v-cloak>
                    <home-page-card class="card"  :technology-item="item" @PraiseSuccess="praiseSuccessHandler"/>
                </div>
            </div>
        </div> 
        <div class="newsBox">
            <el-row :gutter="24">
                <el-col :span="24" >
                    <div class="newCard"  :body-style="{ padding: '30px' }" v-for="(item,index) in InformationList"  :key="index" @click="showInfoDeail(item.id)">
                        <div class="innerBox">
                            <div class="topBox">
                            <span class="title">{{item.title}}</span>
                            <span class="time">{{item.createtime}}</span>
                        </div>
                        <div class="subtitle">{{item.abstract=="" ||item.abstract==null ?"无内容":item.abstract }}</div>
                        <span class="tab">新闻</span>
                        <div class="line"></div>
                        </div>
                    </div>
                    
                </el-col>
            </el-row>
        </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import { WOW } from "wowjs";
import BMap from "BMap";
import homePageCard from "./homePage/component/homePageCard"
import leftNav from './homePage/common/leftNav.vue';
import goodsDetails from "./homePage/goodsDetails.vue"
import announcementDetail from './homePage/announcementDetail.vue'
import {getActiveAdd,getInformationList,getGoodsList,getGoodsDetail,getTechnologyList,getTechnologyClassList,getAnnouncementList} from "@/api/api.js"
import HomePageCard from './homePage/component/homePageCard.vue';

export default {
    name: "HomePage",
    components:{
        homePageCard,
        leftNav,
        goodsDetails,
        HomePageCard
    },
    data() {
        return {
            //banner轮播图
            bannerList:[],
            //产品展示第一个图 和 一段简介
            product:{
                img:"",
                subtitle:"",
                detail:""
            },
            //新闻动态
            InformationList:[],
            //公告列表
            AnnouncementList:{},
            //显示新闻 0 or 公告 1
            showContentFlag:0,
            //产品展示
            GoodsList:[],
            //技术实力(双向绑定 重新赋值 实现数据点击刷新)
            TechnologyList:[],
            //记录左侧导航栏当前点击的下标
            currentNavIndex:0,
            // 首页 左侧导航栏 数据
            dataList:[]  
        };
    },
    created(){
        // 获取轮播图
        getActiveAdd(1).then(res=>{
            // debugger;
            this.bannerList=res.data
        })
        //获取新闻列表
        getInformationList().then(res=>{
            for(var i=0;i<4;i++){
              this.InformationList.push(res.data.items[i]);
            }
        })
        //获取公告列表
        this.getAnnouncementList();
        //获取产品列表  展示3个
        getGoodsList().then(res=>{
            //取第一个产品图片 和 简介 展示
            var firstProduct=res.data.items[0];
            this.product.img=firstProduct.picUrl;
            this.product.subtitle=firstProduct.subtitle;
            getGoodsDetail(res.data.items[0].id).then(res=>{
                this.product.detail=res.data.detail;
            });
            //取三个产品展示
            for(var i=0;i<3;i++){
                this.GoodsList.push(res.data.items[i]);
            }
        })
        //获取技术实力列表 classid为第一个导航栏index
        this.getTechnologyLists(0);
        //获得技术实力类目列表
        this.getTechnologyClassList();

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
                disableOnInteraction: false
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
        var point = new BMap.Point(105.892929, 26.22883); // 创建点坐标
        map.centerAndZoom(point, 14); // 初始化地图，设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        var marker = new BMap.Marker(point); // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中
        var infoWindow = new BMap.InfoWindow(
            "公司地址: 贵州省安顺经济技术开发区双新路42号"
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
                            detailsData:res.data
                        }
                    },
                    area:['80%','550px'],
                    title: '产品详情',
                    shade: true,//是否显示遮罩
                    shadeClose: false,//点击遮罩是否关闭
                    cancel:()=>{
                     
                      }
                      });
            })
        },
        //技术实力 列表 默认展示2个
        getTechnologyLists(classId){
            getTechnologyList(classId).then(res=>{
                for(var i=0;i<2;i++){
                    this.TechnologyList.push(res.data.items[i]);
                }
            })
        },
        //技术实力类目列表
        getTechnologyClassList(){
            getTechnologyClassList().then(res=>{
                this.dataList=res.data.list
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
        //查看公告详情
        showNoticeDetail(item){
            this.$layer.iframe({
                 content: {
                     content: announcementDetail,
                     parent: this,
                     data:{
                         detailData:item.detail
                     }
                 },
                 area:['80%','550px'],
                 title: '公告详情',
                 shade: true,//是否显示遮罩
                 shadeClose: false,//点击遮罩是否关闭
                 cancel:()=>{
                     
                 }
            });

        },
        //查看新闻详情----新闻id
        showInfoDeail(informationId){
           this.router.push({
              path:"/infoDetail",
              name:"infoDetail",
          });
          localStorage.setItem("informationId",informationId);
        },
        //公告列表
        getAnnouncementList(){
            getAnnouncementList().then(res=>{
                debugger;
                this.AnnouncementList=res.data[0]
            });
        },
       
    }
};
</script>
<style scoped>
/* 整体盒子 */

#HomePage {
    width: 100%;
}

/* 轮播图 箭头 */
.arrow{
    background-color: rgba(59, 34, 34,0.5);
    height: 80px;
    width: 80px;
    border-radius: 16px;
}
.swiper-button-prev, .swiper-container-rtl .swiper-button-next{
    background-image: url("~@/assets/img/leftArrow.png");
    background-size: 40px 40px ;
}
.swiper-button-next, .swiper-container-rtl .swiper-button-prev{
    background-image: url("~@/assets/img/rightArrow.png");
    background-size: 40px 40px ;
}


 /*  公司概况  */
#HomePage .companySurvy{
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
}

 #HomePage .companySurvy .title{
    margin-left: 45%;
    font-size: 40px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #DA0A16;
    line-height: 56px;

}
#HomePage .companySurvy .engTitle{
    display: block;
    margin-left: 41.5%;        
    font-size: 32px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: #999999;
    line-height: 45px;

}
#HomePage .companySurvy .border{
    display: block;
    margin-top: 32px;
    margin-left: 47%;
    width: 106px;
    height: 1px;
    background-color: #ccc;

}
#HomePage .companySurvy .content{
    margin: 52px 10% 2% 10%;
    font-size: 25px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: #666666;
    line-height: 48px;
}

#HomePage .companySurvy .bigImgBox{
    width: 100%;
    height: 30%;
    display: flex;
}
#HomePage .companySurvy .bigImgBox img{
    width: 33.33333%;
}

/* 产品展示 */
#HomePage .productShow{
    margin-top: 100px;

}

#HomePage .productShow .title{
    margin-left: 45%;
    font-size: 40px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #DA0A16;
    line-height: 56px;

}
 #HomePage .productShow  .engTitle{
    display: block;
    margin-left: 43.5%;        
    font-size: 32px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: #999999;
    line-height: 45px;

}
#HomePage .productShow .border{
    display: block;
    margin-top: 32px;
    margin-left: 47%;
    width: 106px;
    height: 1px;
    background-color: #ccc;
}
#HomePage .productShow .contentBox{
    position: relative;
    margin-top: 208px;
    width: 100%;
}
#HomePage .productShow .contentBox .productImg{
    position: absolute;
    width: 36%;
    height: 426px;
    left: 10%;
    top: -20%;
   
}
#HomePage .productShow .contentBox .productImg img{
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 10px;
}




#HomePage .productShow .contentBox .bottomImg{
    background: #C0A379;
    width:43%;
    height: 408px;
    margin-left: 28%;
    border-radius: 10px;
}
#HomePage .productShow .contentBox  .detail{
    position: absolute;
    background-color: #fff;
    padding: 44px 0px 152px 69px;
    width: 43%;
    height: 408px;
    left: 51%;
    top: 13%;
    border-radius: 10px;
}
#HomePage .productShow .contentBox  .detail .subtitle{
    font-size: 20px;
    margin-bottom: 20px;
}
/* 技术实力 */
#HomePage  .technology{
    margin-top: 100px;
    margin-bottom: 128px;

}
#HomePage  .technology .title{
    margin-left: 45%;
    font-size: 40px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #DA0A16;
    line-height: 56px;

}
#HomePage  .technology .engTitle{
    display: block;
    margin-left: 41.5%;        
    font-size: 32px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: #999999;
    line-height: 45px;

}
#HomePage  .technology .border{
    display: block;
    margin-top: 32px;
    margin-left: 47%;
    width: 106px;
    height: 1px;
    background-color: #ccc;
}

#HomePage .product .imgBox {
    width: 30%;
    height: 400px;
    margin-top: 9px;
    padding-top: 38px;
    margin-right: 28px;
    margin-top: 20px;
    border-radius: 10px;
    overflow: hidden;
}
#HomePage .product .imgBox:hover{
    box-shadow: 0 0 10px #ccc;
    opacity: 0.8;
}

#HomePage .product .imgBox img:hover{
    transition: all 0.5s;
    transform: scale(1.04); 
}

#HomePage .product .imgBox img {
    display: inline-block;
    width: 100%;
    height: 80%;
    border-radius: 10px;
}
/* 技术实例 */
.card{
    width:75%;
    height:674px;
    border-radius: 5px;
    margin: 0 auto;
    padding: 30px;
    
}
.card:hover{
    box-shadow: 0 0 10px #ccc;
    opacity: 0.8;
}

/* 轮播图 */

#swiper {
    height: 540px;
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

#swiper .swiper-pagination-bullet-active{
        opacity: 1;
    background: #03f568 !important;
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
.swiper-button-prev, .swiper-button-next{
    color: #fff;
    /* background: #5e5f5e; */
}
.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{
   width: 0.4rem;
   height: 0.3rem;
   border-radius: 50%;
}
/* 新闻 */
.newsBox{
    width: 100%;
    padding-left: 6%;
    padding-right: 6%;
    margin: 0 auto;
    margin-top: 2%;
    margin-bottom: 2%;
}
.newsBox .newCard{
    height:175px;
    border-radius: 5px;
    padding-top: 2%;
    padding-left: 2%;
    padding-right: 4%;   
}
.newsBox .newCard .innerBox{
    border-bottom: 1px solid #ccc;
    height: 100%;
}
.newsBox .newCard:hover{
    box-shadow: 0 0 20px #ccc;
    opacity: 0.8;
}
.newsBox .topBox{
    width: 100%;

}
.newsBox .topBox .title{
    font-size: 16px;
    font-weight: 400;
    color: #333;
    line-height: 24px;
}
.newsBox .topBox .time{
    float: right;
    font-size: 14px;
    color: #999;
    line-height: 24px;
}
.newsBox .subtitle{
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    word-break: break-word;
    word-wrap: break-word;
    white-space: normal;
    margin-top: 24px;

}
.newsBox .tab{
    display: inline-block;
    position: relative;
    height: 26px;
    line-height: 26px;
    max-width: 100%;
    padding: 0 8px;
    border: 1px solid #e5e5e5;
    margin-top: 24px;
    margin-right: 15px;
    border-radius: 5px;
    color: #999;
    font-size: 12px;
    word-break: keep-all;
    overflow: hidden;
    z-index: 2;
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
#bodyBox{
        width:100% !important;
        overflow: hidden;
    }

#bigData {
    /* padding: 100px; */
    transition: all ease 0.6s;
    box-sizing: border-box;
    width: 100%;
}
.bigData-container{
    
    margin: 30px auto 30px auto;
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

/* 新闻动态 */
.newItem:hover{
    background-color: #f4f4f4;
}




/* 媒体查询（手机） */
@media screen and (max-width: 768px) {
    #bodyBox{
        width:100% !important;
        overflow: hidden;
    }
    .survey{
        margin-top: 30px;
        margin-bottom: 30px;
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


    #HomePage .productShow .contentBox .productImg{
       position: absolute;
        width: 43%;
        height: 406px;
        left: 5%;
        top: -20%;
    
    }

    #HomePage .product .imgBox[data-v-4eb70d62] {
        width: 58%;
        height: 400px;
        padding-top: 38px;
        margin-left: 40px;
        margin-top: 20px;
        border-radius: 10px;
        overflow: hidden;
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

