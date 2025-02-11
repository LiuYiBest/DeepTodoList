<template>
  <form @submit.prevent="addTodo" class="mb-6">
    <div class="flex gap-2">
      <input 
        v-model="newTodo"
        type="text"
        placeholder="添加新的待办事项..."
        class="input flex-1"
        :class="{ 'border-red-500': error }"
      />
      <button type="submit" class="btn-primary">
        <plus-icon class="w-5 h-5"/>
      </button>
    </div>
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['add'])
const newTodo = ref('')
const error = ref('')

const addTodo = () => {
  if (!newTodo.value.trim()) {
    error.value = '请输入待办事项内容'
    return
  }
  emit('add', newTodo.value.trim())
  newTodo.value = ''
  error.value = ''
}
</script> 