<template>
  <div id="app">
    <iframe ref="iframe" src="" width="0" height="0" frameborder="no" allowtransparency="yes"></iframe>
    <div class="wrap">
      <transition :name="transitionName" mode="out-in">
        <router-view class="conter"></router-view>
      </transition>
    </div>


    <!-- 全局组件 start -->
    <mc-loading 
      :isShow="isShowLoading"
    ></mc-loading>
    <mc-toast 
      :isShow="isShowToast" 
      :isText="toastText"
    ></mc-toast>
    <!-- 全局组件 end -->
  </div>
</template>

<script>
import * as mutationTypes from "@/vuex/mutations/types";
import * as actionTypes from "@/vuex/actions/types";
import * as connectURL from "@/http/common/connectURL";
import { 
  mapState, 
  mapGetters, 
  mapMutations, 
  mapActions 
} from "vuex";
import {bus, busType} from '@/bus';

export default {
  name: "app",

  data() {
    return {
      transitionName: "fade"
    };
  },

  computed: {
    ...mapState([
      "isShowLoading", 
      "isShowToast", 
      "toastText"
    ])
  },

  mounted() {
    // 监听iframe通讯
    bus.$on(busType.IFRAME, function(src) {
      this.$refs.iframe.src = src;
      console.warn( 'iframe触发:', src );
    }.bind(this))
  },

  methods: {
    ...mapMutations({
      triggerMutation: mutationTypes.SET_MUTATION_DEFAULT
    })
  },

  watch: {}
};
</script>

<style lang="less">
@import "./less/core.less";

#app, .wrap, .conter {
  width: 100%;
  height: 100%;
  font-size: 24px;
}

#adcox, .adcox {
  display: none;
}

.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-leave {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: .1s;
}


.left-enter {
  transform: translateX(100%);
}
.left-enter-to {
  transform: translateX(0%);
}
.left-leave {
  transform: translateX(0%);
}
.left-leave-to {
  transform: translateX(-100%);
}
.left-enter-active, .left-leave-active {
  transition: .2s;
}


.right-enter {
  transform: translateX(-100%);
}
.right-enter-to {
  transform: translateX(0%);
}
.right-leave {
  transform: translateX(0%);
}
.right-leave-to {
  transform: translateX(100%);
}
.right-enter-active, .right-leave-active {
  transition: .2s;
}

</style>
