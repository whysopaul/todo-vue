<script setup lang="ts">
import HeaderTitle from '@/components/HeaderTitle.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import TodoRow from '@/components/TodoRow.vue';
import router from '@/router';
import type { TTodo } from '@/types/todo';
import { API_URL } from '@/utils';
import { computed, inject, ref, watch, watchEffect, type Ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const hasCompletedQuery = ref(Boolean(route.query.completed))
const todos = ref<TTodo[]>([])
const filteredTodos = computed(() => todos.value.filter(todo => hasCompletedQuery.value ? todo.completed : true))
const showEditModal = ref<TTodo | null>(null)
const showDeleteModal = ref<TTodo | null>(null)

// @ts-expect-error newTodo is a ref
const { newTodo } = inject('newTodo')

watchEffect(async () => {
  const fetchedTodos = await ((await fetch(API_URL + '?_limit=50')).json())
  todos.value = newTodo.value ? [newTodo.value, ...fetchedTodos] : fetchedTodos
})

watch(() => route.query.completed, ((value) => hasCompletedQuery.value = Boolean(value)))

const filterTodos = () => {
  if (hasCompletedQuery.value) {
    return router.push('/')
  }

  router.push('/?completed=true')
}

const preventTabNavigation = (event: KeyboardEvent) => {
  if (event.key === 'Tab') {
    event.preventDefault()
  }
}

const openModal = (ref: Ref<TTodo | null>) => {
  return (todo: TTodo) => {
    ref.value = todo
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', preventTabNavigation)
  }
}

const openEditModal = openModal(showEditModal)
const openDeleteModal = openModal(showDeleteModal)

const editTodo = (todo: TTodo) => {
  todos.value = todos.value.map(t => t.id === todo.id ? todo : t)
}

const deleteTodo = (todo: TTodo) => {
  todos.value = todos.value.filter(t => t.id !== todo.id)
}

const closeModal = (ref: Ref<TTodo | null>) => {
  return () => {
    ref.value = null
    document.body.style.overflow = 'auto'
    document.removeEventListener('keydown', preventTabNavigation)
  }
}

const closeEditModal = closeModal(showEditModal)
const closeDeleteModal = closeModal(showDeleteModal)
</script>

<template>
  <HeaderTitle title="Список заметок" />
  <main>
    <div class="todo-table">
      <div class="todo-table-row">
        <div>Номер по порядку</div>
        <div>Название</div>
        <div>
          <button class="todo-table-filter-button" :class="{active: hasCompletedQuery}" @click="filterTodos">
            Отметка о выполнении
          </button>
        </div>
        <div>Редактировать</div>
        <div>Удалить</div>
        <div>Ссылка</div>
      </div>
      <TodoRow
        v-for="todo of filteredTodos"
        :todo="todo"
        @update-status="todo.completed = !todo.completed"
        @on-edit="openEditModal({...todo})"
        @on-delete="openDeleteModal(todo)"
        :key="todo.id"
      />
    </div>
  </main>

  <Teleport to="body">
    <ModalWindow
      title="Редактировать"
      :show="showEditModal"
      @main-action="editTodo"
      @close="closeEditModal"
    >
      <template #body>
        <label>
          <span>Название: </span>
        <input v-model="showEditModal!.title" />
      </label>
      </template>
    </ModalWindow>
  </Teleport>

  <Teleport to="body">
    <ModalWindow
      title="Удалить"
      :show="showDeleteModal"
      @main-action="deleteTodo"
      @close="closeDeleteModal"
    />
  </Teleport>
</template>
