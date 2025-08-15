import type { ChooseImageItem, FolderName } from '../types'

const useOneClickImport = () => {
  const variables = reactive({
    visible: false,
    imgCollections: [] as ChooseImageItem[],
  })
  // ?初始化imgList
  variables.imgCollections = [
    {
      logo: getImageUrl('lol'),
      name: '英雄联盟',
      imgs: getImgPathList('lol'),
    },
    {
      logo: getImageUrl('mapleStory'),
      name: '冒险岛',
      imgs: getImgPathList('mapleStory'),
    },
    {
      logo: getImageUrl('wukong'),
      name: '黑神话-悟空',
      imgs: getImgPathList('wukong'),
    },
    {
      logo: getImageUrl('PVZ-RH'),
      name: '融合版究级植物-PVZ-RH',
      imgs: getImgPathList('PVZ-RH'),
    },
    {
      logo: getImageUrl('games'),
      name: '游戏合集',
      imgs: getImgPathList('games'),
    },
  ]

  function getImgPathList(folderName: FolderName) {
    let imageFiles: Record<FolderName, { default: string }>

    switch (folderName) {
      case 'lol':
        imageFiles = import.meta.glob('@/assets/imgs/lol/*.png', { eager: true })
        break
      case 'mapleStory':
        imageFiles = import.meta.glob('@/assets/imgs/mapleStory/*.png', { eager: true })
        break
      case 'wukong':
        imageFiles = import.meta.glob('@/assets/imgs/wukong/*.png', { eager: true })
        break
      case 'PVZ-RH':
        imageFiles = import.meta.glob('@/assets/imgs/PVZ-RH/*.png', { eager: true })
        break
      case 'games':
        imageFiles = import.meta.glob('@/assets/imgs/games/*.{png,jpg}', { eager: true })
        break
    }
    return Object.values(imageFiles).map((module) => module.default)
  }

  function getImageUrl(name: string) {
    return new URL(`/src/assets/imgs/logo/${name}.png`, import.meta.url).href
  }

  return {
    variables,
  }
}

export { useOneClickImport }
