<template>
  <NuxtLayout name="administar">
    <AdminDataTable
      :table-data="articles.list"
      :table-columns="article_columns"
      :before-close-drawer="submitArticlePut"
      :update-time="articles.update_time"
      editor-request-url="/api/article/:id"
      :search-props="['title', 'introduce', 'content_path']"
      @refresh="articles.refresh"
      @remove="articles.remove"
    >
      <template #drawer>
        <ElForm
          ref="article_form_ref"
          label-width="7em"
          :model="article_form_data"
          :rules="article_form_rules"
        >
          <ElFormItem label="标题" prop="title">
            <ElInput v-model="article_form_data.title" size="small" />
          </ElFormItem>
          <ElFormItem label="作者" prop="author_id">
            <ElSelect v-model="article_form_data.author_id" size="small">
              <ElOption
                v-for="item in users.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="类型" prop="category_id">
            <ElSelect v-model="article_form_data.category_id" size="small">
              <ElOption
                v-for="item in categorys.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="标签" prop="tag_ids">
            <ElSelect v-model="article_form_data.tag_ids" multiple size="small">
              <ElOption
                v-for="item in tags.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="文章路径" prop="content_path">
            <ElInput v-model="article_form_data.content_path" size="small" />
          </ElFormItem>
          <ElFormItem label="介绍" prop="introduce">
            <ElInput v-model="article_form_data.introduce" size="small" />
          </ElFormItem>
          <ElFormItem label="贴图" prop="cover_image">
            <ElInput v-model="article_form_data.cover_image" size="small" />
          </ElFormItem>
        </ElForm>
      </template>
    </AdminDataTable>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { useArticleList } from 'stores/_admin/article'
import { useUserList } from 'stores/_admin/user'
import { useTagList } from 'stores/_admin/tag'
import { useCategoryList } from 'stores/_admin/category'
definePageMeta({
  middleware: ['admin-auth'],
})
const users = useUserList()
const tags = useTagList()
const categorys = useCategoryList()
const articles = useArticleList()

const article_columns = reactive<Client.Admin.tableColumn[]>([
  { label: '标题', prop: 'title', editor: 'input', width: '120' },
  { label: '介绍', prop: 'introduce', editor: 'input', width: '240' },
  { label: '贴图', prop: 'cover_image', editor: 'input', width: '240' },
  {
    label: '作者',
    prop: 'author_id',
    editor: 'select',
    width: '120',
    select: {
      options: () => users.options,
    },
  },
  {
    label: '类型',
    prop: 'category_id',
    editor: 'select',
    width: '120',
    select: {
      options: () => categorys.options,
    },
  },
  {
    label: '标签',
    prop: 'tag_ids',
    editor: 'select',
    width: '120',
    select: {
      options: () => categorys.options,
      multiple: true,
    },
  },
  { label: '文章路径', prop: 'content_path', editor: 'input', width: '180' },
  { label: '展示数', prop: 'view_count', width: '90' },
  { label: '收藏数', prop: 'collect_count', width: '90' },
  { label: '点赞数', prop: 'digg_count', width: '90' },
  { label: '评论数', prop: 'comment_count', width: '90' },
])

const article_form_ref = ref<FormInstance>()
const initArticleFormData = () => ({
  title: '',
  author_id: undefined as unknown as number,
  category_id: undefined as unknown as number,
  tag_ids: [] as number[],
  content_path: '',
  introduce: '',
  cover_image: '',
})
const article_form_data = ref(initArticleFormData())
const article_form_rules = reactive<FormRules>({
  title: [{ required: true, message: '请输入文章标题' }],
  author_id: [{ required: true, message: '请选择作者' }],
  category_id: [{ required: true, message: '请选择类型' }],
  tag_ids: [{ required: true, message: '请选择标签' }],
  content_path: [{ required: true, message: '请输入文章路径' }],
})
const submitArticlePut = async () => {
  await article_form_ref.value?.validate()
  await articles.new(article_form_data.value)
  article_form_data.value = initArticleFormData()
}
</script>
