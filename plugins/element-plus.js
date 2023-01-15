import * as ElementPlus from "element-plus/dist/index.full";
import zhCn from "element-plus/es/locale/lang/zh-cn";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElementPlus, {
    locale: zhCn,
  });
});
