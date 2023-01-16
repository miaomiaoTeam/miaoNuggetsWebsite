<template>
	<main class="p-5">
		<DarkControl class="fixed top-5 right-5" />
		<ContentDoc class="prose" tag="article" :path="doc_path" excerpt>
			<template #not-found>
				<span>
					找不到该文件，
					<NuxtLink to="/content">返回主页</NuxtLink>
				</span>
			</template>
			<template #empty>
				<ElEmpty />
			</template>
		</ContentDoc>
	</main>
</template>

<script lang="ts" setup>
	const route = useRoute()

	const doc_path = computed(() => {
		const path = route.path.replace('/content', '')
		if (!path) return '/'
		return path
	})
	watchEffect(() => console.log(doc_path.value))
</script>

<style lang="postcss" scoped>
	:deep(.prose :where(img)) {
		margin: 0;
		display: inline-block;
	}
</style>
