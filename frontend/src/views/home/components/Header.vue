<script setup lang="ts">
  import { useHomeStore } from '@/store/home'
  import Motion from '@/components/motion'
  import { useMessage } from 'naive-ui'

  const emits = defineEmits(['handleDownLoad'])

  const message = useMessage()
  const wxQR = new URL('@/assets/imgs/pay/wxQR.JPG', import.meta.url).href
  const qqContact = new URL('@/assets/imgs/con_me/qq.jpg', import.meta.url).href
  const telegramContact = new URL('@/assets/imgs/con_me/telegram.jpg', import.meta.url).href
  const homeStore = useHomeStore()

  const goGithub = () => {
    window.open('https://github.com/Miles2048/tier-ranking', '_blank')
  }

  const handleDownLoad = async () => {
    // 切换为预览模式 再进行下载
    if (homeStore.modeType === 'edit') {
      homeStore.switchModeType()
    }
    await sleep(500)
    emits('handleDownLoad')
  }
  const handelSwitchModel = () => {
    homeStore.switchModeType()
    message.success(`已切换为${homeStore.modeType === 'edit' ? '【编辑】' : '【预览】'}模式`)
    rightOperateButtons.value[0].icon = homeStore.modeType !== 'edit' ? '&#xe655;' : '&#xec86;'
    rightOperateButtons.value[0].tip = `切换为${homeStore.modeType === 'edit' ? '预览' : '编辑'}模式`
  }

  const modalVisible = ref(false)
  const qqModalVisible = ref(false)
  const telegramModalVisible = ref(false)

  const rightOperateButtons = ref([
    {
      icon: homeStore.modeType !== 'edit' ? '&#xe655;' : '&#xec86;',
      tip: `切换为${homeStore.modeType === 'edit' ? '预览' : '编辑'}模式`,
      click: () => {
        handelSwitchModel()
      },
    },
    {
      icon: homeStore.skin !== 'light' ? '&#xe76b;' : '&#xe617;',
      tip: `切换为${homeStore.skin === 'dark' ? '深色' : '浅色'}模式`,
      click: () => {
        homeStore.switchSkin()
        // message.success(`已切换为${homeStore.skin === 'dark' ? '深色' : '浅色'}模式`)
        rightOperateButtons.value[1].icon = homeStore.skin !== 'light' ? '&#xe76b;' : '&#xe617;'
        rightOperateButtons.value[1].tip = `切换为${homeStore.skin === 'dark' ? '深色' : '浅色'}模式`
      },
    },
    {
      icon: '&#xe60a;',
      tip: '哄冻尼戴斯噶？你要请我喝咖啡？',
      click: () => {
        modalVisible.value = true
      },
    },
    {
      icon: '&#xe66c;',
      tip: '导出为图片',
      click: () => handleDownLoad(),
    },
    {
      icon: '&#xe85a;',
      tip: 'Github',
      click: () => goGithub(),
    },
    {
      icon: 'telegram-custom',
      tip: 'Telegram联系',
      click: () => {
        telegramModalVisible.value = true
      },
    },
    {
      icon: '&#xe882;',
      tip: 'QQ联系',
      click: () => {
        qqModalVisible.value = true
      },
    },
  ])
</script>
<template>
  <div class="p-header">
    <div
      :style="{
        visibility: homeStore.modeType === 'edit' ? 'visible' : 'hidden',
      }"
      class="left"
    >
      <img
        class="logo"
        :src="
          homeStore.skin !== 'dark' ? '/img/simple-logo-all.svg' : '/img/simple-logo-all-white.svg'
        "
        @click="goGithub()"
      />
    </div>
    <div class="right">
      <Motion>
        <n-tooltip v-for="(btn, index) in rightOperateButtons" :key="index" :delay="500">
          <template #trigger>
            <n-button quaternary type="info" @click="btn.click()">
              <i 
                v-if="btn.icon !== 'telegram-custom'" 
                class="iconfont" 
                v-html="btn.icon"
              ></i>
              <div 
                v-else 
                class="telegram-icon-custom"
                :style="{ backgroundImage: 'url(/img/telegram-icon.jpg)' }"
              ></div>
            </n-button
          ></template>
          {{ btn.tip }}
        </n-tooltip>
      </Motion>
    </div>
    <!--? buy coffee-->
    <n-modal
      v-model:show="modalVisible"
      class="buy-coffee-model"
      :bordered="false"
      preset="dialog"
      title="Dialog"
    >
      <template #header>
        <div class="header">
          <div>☕️ Buy me a coffee</div>
        </div>
      </template>
      <div class="buy-coffee-content">
        <div class="qr-code-only">
          <n-image :height="562 / 2" :width="424 / 2" :src="wxQR" />
        </div>
      </div>
    </n-modal>
    <!--? QQ Contact-->
    <n-modal
      v-model:show="qqModalVisible"
      class="qq-contact-model"
      :bordered="false"
      preset="dialog"
      title="Dialog"
    >
      <template #header>
        <div class="header">
          <div>📞 联系我</div>
        </div>
      </template>
      <div class="qq-contact-content">
        <div class="qr-code-only">
          <n-image :height="400" :width="300" :src="qqContact" object-fit="contain" />
        </div>
      </div>
    </n-modal>
    <!--? Telegram Contact-->
    <n-modal
      v-model:show="telegramModalVisible"
      class="telegram-contact-model"
      :bordered="false"
      preset="dialog"
      title="Dialog"
    >
      <template #header>
        <div class="header">
          <div>📱 Telegram联系</div>
        </div>
      </template>
      <div class="telegram-contact-content">
        <div class="qr-code-only">
          <n-image :height="400" :width="300" :src="telegramContact" object-fit="contain" />
        </div>
      </div>
    </n-modal>
  </div>
</template>

<style scoped lang="scss">
  .p-header {
    height: 30px;
    // border: solid 1px red;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      .logo {
        cursor: pointer;
        //border: solid 1px red;
        position: relative;
        top: 40px;
        left: -10px;
        width: 100px;
        height: 100px;
        z-index: 999;
      }
    }
    .right {
      i {
        color: #425988;
        font-size: 24px;
      }
      .mode-icon {
        font-size: 26px;
      }
      .telegram-icon-custom {
        width: 24px;
        height: 24px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        display: inline-block;
      }
    }
  }
</style>
<style lang="scss">
  .buy-coffee-model {
    width: 468px;
    position: fixed;
    top: 20%;
    left: calc(50% - 234px);
    .n-dialog__icon {
      display: none !important;
    }
    .buy-coffee-content {
      // border: solid 1px red;
      .qr-code-only {
        @include vertical-center;
        padding: 20px 0;
      }
    }
  }
  
  .qq-contact-model {
    width: 468px;
    position: fixed;
    top: 20%;
    left: calc(50% - 234px);
    .n-dialog__icon {
      display: none !important;
    }
    .qq-contact-content {
      .qr-code-only {
        @include vertical-center;
        padding: 20px 0;
      }
    }
  }
  
  .telegram-contact-model {
    width: 468px;
    position: fixed;
    top: 20%;
    left: calc(50% - 234px);
    .n-dialog__icon {
      display: none !important;
    }
    .telegram-contact-content {
      .qr-code-only {
        @include vertical-center;
        padding: 20px 0;
      }
    }
  }
</style>
