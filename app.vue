<template>
	<ElConfigProvider :locale="zhCn">
		<div class="fixed left-5 top-5 text-white">喵喵喵</div>
		<NuxtPage />
	</ElConfigProvider>
</template>

<script lang="ts" setup>
	import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>
