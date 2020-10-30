
<template>
  <div v-html="detailData">

  </div>
</template>

<script>
export default {
name:'announcementDetail',
components:{}, 
  data () {
    return {   
    }
  },
methods:{

},
created(){},
mounted(){},
props:{
    detailData:{
        type:String,
        default:""
    }
}
}

</script>

<style scoped>

</style>
