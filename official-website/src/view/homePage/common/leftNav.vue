
<template>
<!--  左侧导航栏 -->
    <el-col style="width:146px;">
     <el-menu style="border-right:0px solid #ccc;" class="el-menu-vertical-demo" active-menu-color="#00AD35">
         <el-menu-item v-for="(item,index) in dataList" :key="index" @click="currentMenu(item.id)" style="padding:0 10px;color:#333333" :class="currentTarget==item.id?'active':''">
             <span slot="title">{{item.title}}</span>
         </el-menu-item>
     </el-menu>
    </el-col>
</template>
<script>
export default {
    name:"leftNav",
    created(){
       console.log(this.dataList);
    },
    data(){
        return{
            //当前选中条目  数组中第一个
            currentTarget:''
        }
    },
    props:{
        //具体显示的条目内容
        dataList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    watch:{
        dataList:function(newVal,oldVal){
            this.currentTarget=newVal[0].id
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
   background:#DA0A15;
   color: #FFFFFF !important;
}

</style>