<template>
    <div id="HomePage">
        <!-- 轮播图 单张显示-->
        <div style="width:100%;height:400px;margin-bottom:30px" class="container-fuild">
            <a :href="bannerList.link">
                <img style="display:block;height:100%;width:100%" :src="bannerList.bannerUrl" alt="">
            </a>
        </div>    
            <!-- 技术实力 -->
            <div id="bigData" style="padding-top:0px;width:100%;" class="container-fuild">
                <div class="row bigData-container" style="width:1200px;margin:0 auto;overflow:hidden">
                    <span class="bodyTitle">企业概况</span>
                    <div style="border-top:1px solid #E4E4E4;margin-top:7px;">              
                      <el-row  class="tac">
                           <!-- 导航组件 -->
                          <el-col style="width:140px;margin-top:41px;">
                             <left-nav :data-list="dataList" @currentNavMenu="currentNavMenu"/>
                          </el-col>
                          <!-- 右侧内容区域 -->
                          <el-col class="leftBox" style="margin-left:32px;margin-top:64px;width:80%;">
                              <!-- 公司简介 -->
                              <div  class="row textBox" style="width:100%;">
                                  <div class="content" v-html="contentHtml"></div>
                              </div>
                          </el-col>
                      </el-row>          
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
import leftNav from "./homePage/common/leftNav.vue"
import {getActiveAdd,getCompanyList} from "@/api/api.js"
export default {
    name: "software",
    components:{
        Card,
        leftNav
    },
    created(){
         // 获取轮播图
        getActiveAdd(4).then(res=>{
            this.bannerList=res.data[0]
        }).catch(err=>{
        })
        //企业简介
        getCompanyList().then(res=>{
            //左侧导航栏
            this.dataList=res.data.list
            //右侧内容 默认显示第一篇文章
            this.contentHtml=res.data.list[0].detail  
        })
    },
    data() {
        return {
            //轮播图(单张)
            bannerList:{},
            // 左侧导航栏+文章内容数据
            dataList:[],
            //当前显示的右侧页面
            contentHtml:''
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
        /* customer-swiper */
        new Swiper(".customer-swiper", {
            loop: true, // 循环模式选项
            slidesPerView: 3,
            //自动播放
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
            },
            // 如果需要前进后退按钮
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
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
        },
        methods:{
            currentNavMenu(index){
                //点击哪个就显示哪个文章
                this.dataList.forEach(item=>{
                    if(index==item.id){
                        this.contentHtml=item.detail;
                    }
                })
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


.textBox .img_wrapper img{
        display: block;
        width: 100% !important;
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
    overflow: hidden;
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
    .leftBox{
        width: 45% !important;
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
}

/* 媒体查询（平板） */

@media screen and (min-width: 768px) and (max-width: 996px) {
     .leftBox img{
        width: 100% !important;
    }
    #swiper {
        height: 400px;
    }
    #bigData {
        padding: 60px;
        margin-top: 150px;
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

