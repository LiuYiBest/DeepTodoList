<template>
  <div class="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
    <div class="flex gap-2">
      <button 
        v-for="filter in filters" 
        :key="filter.value"
        @click="$emit('filter-change', filter.value)"
        class="btn-secondary px-3 py-1"
        :class="{ 'bg-primary text-white': modelValue === filter.value }"
      >
        {{ filter.label }}
      </button>
    </div>
    
    <div class="text-sm text-gray-600 dark:text-gray-400">
      已完成 {{ stats.completed }}/{{ stats.total }} 项
      <div class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
        <div 
          class="h-full bg-primary rounded-full transition-all duration-300"
          :style="{ width: `${stats.percentage}%` }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  stats: {
    type: Object,
    required: true
  }
})

const filters = [
  { label: '全部', value: 'all' },
  { label: '未完成', value: 'active' },
  { label: '已完成', value: 'completed' }
]

defineEmits(['filter-change'])
</script> 