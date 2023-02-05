import { defineStore } from 'pinia'
import type { NodeItems } from './api/catalog'
// catalog is the name of the store. It is unique across your application
// and will appear in devtools
export const useCatalogStore = defineStore('catalog', {
  // a function that returns a fresh state
  state: () => ({
    // counter: 0,
    // name: 'Eduardo',
    // doc_catalog 用来存储目录
    doc_catalog: <NodeItems>[],
  }),
  // optional getters
  getters: {
    // getters receive the state as first parameter
    // doubleCounter: state => state.counter * 2,
    // use getters in other getters
    // doubleCounterPlusOne(): number {
    // return this.doubleCounter + 1
    // },
  },
  // optional actions
  actions: {
    // reset() {
    //   // `this` is the store instance
    //   this.counter = 0
    // },
    // 更新目录数据
    update_doc_catalog(new_catalog: NodeItems) {
      this.doc_catalog = new_catalog
      // console.log('doc_catalog', this.doc_catalog)
    },
  },
})
