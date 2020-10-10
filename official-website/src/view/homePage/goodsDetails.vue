<template>
    <div  v-html="detailsData">{{detailsData}}</div>
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
            type:String,
            default(){
                return ""
            }

        }
    }
}
</script>
<style  scoped>
   
</style>