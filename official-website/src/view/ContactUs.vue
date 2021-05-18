<template>
  <div id="ContactUs">
    <div style="width:100%;height:400px;margin-bottom:30px" class="container-fuild">
      <a :href="bannerList.link">
        <img style="display:block;height:100%;width:100%" :src="bannerList.bannerUrl" alt="">
      </a>
    </div>
    <div class="container" >
      <div class="container-fuild ContactUs-container ">
          <span class="bodyTitle">联系我们</span>
          <div class="row" style="border-top:1px solid #E4E4E4;padding-top:11px;margin-top:7px;width:100%;">
            <!-- 左边 -->
            <div class="col-xs-12 col-sm-12 col-md-4" style="margin-top:67px;margin-bottom:90px;line-height:20px">
              <p style="color:#444444;font-size:16px;">联系方式</p>
              <p style="color:#888888;font-size:14px;margin-top:30px">电子邮箱: 492955044@qq.com</p>
              <p style="color:#888888;font-size:14px">服务热线: 0851-33770666</p>
              <p style="color:#888888;font-size:14px">公司传真: 0851-33732666</p>
            </div>
            <!-- 中间 -->
            <div class="col-xs-12 col-sm-12 col-md-4" style="margin-top:67px;">
              <p>公司地址</p>
              <p style="color:#888888;font-size:14px;margin-top:30px;">贵州省安顺经济技术开发区双新路42号<br/><br/>安顺市宝林科技中药饮片有限公司</p>
            </div>
           <!-- 右边 -->
           <div class="col-xs-12 col-sm-12 col-md-4" style="margin-top:67px;">
             <img src="@/assets/img/qrCode.png" alt="" style="display:block;width:95%;height:50%;">
           </div>
          </div>
      </div>
      <div style="margin-bottom:40px;">
            <div id="map" class=" "></div>
      </div>


    </div>

  </div>
</template>
<script>
import { WOW } from 'wowjs'
import BMap from "BMap";
import {getActiveAdd} from "@/api/api.js"
export default {
  name: "ContactUs",
  created(){
    // 获取轮播图
        getActiveAdd(5).then(res=>{
            this.bannerList=res.data[0]
            console.log(res.data[0])
        }).catch(err=>{
            console.log(err)
        })
  },
  data() {
    return {
          //banner
            bannerList:{}
    };
  },
  mounted() {
    var map = new BMap.Map("map"); // 创建地图实例
    var point = new BMap.Point(105.892929,26.22883); // 创建点坐标
    map.centerAndZoom(point, 18); // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    var marker = new BMap.Marker(point); // 创建标注
    map.addOverlay(marker); // 将标注添加到地图中
    var opts = {
      width: 50, // 信息窗口宽度
      height: 10, // 信息窗口高度
      title: "联系我们" // 信息窗口标题
    };
    var infoWindow = new BMap.InfoWindow(
      // "",
      opts
    ); // 创建信息窗口对象
    map.openInfoWindow(infoWindow, map.getCenter()); // 打开信息窗口
    var wow = new WOW();
    wow.init();
  }
};
</script>
<style scoped>
.banner {
  color: #fff;
  font-size: 30px;
  height: 600px;
  background-image: url("../assets/img/situation1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: scroll;
  background-position: center center;
}
.ContactUs-container {
  margin-top: 30px;
  padding: 80px 0;
  transition: all ease 0.5s;
  box-sizing: border-box;
  width: 1202px;
}
#map {
  width: 100%;
  height: 365px;
}
.row {
  margin-right: 0;
  margin-left: 0;
}


.bodyTitle {
    color: #DA0A15;
    border-bottom: 2px solid #DA0A15;
    padding-bottom: 1px;
    font-size: 16px;
    line-height: 22px;
    padding-bottom: 8px;
}


/* 平板媒体查询 */
@media screen and (min-width: 768px) and (max-width: 996px) {
  /* 地图 */
  #map{
    width: 769px !important;
  }
  .contentBox{
    width:768px !important;
  }
  .container{
    margin-top: 100px;
  }

  .ContactUs-container {
    padding: 20px 0;
  }
}
/* 手机 */
@media screen and (max-width: 768px) {
  .ContactUs-container{
    width: 100% !important;
  }
  #map{
    width: 100%;
  }
}

</style>

