<template>
  <div id="footer" style="height:230px;background:#444444; overflow:hidden;">
    <div style="margin-top:30px;display:flex;width:100%;">
      <!-- 左盒子 -->
      <div style="flex:1;margin-left:250px;" class="leftBox">
        <div style="color:#FFFFFF;" class="name">关于宝林</div>
        <span style="display:flex;margin-top:30px;">
          <router-link to="/software" tag="span" style="flex:1;color:#FFFFFF;cursor:default;" >企业概况</router-link>
          <router-link to="/newsinformation" tag="span" style="flex:1;color:#FFFFFF;cursor:default;">产品展示</router-link>
          <router-link to="/service" tag="span" style="flex:1;color:#FFFFFF;cursor:default;">技术实力</router-link>
          <router-link to="/contactus" tag="span" style="flex:1;color:#FFFFFF;cursor:default;">联系我们</router-link>
        </span>
      </div>
      <!-- 右盒子 -->
      <div style="flex:1;display:flex;" class="rightBox">
          <div style="text-align:center;color:#ffffff;margin-top:12px;font-size:32px; border-right: 1px solid #ffffff;line-height:68px;padding-right:40px">宝林中药饮片</div>
          <div style="margin-left:40px;margin-top:15px">
            <p style="color:#FFFFFF">安顺市宝林中药饮片科技有限公司</p>
            <p style="color:#FFFFFF">电话:01992-89328-2321</p>
            <p style="color:#FFFFFF">地址:安顺市经济开发区1号基地园</p>
          </div>
      </div> 
    </div>
    <p style="text-align: center;color:#ffffff">本站由 贵州玛峰科技有限公司提供技术支持 联系电话: 17138518551</p>
    <p style="text-align: center;color:#ffffff">© 2020~2030 安顺市宝林中药饮片科技有限公司 | 京ICP备12031756号 | 京ICP证150143号 | 京公网安备11010502036099号</p>
        
       
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
  @media screen and (max-width: 768px) {
    .leftBox{
      margin-left: 20px !important;
    }
   

    .rightBox{
      width: 50%;
    }

  }
</style>

