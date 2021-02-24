<template>
    <div class="root">
        <div class="imgBox">
            <img :src="TechnologyItem.picUrl" alt="" >
            <div v-if="TechnologyItem.conventionType==1" class="convention" @click="conventionHandle(TechnologyItem.id)">预约到店</div>
        </div>
        <div class="textBox">
            <div class="title">{{TechnologyItem.name}}</div>
            <div class="title2">{{TechnologyItem.subtitle}}</div>
            <div class="title3">
                <span class="tab"><span class="numInner">基地测量</span></span>
                <span class="num" @click="showAppointment">→</span>
            </div>
        </div>
    </div>
</template>
<script>
import dateFormat from "../../utils/dateTimeUtls/dateFormat.js"
import appointment from "../../service/component/appointment.vue"
import {updateTechnologyPraise}  from "@/api/api.js"
export default {
    name: 'home-page-card',
    components:{
        appointment
    },
    created(){
      
    },
    data(){
        return{
           now:""
        }
    },
    mounted() {    //页面挂载
       var currentTimeStr=new Date();
        this.now=dateFormat("YYYY-mm-dd", currentTimeStr);
        console.log(currentTimeStr)
    },
    methods:{
        //点赞和取消点赞(点了之后刷一遍数据)
        PraiseHandler(technologyId){
            updateTechnologyPraise(technologyId).then(res=>{
                if(res.code==200){
                    this.$emit("PraiseSuccess",res.status);
                }
            }).catch(err=>{

            })
        },
        //显示技术详情
        showAppointment(){
               this.router.push("/technologydetail");
               localStorage.setItem("technologyId",this.TechnologyItem.id);
        },
        //预约处理
        conventionHandle(id){
            this.$layer.iframe({
                 content: {
                     content: appointment,
                     parent: this,
                     data:{
                     }
                 },
                 area:['90%','701px'],
                 title: '预约',
                 cancel:()=>{
                     
                 }
                 });
        }
    },
    props:{
        TechnologyItem:{
            type:Object,
            default(){
                return {};
            }
        }
    }
}
</script>
<style scoped>
.root:hover .imgBox img{
    transition: all 0.8s;
    transform: scale(1.08);
  
}
.root:hover .imgBox .convention{
    transition: all 0.8s;
    transform: scale(1.1);
}

.imgBox{
    width: 100%;
    position: relative;
    margin: 0 auto;
}
/* 预约 */
.convention{
    text-align: center;
    position: absolute;
    bottom: 0px;
    opacity: 0.53;
    color: #ffffff;
    font-size: 16px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 42px;
    background: #000000;
    width: 100%;
    height: 46px;
}

.imgBox img{
    display: block;
    width: 100%;
    height: 430px;
    border-radius: 8px 8px 0px 0px;
    margin: 0 auto;
}


.textBox{
    width: 100%;
    height: 129px;
    border-radius:  0px 0px 8px 8px;
    margin-top: 32px;
}
.textBox .title{
    padding: 10px 23px 13px 0px;
    font-size: 25px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #333333;
    line-height: 36px;
}

.numInner{
    margin-top: 5px;
    padding: 2px;
    border-radius: 4px;
    border: 1px solid #CCCCCC;
    height: 10px;
}

.title2{  
    font-size: 16px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: #666666;
    line-height: 22px;
}
.title3{
    /* padding-left: 10px;
    padding-top: 13px; */
    display: flex;
    /* justify-content: space-between; */
    color:#999999;
}
.tab{
     display: inline-block;
     width:90px;
     height:50px;
     padding-top: 10px;
     overflow: hidden;
     color:#999999;
}
.title3 span{
    flex: 1;
}
.title3 span:nth-child(2){
    text-align: right;
}
.num{
    padding-right: 10px;
    cursor: pointer;
    font-size: 30px;
}


</style>

