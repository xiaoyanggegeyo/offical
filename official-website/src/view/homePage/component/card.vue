<template>
    <div>
        <div class="imgBox">
            <img :src="TechnologyItem.picUrl" alt="" @click="showAppointment">
        </div>
        <div class="textBox">
            <div class="title">{{TechnologyItem.name}}</div>
            <div class="title2">{{TechnologyItem.subtitle}}</div>
            <div class="title3">
                <div style=" display: inline-block;width:90px;height:20px;overflow:hidden;color:#999999;">{{TechnologyItem.createtime}}</div>
                <span class="num">{{TechnologyItem.praiseNum}} <i class="icon iconfont" :class="TechnologyItem.praiseStatus==1?'active':''" @click="PraiseHandler(TechnologyItem.id)"></i></span>
            </div>
        </div>
        
    </div>
</template>
<script>
import { WOW } from "wowjs";
import dateFormat from "../../utils/dateTimeUtls/dateFormat.js"
import appointment from "../../service/component/appointment.vue"
import {updateTechnologyPraise}  from "@/api/api.js"
export default {
    name: 'Software',
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
.imgBox{
    width: 324px;
    height: 183px;
    padding-right: 0px;
   
}
.imgBox img{
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 8px 8px 0px 0px;
   
}
.textBox{
    width: 100%;
    height: 129px;
    background: #F1F1F1;
    border-radius:  0px 0px 8px 8px;
}
.textBox .title{
    padding: 10px 23px 13px 10px;
    color: #444444;
}
.title2{
    padding-left: 10px;
    padding-top: 13px;
    color:#999999;
}
.title3{
    padding-left: 10px;
    padding-top: 13px;
    display: flex;
    justify-content: space-between;
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
    cursor: default;
}
.active{
    color: #00AD35;
}
</style>

