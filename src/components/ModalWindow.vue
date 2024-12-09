<script setup lang="ts">
import type { TTodo } from '@/types/todo';

defineProps<{
  title: string,
  show: TTodo | null
}>()
defineEmits<{
  'main-action': [todo: TTodo],
  'close': []
}>()
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <h2>{{ title }}</h2>

        <slot name="body"></slot>

        <div class="modal-buttons">
          <button class="modal-buttons-confirm" @click="$emit('main-action', show); $emit('close')">
            {{ title === 'Редактировать' ? 'Сохранить' : title }}
          </button>
            <button class="modal-buttons-cancel" @click="$emit('close')">
            Отмена
          </button>
        </div>

        <button class="modal-close" @click="$emit('close')">X</button>
      </div>
    </div>
  </Transition>
</template>
