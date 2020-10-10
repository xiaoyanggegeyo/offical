<template>
  <div id="app" style="height:100%">
    <Header></Header>
    <router-view/>
    <Footer class="footer"></Footer>
    <GoTop></GoTop>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
        //当前屏幕宽
        var phoneWidth = parseInt(window.screen.width);
        var phoneScale = phoneWidth/750;
        var ua = navigator.userAgent;

    if (/Android (\d+\.\d+)/.test(ua)){
      var version = parseFloat(RegExp.$1);
      // andriod 2.3
      if(version>2.3){
        document.write('<meta name="viewport" content="width=750, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi">');
      // andriod 2.3以上
      }else{
        document.write('<meta name="viewport" content="width=750, target-densitydpi=device-dpi">');
      }
      // 其他系统
    } else {
              document.write('<meta name="viewport" content="width=750, user-scalable=no, target-densitydpi=device-dpi">');
          }
  }
}
</script>

<style scoped>
/* 电脑 */
@media screen and(min-width: 996px) {
   #footer{
   position: static;
   width: 100%;
   left: 0px;
   bottom: 0px;
 }
  
}



/* 平板 */
 @media screen and (min-width: 768px) and (max-width: 996px) {
   #footer{
    position: absolute;
    left: 0px;
    bottom: 0px;
  }
 }
 /* 媒体查询（手机） */
@media screen and (max-width: 768px) and(min-width:300px) {
  #footer{
    position: absolute;
    right: 0px;
    left: 0px;
    bottom: 0px;
  }

}
</style>
