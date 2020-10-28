<template>
  <div id="footer" style="height:229px;background:#444444; overflow:hidden;">
    <div style="margin:30px ;display:flex;width:100%;">
      <!-- 左盒子 -->
      <div style="flex:1;margin-left:250px;" class="leftBox">
        <div style="color:#FFFFFF;opacity: 0.8;" class="name">关于宝林</div>
        <span style="display:flex;margin-top:30px;">
          <router-link to="/software" tag="span" style="flex:1;color:#FFFFFF;cursor:default;opacity: 0.8;" >企业概况</router-link>
          <router-link to="/newsinformation" tag="span" style="flex:1;color:#FFFFFF;cursor:default;opacity: 0.8;">产品展示</router-link>
          <router-link to="/service" tag="span" style="flex:1;color:#FFFFFF;cursor:default;opacity: 0.8;">技术实力</router-link>
          <router-link to="/contactus" tag="span" style="flex:1;color:#FFFFFF;cursor:default;opacity: 0.8;">联系我们</router-link>
        </span>
      </div>
      <!-- 右盒子 -->
      <div style="flex:1;display:flex;" class="rightBox">
          <div style="text-align:center;color:#ffffff;margin-top:12px;font-size:32px; border-right: 1px solid #ffffff;line-height:68px;padding-right:40px;opacity: 0.8;">宝林中药饮片</div>
          <div style="margin-left:40px;margin-top:15px">
            <p style="color:#FFFFFF;  opacity: 0.8;">安顺市宝林科技中药饮片有限公司</p>
            <p style="color:#FFFFFF;  opacity: 0.8;">0851-33770666</p>
            <p style="color:#FFFFFF; opacity: 0.8;">贵州省安顺经济技术开发区双新路42号</p>
          </div>
      </div> 
    </div>
    <!-- 下面盒子 -->
    <div style="border-top:1px solid #616161;margin-top:20px;width:70%;margin:0 auto;">
      <p style="margin-top:12px" class="support">本站由 贵州玛峰科技有限公司提供技术支持 联系电话: 17138518551</p>
      <p  class="support">© 2020~2030 安顺市宝林中药饮片科技有限公司 | 京ICP备12031756号 | 京ICP证150143号 | 京公网安备11010502036099号</p>
    </div>
       
  </div>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {};
  }
};
</script>
<style  scoped>
  .support{
    color: #ffffff;
    font-size: 12px;
    opacity: 0.4;
    text-align: center;
  }
  @media screen and (max-width: 768px) {
    .leftBox{
      margin-left: 20px !important;
    }
   

    .rightBox{
      width: 50%;
    }

  }
</style>

