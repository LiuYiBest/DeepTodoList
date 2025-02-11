<template>
  <div class="space-y-2">
    <div v-if="filteredTodos.length === 0" class="text-center py-8 text-gray-500">
      暂无待办事项
    </div>
    <TransitionGroup name="list">
      <div
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="flex items-center gap-3 p-4 bg-surface-light dark:bg-surface-dark rounded-lg
               animate-slide-in hover:shadow-md transition-all duration-200"
      >
        <button 
          @click="toggleTodo(todo.id)"
          class="flex-shrink-0"
        >
          <CheckCircleIcon
            v-if="todo.completed"
            class="w-6 h-6 text-green-500"
          />
          <MinusCircleIcon
            v-else
            class="w-6 h-6 text-gray-400"
          />
        </button>
        
        <div class="flex-1">
          <div 
            class="text-base"
            :class="{ 'line-through text-gray-400': todo.completed }"
          >
            {{ todo.text }}
          </div>
          <div class="text-sm text-gray-500 mt-1">
            {{ formatTime(todo.createdAt) }}
          </div>
        </div>
        
        <button 
          @click="deleteTodo(todo.id)"
          class="text-gray-400 hover:text-red-500 transition-colors"
        >
          <XMarkIcon class="w-5 h-5"/>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { 
  CheckCircleIcon,
  MinusCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

defineProps({
  filteredTodos: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['toggle', 'delete'])

const toggleTodo = (id) => emit('toggle', id)
const deleteTodo = (id) => emit('delete', id)

// 格式化时间的函数
const formatTime = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const now = new Date()
  const diff = now - d

  // 如果是今天
  if (d.toDateString() === now.toDateString()) {
    return `今天 ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  }
  
  // 如果是昨天
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  if (d.toDateString() === yesterday.toDateString()) {
    return `昨天 ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  }
  
  // 其他日期
  return `${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style> 