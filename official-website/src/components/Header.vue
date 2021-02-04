<template>
  <!-- 头部整体盒子 -->
  <div id="header" class="container-fuild">
    <!-- 电脑导航 -->
    <div class="header-nav container hidden-xs">
      <!-- 导航logo -->
      <div class="header-nav-logo">
        <img src="@/assets/img/logo.jpg">
      </div>
      <div class="bigTitle">安顺宝林科技中药饮片有限公司</div>
      <!-- 导航内容 -->
      <ul class="header-nav-wrapper">
        <li
          v-for="(item,index) in navList"
          :key="index"
          :class="index==navIndex?'active':''"
          @click="navClick(index,item.name,item.path)">
          <router-link :to="item.path">
            {{item.name}}
            <span v-if="item.children.length>0" class="glyphicon glyphicon-menu-down"></span>
            <i class="underline"></i>
          </router-link>
          <!-- 子菜单 -->
          <dl v-if="item.children.length>0">
            <dt v-for="(i,index) in item.children" :key="index" @click="mavChildClick(i.path)" class="childMenu">
              <router-link :to="i.path" tag="span" style="color:#333333;">{{i.name}}</router-link>
            </dt>
          </dl>
        </li>
      </ul>
    </div>
    <!-- 手机导航 -->
    <div class="header-nav-m container-fuild visible-xs">
      <div class="header-nav-m-logo">
        <img class="center-block" src="@/assets/img/logo.jpg" alt="logo">
      </div>
      <!-- 导航栏 -->
      <div class="header-nav-m-menu text-center">
        {{menuName}}
        <div
          class="header-nav-m-menu-wrapper"
          data-toggle="collapse"
          data-target="#menu"
          @click="menuClick"
        >
          <span :class="menuClass"></span>
        </div>
        <!-- 导航内容 -->
        <ul id="menu" class="header-nav-m-wrapper collapse">
          <li
            v-for="(item,index) in mobileNavList"
            :key="index"
            :class="index==navIndex?'active':''"
            @click="mobileNavClick(index,item.name,item.path)"
            data-toggle="collapse"
            data-target="#menu">
            <router-link :to="item.path">
              {{item.name}}
              <span v-if="index==4" class="glyphicon glyphicon-menu-up"></span>
              <i class="underline"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {getCompanyShopList} from "@/api/api.js"

