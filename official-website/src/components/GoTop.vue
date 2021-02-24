<template>
  <div id="GoTop" @click="GoTop()">
    <span>

    </span>
  </div>
</template>
<script>
export default {
  name: "GoTop",
  data() {
    return {
      flag: false
    };
  },
  methods: {
    GoTop() {
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 10);
        }
      })();
    }
  }
};
</script>
<style scoped>
#GoTop {
  width: 48px;
  height: 48px;
  position: fixed;

  right: 20px;
  bottom: 20px;
  z-index: 99999999;
  cursor: pointer;
   background-color: rgba(39, 34, 34, 0.6);
     border-radius: 50%;
  
}
#GoTop > span {
  display: block;
  width: 50%;
  height: 50%;
  margin-left: 25%;
  margin-top: 30%;
  background-image: url("~@/assets/img/backTop.png");
  background-size: 100% 100%;
 
}
</style>
