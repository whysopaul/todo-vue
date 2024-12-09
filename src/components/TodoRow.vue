<script setup lang="ts">
import type { TTodo } from '@/types/todo';

defineProps<{
  todo: TTodo
}>()
defineEmits<{
  'update-status': [],
  'on-edit': [],
  'on-delete': []
}>()
</script>

<template>
  <div class="todo-table-row" :class="{completed: todo.completed}">
    <div>{{ todo.id }}</div>
    <div>{{ todo.title }}</div>
    <div>
      <input type="checkbox" @change="$emit('update-status')" :checked="todo.completed" />
    </div>
    <div>
      <button class="todo-table-row-edit-button" @click="$emit('on-edit')">
        Редактировать
      </button>
    </div>
    <div>
      <button class="todo-table-row-delete-button" @click="$emit('on-delete')">
        Удалить
      </button>
    </div>
    <div>
      <RouterLink :to="`/todo/${todo.title.replace(/\s/g, '-')}`">Ссылка</RouterLink>
    </div>
  </div>
</template>
