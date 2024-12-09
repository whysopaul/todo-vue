<script setup lang="ts">
import HeaderTitle from '@/components/HeaderTitle.vue';
import router from '@/router';
import { inject, ref } from 'vue';

const title = ref('')
const completed = ref(false)

// @ts-expect-error addNewTodo is a function
const { addNewTodo } = inject('newTodo')

const createTodo = () => {
  if (title.value.length < 3 || title.value.length > 50) {
    return
  }

  addNewTodo({
    id: 0,
    userId: 1,
    title,
    completed
  })
  router.push('/')
}
</script>

<template>
  <HeaderTitle title="Создать заметку" />
  <main>
    <div class="add-view-form">
      <label class="add-view-form-title">
        <span>Название:</span>
        <input v-model="title" placeholder="Введите название заметки" />
      </label>
      <label>
        <span>Выполнено: </span>
        <input type="checkbox" v-model="completed" />
      </label>
      <button class="add-view-form-create-button" @click="createTodo()">
        Создать
      </button>
  </div>
  </main>
</template>