export default {
  name: "Header",
  created(){
    //商城下拉列表
    getCompanyShopList().then(res=>{
      var chilList=[];
      res.data.list.forEach(item => {
        chilList.push({name:item.title,path:item.link,children:[]})
      });
      this.navList[4].children=chilList;

      //手机导航菜单---与pc端分开
      this.mobileNavList=this.navList.slice(0,5);
      chilList.forEach(item=>{
        this.mobileNavList.push(item)
      })
      this.mobileNavList.push(this.navList[5])
    })
    //pc端吸顶效果
    window.addEventListener("scroll",()=>{
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;  
      let offsetTop = document.querySelector('.header-nav-wrapper').offsetTop;
        if (scrollTop > offsetTop) {
            //pc端吸顶
            document.querySelector('.header-nav').style.position="fixed";
            document.querySelector('.header-nav').style.top="0";
            document.querySelector('.header-nav').style.zIndex="2";
            //移动端吸顶
            document.querySelector('.header-nav-m-menu').style.position="fixed";
            document.querySelector('.header-nav-m-menu').style.width="100%";
            document.querySelector('.header-nav-m-menu').style.top="0";
            document.querySelector('.header-nav-m-menu').style.zIndex="2";
        } else {
            //pc端 吸顶恢复
            document.querySelector('.header-nav').style.position="";
            document.querySelector('.header-nav').style.top="";
            //移动端 吸顶恢复
            document.querySelector('.header-nav-m-menu').style.position="";
            document.querySelector('.header-nav-m-menu').style.width="100%";
            document.querySelector('.header-nav-m-menu').style.top="";
            document.querySelector('.header-nav-m-menu').style.zIndex="";
        }
    })






  },
  data() {
    return {
      navIndex: sessionStorage.getItem('navIndex') ? sessionStorage.getItem('navIndex') : 0,
      menuName: "首页",
      menuClass: "glyphicon glyphicon-menu-down",
      navList: [
        {
          name: "首页",
          path: "/",
          children: []
        },
        {
          name: "企业概况",
          path: "/software",
          children: [
            
          ]
        },
        {
          name: "技术实力",
          path: "/service",
          children: []
        },
        {
          name: "产品展示",
          path: "/newsinformation",
          children: []
        },
        {
          name: "企业商城",
          path: "/store",
          children: []
        },
        {
          name: "联系我们",
          path: "/contactus",
          children: []
        }
      ],
      //手机的导航
      mobileNavList:[]
    };
  },
  methods: {
    navClick(index, name,path) {
      
      this.navIndex = index;
      sessionStorage.setItem('navIndex',index)
      this.menuName = name;
    },
    //子菜单跳转外部链接
    mavChildClick(path){
      window.open(path);
    },
    //控制箭头朝向
    menuClick() {
      if (this.menuClass == "glyphicon glyphicon-menu-down") {
        this.menuClass = "glyphicon glyphicon-menu-up";
      } else {
        this.menuClass = "glyphicon glyphicon-menu-down";
      }
    },
    mobileNavClick(index,name,path){
      if(name.indexOf("旗舰店") !=-1){
        window.open(path);
        this.menuName="企业商城"
      }else{
        this.menuName=name
      }
    }
  }
};
</script>
<style  scoped>
/* 顶部 */
#header {
  /* transition: all ease 0.6s; */
  
 
}
#header .header-top {
  height: 50px;
  color: #fff;
  font-size: 12px;
  line-height: 50px;
  background: #474747;
}
/* 顶部的图标 */
#header .header-top span {
  margin: 0 8px;
}

.bigTitle{
  display: inline-block;
  margin-top: 30px;
  margin-bottom: 38px;
  margin-left: 11%;
  font-size: 32px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color:#A9752B;
  line-height: 45px;
  text-align: center;
}
/* 导航栏 */
#header .header-nav {
  padding-right:11.5% ;
  width: 100%;
  height: 110px;
  background-image: url("~@/assets/img/homePage_top.png")
  /* background-color: white; */
}
/* 导航栏logo */
#header .header-nav .header-nav-logo {
  width: 100px;
  height: 100%;
  float: left;
  position: relative;
  left: 10%;
}
/* 导航栏logo图片 */
#header .header-nav .header-nav-logo img {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
/* 导航栏 导航容器 */
#header .header-nav-fixed .header-nav-wrapper {
  line-height: 50px;
}
#header .header-nav .header-nav-wrapper {
  left: 50%;
  top: 5px;
  line-height: 110px;
  float: right;
  margin: 0;
  max-width: 750px;
}
/* 吸顶效果 */
.set-top-position{
  position: sticky;
  top:0
}



