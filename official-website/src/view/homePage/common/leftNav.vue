
<template>
<!--  左侧导航栏 -->
    <el-col style="width:140px;">
     <el-menu style="border-right:0px solid #ccc;" class="el-menu-vertical-demo" active-menu-color="#00AD35">
         <el-menu-item v-for="(item,index) in dataList" :key="index" @click="currentMenu(index)"  :class="currentTarget==index?'active':''">
             <span slot="title">{{item}}</span>
         </el-menu-item>
     </el-menu>
    </el-col>
</template>
<script>
export default {
    name:"leftNav",
    data(){
        return{
            //当前选中条目
            currentTarget:0
        }

    },
    props:{
        //具体显示的条目内容
        dataList:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    methods:{
        currentMenu(index){
            //当前选中的menu着色
            this.currentTarget=index
            //传递当前点击的的按钮下标
            this.$emit("currentNavMenu",index);
        }
    }
}
</script>
<style  scoped>

.active{
   background:#00AD35;
   color: #FFFFFF;
}
/* 小三角 待完成 */
.active::after{
    /* display: inline-block;
    content: "";
    width: 5px;
    height: 5px;
    background: red;
    margin-left: 90px; */
}

</style>