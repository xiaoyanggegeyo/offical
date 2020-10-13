<template>
    <div class="container goodDetail">
        <div style="" class="row">
            <!-- 主图 -->
            <div style="width:450px;height:450px;margin-right:50px;margin-top:10px" class="col-xs-12 col-sm-12 col-md-6">
                <img :src="detailsData.picUrl" alt="">
            </div>
            <!-- 富文本 -->
            <div class="col-xs-12 col-sm-12 col-md-6">
                <div class="name">{{detailsData.name}}</div>
                <div v-html="detailsData.detail" class="detail"></div>
            </div>
        </div>
        <!-- 图片列表 -->
        <div class="bottomBox row">
            <div class="col-xs-12 col-sm-12 col-md-12 imgBox" v-for="(item,index) in 6" :key="index">
                <!-- <img src="@/assets/img/service2.jpg" alt=""> -->
                <!-- <div>{{detailsData.detailUrl}}</div> -->
            </div>
        </div>
    </div>
    
</template>
<script>
export default {
    name: "goodsDetails",
    components:{
        
    },
    data() {
        return{

        }

    },
    props:{
        detailsData:{
            type:Object,
            default(){
                return {}
            }

        }
    }
}
</script>
<style  scoped>
.goodDetail{
    width: 100%;
}
.name{
    margin-top: 44px;
    width: 80%;
    height: 25px;
    font-size: 18px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #444444;
    line-height: 25px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 40px;
}
.bottomBox{
    width: 80%;
    margin: 30px 59px 50px 59px;
    display: flex;

}
.imgBox{
    width: 140px;
    height: 140px;
    margin-right: 27px;
}
.imgBox img{
    display: inline-block;
    width: 100%;
    height: 100%;
}
.detail{
    height: 350px;
    overflow: hidden;

}

/* 媒体查询（手机） */
@media screen and (max-width: 768px) {
    .name{
        width: 400px;
    }
    .detail{
        width: 400px;
    }
}
   
</style>