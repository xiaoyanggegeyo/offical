<template>
    <div id="HomePage">
        <!-- 轮播图 -->
        <div style="width:100%;height:400px;margin-bottom:30px" class="container-fuild">
            <a :href="bannerList.link">
                <img style="display:block;height:100%;width:100%" :src="bannerList.bannerUrl" alt="">
            </a>
        </div> 
        <div style="width:1202px;margin:auto;">
            <div id="bigData" style="padding-top:0px;width:100%;" class="container-fuild">
                <div class="row bigData-container" style="width:1202px;">
                    <span class="bodyTitle">产品展示</span>
                    <div style="border-top:1px solid #E4E4E4;margin-top:7px;" class="contentBox">              
                      <el-row  class="tac" style="margin-top:19px;">
                          <leftNav :data-list="dataList" @currentNavMenu="currentNavMenu"/>
                          <el-col  style="margin-left:21px;margin-top:-82px;width:1032px">
                              <div class="row cardBox" style="width:100%">
                                   <div  v-for="(item,index) in TechnologyList" :key="index" class="col-xs-12 col-sm-12 col-md-4">
                                            <div class="CardimgBox" @click="showGoodsDetail(item.id)">
                                                <img   :src="item.picUrl" alt="">
                                                <div class="title">{{item.name}}</div>
                                            </div>
                                            <div class="CardtextBox">
                                                
                                            </div>
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
import leftNav from './homePage/common/leftNav.vue';
import {getActiveAdd,getGoodsList,getGoodsDetail,getGoodsClassList} from "@/api/api.js"
import goodsDetails from "./homePage/goodsDetails.vue"
export default {
    name: "newsinformation",
    components:{
        leftNav,
        goodsDetails
    },
    created(){
        // 获取轮播图
        getActiveAdd(2).then(res=>{
            this.bannerList=res.data[0]
        })
          //左侧导航栏
        this.getGoodsClassList();    
    },
    data() {
        return {
            //轮播图(单张)
            bannerList:{},
            //技术实力
            TechnologyList:[],
            //首页 左侧导航栏 数据
            dataList:[]
        };
    },
    mounted() {
        /* banner-swiper */
        new Swiper(".banner-swiper", {
            loop: true, // 循环模式选项
            effect: "fade",
            //自动播放
            autoplay: {
                delay: 3000,
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
    },
    methods:{
        //获取左侧导航栏列表
        getGoodsClassList(){
            let that=this;
            getGoodsClassList().then(res=>{
                this.dataList=res.data.list;
                //获取第一个classid 渲染列表
                if(res.data.list.size !=0){
                    that.getGoodsList(res.data.list[0].id);
                }
            })
        },
        //技术实力 列表
        getGoodsList(classId){
            getGoodsList(classId).then(res=>{
                this.TechnologyList=res.data.items
            })
        },
        //左侧导航栏 当前点击的条目下标(classid)
        currentNavMenu(index){
            this.getGoodsList(index);
        },
        //显示商品详情
         showGoodsDetail(goodsId){
            getGoodsDetail(goodsId).then(res=>{
                if(!res.data){
                    this.$message("没有详情数据!");
                    return;
                }
                //开启弹窗 传递数据
                this.$layer.iframe({
                            content: {
                                content: goodsDetails,
                                parent: this,
                                data:{
                                    detailsData:res.data
                                }
                            },
                            area:['70%','620px'],
                            title: '产品详情',
                            cancel:()=>{
                                
                            }
                            });
            })
        }
    }
};
</script>
<style scoped>
/* 整体盒子 */

#HomePage {
    width: 100%;
    overflow: hidden;
}

/* 轮播图 */

#swiper {
    height: 450px;
}



/* 标题文字 */

.bodyTitle {
    color: #DA0A15;
    border-bottom: 2px solid #DA0A15;
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
/* 卡片区域 */
.cardBox{
    margin: 83px 49px 66px 32px; 
}
.card{
    width:300px;
    height:300px;
    margin: 0px 49px 66px 32px;
}

.CardimgBox{
    width: 300px;
    height: 300px;
    padding-right: 0px;
    overflow: hidden;
   
}

.CardimgBox .title{
        text-align: center;
        margin-top: 14px;
        font-size: 17px;
        font-weight: bold;
}

.CardimgBox:hover img{
    transition: all 0.5s;
    transform: scale(1.04); 
}


.CardimgBox:hover{
    box-shadow: 0 0 10px #ccc;
    opacity: 0.8;
    border-radius: 10px;
    border:1px solid red
    
}




.CardimgBox img{
    display: block;
    width: 100%;
    height: 85%;
}
.CardtextBox{
    width: 300px;
    margin-top: 14px;
    text-align: center;
    color: #444444;
    font-size: 16px;   
    font-family: PingFang-SC-Regular, PingFang-SC;
    line-height: 22px;
}


/* 媒体查询（手机） */

@media screen and(min-width:360px)  and (max-width: 768px) {
  
    .CardtextBox{
        text-align: left;
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
}

/* 媒体查询（平板） */

@media screen and (min-width: 768px) and (max-width: 996px) {
    #bigData {
        margin-top: 150px;
        padding: 60px;
    }
    .CardtextBox{
        margin-top: 0px;
        margin-bottom: 20px;
        margin-left: 110px;
    }
    .title{
        text-align: left;
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

