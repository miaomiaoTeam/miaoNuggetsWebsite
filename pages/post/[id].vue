<template>
  <div>
    <p>{{ $route.params.id }}</p>
    <!-- 移动端 -->
    <div>
      <div class="w-[200px] h-40 bg-orange-300 md:w-[1000px]">dd</div>
      <main-content>
        <template #main>
          <detail-content></detail-content>
        </template>
        <template #sideleft> </template>
        <template #sidebar>
          <ArticlelSidebar></ArticlelSidebar>
          <directory-nav></directory-nav>
        </template>
      </main-content>
    </div>
    <!-- PC端-->
    <div class="md:xxx"></div>
  </div>
</template>
