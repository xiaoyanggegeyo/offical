
<template>
    <div class="app-container">
    <el-main class="form-container">
      <el-form ref="dataForm" v-model="toolType" :loading="loading" class="form-container" label-width="100px">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="16" :lg="8">
            <el-form-item label="">
                <span class="inputText">请选择预约到店时间</span>
                <el-date-picker style="width:330px" v-model="toolType.toshopTime" type="datetime" placeholder="请选择预约到店时间"> </el-date-picker>
            </el-form-item>
          </el-col>
           <el-col :xs="24" :sm="24" :md="16" :lg="8">
            <el-form-item label="">
                <span class="inputText">请输入联系人姓名</span>
              <el-input v-model="toolType.name" placeholder="请输入联系人姓名" clearable />
            </el-form-item>
          </el-col>
           <el-col :xs="24" :sm="24" :md="16" :lg="8">
            <el-form-item label="">
            <span class="inputText">请输入联系人电话</span>
              <el-input v-model="toolType.phone" placeholder="请输入联系人电话" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="">
            <span class="inputText">选择所到门店</span>
              <el-select v-model="shopId" @change="handleShopSelect" placeholder="选择所到门店" style="width:100%">
                <el-option
                  v-for="item in ShopList" 
                   :key="item.shopId"
                  :label="item.name"
                  :value="item.shopId"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">  
            <el-form-item label="">
                <span class="inputText">选择所到服务类型</span>
              <el-select v-model="toolType.serviceId" placeholder="选择所到服务类型" style="width:100%">
                <el-option
                  v-for="item in ServiceList" 
                   :key="item.serviceId"
                  :label="item.name"
                  :value="item.serviceId"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="">
                <span class="inputText">备注</span>
              <el-input v-model="toolType.remark" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-main>
    <el-footer class="layer-bottom-btn" style="text-align:center">
      <el-button type="danger" @click="closeForm">取消</el-button>
      <el-button type="primary" @click="saveConvention">提交</el-button>
    </el-footer>
  </div>
</template>
<script>
import {getShopList,getServiceList,addConvention} from "@/api/api.js"
import dateFormat from "@/view/utils/dateTimeUtls/dateFormat.js"
export default {
    name:"appointment",
    created(){
        //门店列表(初始化  和 选中改变时 都要调一次 并重新渲染门店服务列表)
        getShopList().then(res=>{
            this.ShopList=res.data.list;
            // debugger;
            if(this.ShopList.length !=0){
                //默认取第一个门店id
                getServiceList(this.ShopList[0].shopId).then(res=>{
                    this.ServiceList=res.data.list;
                    console.log(this.ServiceList);
                })
            }
        })
        //门店服务列表
    },
    data() {
        return {
          ServiceList:[],
          ShopList:[],
            loading: true,
            toolTypeGroupList: [],
            shopId:"",
            toolType: {
                toshopTime: "",
                name: '',
                phone: "",
                serviceId:"",
                desc:""
               
            }
        };
    },
    methods:{
        //处理门店选中 重新刷新服务列表
        handleShopSelect(){
            getServiceList(this.shopId).then(res=>{
                    this.ServiceList=res.data.list;
                })
        },
        //提交预约
        saveConvention() {
          console.log(this.toolType);
          //格式化toshopTime
          var toshopTimeStr=dateFormat("YYYY-mm-dd HH:MM:SS",new Date(this.toolType.toshopTime));
          this.toolType.toshopTime=toshopTimeStr
          addConvention(this.toolType).then(respose => {
            this.$notify({
              title: '成功',
              message: '保存成功！',
              type: 'success',
              duration: 2000
            })
            //关闭弹窗
            this.closeForm();
          })
        },
      closeForm() {
        // 关闭弹窗
        this.$layer.close(this.layerid)
      }
    },
    props:{
        layerid: {
          type: String,
          default: ''
        },
        informationId:{
          type:String,
          default:''
        }
    }
    
}
</script>
<style scoped>
    .title{
        width: 64px;
        height: 24px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        line-height: 24px;
        margin-left: 32px;
        margin-top: 43px;
        margin-bottom: 14px;
    }
    .topBox, .bottomBox{
        width: 1100px;
        padding: 30px 38px 0px 37px;
        border-top: 1px solid #E9E9E9;
    }
    .inputText{
        display: inline-block;
        margin-bottom: 8px;
        
        
    }


    

</style>