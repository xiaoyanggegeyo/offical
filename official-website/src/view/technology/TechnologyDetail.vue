<template>
    <div class="infoDeatil">
            <video-player  v-if="detail.detailType==2" class="video-player vjs-custom-skin  col-sm-12 col-xs-12 col-md-12  col-lg-12" ref="videoPlayer" :playsinline="true" 
                    :options="playerOptions" style="width:100%; height: 100%;display:block;"/>
            <div style="width:100%;" v-if="detail.detailType==1">
            <!-- 图片 -->
                <img  style="display:block;width:100%;height:100;" :src="detail.detailUrl"/>
            </div>
        <!-- TODO 后台富文本 -->
            <div v-html="detail.detail" style="display:block;padding:0px 0px 0 0px">
            
            </div>
        <el-footer v-if="detail.conventionType==1" class="layer-bottom-btn" style="text-align:center;margin-top:50px">
                <el-button type="primary" @click="saveConvention" size="medium">预约</el-button>
        </el-footer>
    </div>
</template>
<script>
import {getTechnologyDetail} from "@/api/api.js"
import {updateTechnologyPraise} from "@/api/api.js"
import appointment from "@/view/service/component/appointment.vue"
export default {
    name:"TechnologyDetail",
    components:{
        appointment
    },
    created(){
        //获取文章详情
        //获取页面参数
        getTechnologyDetail(localStorage.getItem("technologyId")).then(res=>{
            this.detail=res.data;
            if(!res.data.detailType){
                this.$message('无技术实力详情内容');
            }

            //detailType 1表示图片  2表示视频
            if(this.detail.detailType==2){
                this.playerOptions.sources[0].src=this.detail.detailUrl
            }else if(this.detail.detailType==1){
                 
            }
        }).catch(err=>{

        })

    },
    data(){
        return{
            //文章顶部
            detail:{},
            //视频配置
            playsinline:true,
            playerOptions : {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                    type: "video/mp4",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                    src: "" //url地址
                    }],
                    //poster: "../../static/images/test.jpg", //你的封面地址
                     //width: "100%", //播放器宽度
                    //height:"10px",
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true  //全屏按钮
                    }
                }
        }
    },
    methods:{
        //预约
        saveConvention(){
            let informationId=localStorage.getItem("informationId");
             this.$layer.iframe({
                            content: {
                                content: appointment,
                                parent: this,
                                data:{
                                }
                            },
                            area:['55%','701px'],
                            title: '预约',
                            cancel:()=>{
                                
                            }
                            });
        }

    }
    
}
</script>
<style scoped>
    .infoDeatil{
        padding: 0px 200px 60px 200px;
    }
    .imgBox,.videoBox{
        width:100%;
        height:100%;
        background-color: rgb(23, 10, 146)(151, 149, 149);
    }

    .video-js .vjs-icon-placeholder {
        width: 100%;
        height: 100%;
        display: block;
    }

    @media screen and (min-width: 768px) and (max-width: 996px) {
         .infoDeatil{
            padding: 0px 5px 60px 5px;
            margin-top: -20px;
        }
    }
</style>
