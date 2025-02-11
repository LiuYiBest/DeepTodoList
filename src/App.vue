<script setup>
import { ref, computed, onMounted } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFilter from "./components/TodoFilter.vue";
import { todoApi } from './services/api'

const isDark = useDark();
const toggleDark = useToggle(isDark);

// 待办事项状态管理
const todos = ref([]);
const filter = ref("all");
const loading = ref(false);
const error = ref('');

// 获取所有待办事项
const fetchTodos = async () => {
  loading.value = true;
  try {
    const response = await todoApi.getTodos();
    if (response.success) {
      todos.value = response.data;
    } else {
      error.value = response.message;
    }
  } catch (err) {
    error.value = '获取待办事项失败';
  } finally {
    loading.value = false;
  }
};

// 添加待办事项
const addTodo = async (text) => {
  try {
    const response = await todoApi.addTodo(text);
    if (response.success) {
      todos.value.unshift(response.data);
    } else {
      error.value = response.message;
    }
  } catch (err) {
    error.value = '添加待办事项失败';
  }
};

// 切换待办事项状态
const toggleTodo = async (id) => {
  try {
    const response = await todoApi.updateTodo(id);
    if (response.success) {
      const todo = todos.value.find(t => t._id === id);
      if (todo) {
        todo.isCompleted = response.data.isCompleted;
      }
    } else {
      error.value = response.message;
    }
  } catch (err) {
    error.value = '更新待办事项失败';
  }
};

// 删除待办事项
const deleteTodo = async (id) => {
  try {
    const response = await todoApi.deleteTodo(id);
    if (response.success) {
      todos.value = todos.value.filter(t => t._id !== id);
    } else {
      error.value = response.message;
    }
  } catch (err) {
    error.value = '删除待办事项失败';
  }
};

// 过滤待办事项
const filteredTodos = computed(() => {
  switch (filter.value) {
    case "active":
      return todos.value.filter((todo) => !todo.isCompleted);
    case "completed":
      return todos.value.filter((todo) => todo.isCompleted);
    default:
      return todos.value;
  }
});

// 统计信息
const stats = computed(() => {
  const total = todos.value.length;
  const completed = todos.value.filter((todo) => todo.isCompleted).length;
  return {
    total,
    completed,
    percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
});

// 初始加载
onMounted(() => {
  fetchTodos();
});
</script>

<template>
  <div class="min-h-screen p-4 md:p-8 bg-white dark:bg-gray-900 flex items-center justify-center">
    <div class="w-full max-w-3xl mx-auto px-4">
      <header class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          Todo List
        </h1>
        <button @click="toggleDark()" class="btn-secondary p-3">
          <sun-icon v-if="isDark" class="w-6 h-6" />
          <moon-icon v-else class="w-6 h-6" />
        </button>
      </header>

      <!-- 加载提示 -->
      <div v-if="loading" class="text-center py-2 text-sm text-gray-500">
        加载中...
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <todo-input @add="addTodo" class="mb-8" />

        <todo-filter v-model="filter" :stats="stats" @filter-change="filter = $event" class="mb-6" />

        <todo-list :filtered-todos="filteredTodos" @toggle="toggleTodo" @delete="deleteTodo" />
      </div>

      <!-- 错误提示 -->
      <div v-if="error" class="mt-4 p-2 text-sm text-red-600 dark:text-red-400 text-center">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  font-size: 16px;
}

@media (min-width: 768px) {
  body {
    font-size: 18px;
  }
}
</style>