/* 导航栏 每个导航 */
#header .header-nav .header-nav-wrapper > li {
  float: left;
  margin: 0 25px;
  position: relative;
}
/* 导航栏 每个导航下面的 a 链接 */
#header .header-nav .header-nav-wrapper > li > a {
  color: #333333;
  font-size: 15px;
  /* font-weight: bold; */
  padding: 15px 0;
  position: relative;
  font-size: 16px;
}
/* 导航栏 每个导航下面的 a 链接的下划线 */
#header .header-nav .header-nav-wrapper > li > a > i {
  display: block;
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  opacity: 0;
  transition: all 0.6s ease;
  background-color: #DB0C18;
}
/* 导航栏 每个导航下面的 a 链接的右侧小三角 */
#header .header-nav .header-nav-wrapper > li > a > span {
  font-size: 12px;
  transition: transform ease 0.5s;
}
/* 导航栏 每个导航下面的 a 链接 鼠标滑上去的样式 */
#header .header-nav .header-nav-wrapper > li > a:hover {
  color: #DB0C18;
  text-decoration: none;
}
/* 导航栏 每个导航下面的 a 链接 鼠标滑上去下划线的样式 */
#header .header-nav .header-nav-wrapper > li > a:hover .underline {
  opacity: 1;
  width: 100%;
  left: 0;
}
/* 导航栏 每个导航下面的 a 链接 鼠标滑上去三角标的样式 */
#header .header-nav .header-nav-wrapper > li > a:hover span {
  transform: rotate(180deg);
}
/* 导航栏 每个导航下面的 a 链接 鼠标点击后的样式 */
#header .header-nav .header-nav-wrapper > li.active > a {
  color:#DB0C18;
  text-decoration: none;
  border-bottom: 2px solid #DB0C18;
}
/* 导航栏 每个导航下面的二级导航容器 */
#header .header-nav .header-nav-wrapper > li > dl {
  display: none;
  position: absolute;
  width: 168px;
  top: 80%;
  left: 0;
  z-index: 999999;
  box-shadow: 0 0 3px 1px #ccc;
  background: #fff;
}
/* 导航栏 每个导航下面的二级导航容器的每个导航 */
#header .header-nav .header-nav-wrapper > li > dl > dt {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
/* 导航栏 每个导航下面的二级导航容器的每个导航 当鼠标滑上时的样式*/
#header .header-nav .header-nav-wrapper > li > dl > dt > a:hover {
  text-decoration: none;
}
/* 导航栏 滑上一级导航显示二级导航 */
#header .header-nav .header-nav-wrapper > li:hover dl {
  display: block;
}
#header .header-nav .header-nav-wrapper > li > dl > dt:hover {
  cursor: pointer;
  background: #ccc;
}

/* 企业商城二级下拉 鼠标选中颜色 */
.childMenu:hover{
  background-color: #01A946 !important;
  
}
.childMenu span:hover{
  color: #ffffff !important;
}



/* 手机导航栏二级菜单 */
.mobileMenu{
  background-color:#000;
  width: 30%;
  margin-left: 65%;
  margin-top: -6.5%;
  z-index: 100;
  position: relative;
}

.mobileMenu::before{
  content: "";
  display: block;
  width: 0px;
  height: 0px;
  /* background-color: red; */
  position: absolute;
  top: 50%;
  margin-top: -10px;
  margin-left: -20px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent #000 transparent transparent;
}


.mobileMenu dt{
  border-bottom: 1px solid #ccc;
}
.mobileMenu a{
  color: #fff !important;
}





@media screen and (max-width: 997px) {
  #header .header-nav-m {
    position: relative;
  }
  /* 导航栏logo容器 */
  #header .header-nav-m .header-nav-m-logo {
    height: 80px;
    position: relative;
  }
  /* 导航栏logo图片 */
  #header .header-nav-m .header-nav-m-logo img {
    width: 95px;
    height: 45px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  /* 导航栏  菜单容器 */
  #header .header-nav-m .header-nav-m-menu {
    color: #fff;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    background: #474747;
    position: relative;
  }
  /* 导航栏 菜单图标 */
  #header .header-nav-m .header-nav-m-menu-wrapper {
    position: absolute;
    top: 50%;
    right: 20px;
    margin-top: -20px;
    width: 50px;
    height: 40px;
    color: #fff;
    z-index: 999999;
    font-size: 12px;
  }
  /* 导航栏 */
  #header .header-nav-m .header-nav-m-wrapper {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    background: #474747;
    z-index: 9999999;
  }
  /* 导航栏 每个导航 */
  #header .header-nav-m .header-nav-m-wrapper > li {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
  }
  /* 导航栏 每个导航下面的 a 链接 */
  #header .header-nav-m .header-nav-m-wrapper > li > a {
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    padding: 15px 0;
    position: relative;
  }
  /* 导航栏 每个导航下面的 a 链接的右侧小三角 */
  #header .header-nav .header-nav-wrapper > li > a > span {
    font-size: 10px;
  }
}
</style>
