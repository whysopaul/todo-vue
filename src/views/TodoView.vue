<script setup lang="ts">
import HeaderTitle from '@/components/HeaderTitle.vue';
import type { TTodo } from '@/types/todo';
import { API_URL } from '@/utils';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const todo = ref<TTodo | null>(null)

watchEffect(async () => {
  const response = await fetch(API_URL + '?title=' + (route.params.slug as string).replace(/\-/g, ' '))
  todo.value = (await response.json())[0]
})
</script>

<template>
  <HeaderTitle v-if="todo" :title="todo.title" />
  <main>
    <div class="todo-view-status">
      <label>
      <span>Статус: </span>
      <input type="checkbox" :checked="todo?.completed" />
    </label>
    </div>
    <div>
      <RouterLink to="/">Вернуться назад</RouterLink>
    </div>
  </main>
</template>
