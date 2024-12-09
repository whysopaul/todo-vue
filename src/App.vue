<script setup lang="ts">
import { provide, ref } from 'vue';
import { RouterView } from 'vue-router';
import type { TTodo } from './types/todo';

const newTodo = ref<TTodo | null>(null)
const addNewTodo = (todo: TTodo) => {
  newTodo.value = todo
}

provide('newTodo', {
  newTodo,
  addNewTodo
})
</script>

<template>
  <RouterView />
</template>
