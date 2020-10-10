<template>
    <div>
        <div class="CardimgBox">
            <img :src="TechnologyItem.picUrl" alt="">
        </div>
        <div class="CardtextBox">
            <div class="title">{{TechnologyItem.name}}</div>
        </div>
    </div>
</template>
<script>
import { WOW } from "wowjs";
import dateFormat from "../../utils/dateTimeUtls/dateFormat.js"
export default {
    name: 'Software',
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
.CardimgBox{
    width: 300px;
    height: 300px;
    padding-right: 0px;
   
}
.CardimgBox img{
    display: block;
    width: 100%;
    height: 100%;
}
.CardtextBox{
    width: 100%;
    margin-top: 14px;
    text-align: center;
    color: #444444;
    font-size: 16px;   
    font-family: PingFang-SC-Regular, PingFang-SC;
    line-height: 22px;
}

</style>

