// 定义接口
export interface NodeItem {
  [key: string]: string // 字段扩展声明
  id: string
  depth: string
  text: string
}
// 定义类型
export type NodeItems = NodeItem[]
