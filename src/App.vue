<script setup>
import { ref, computed } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFilter from "./components/TodoFilter.vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);

// 待办事项状态管理
const todos = ref([]);
const filter = ref("all");

// 添加待办事项
const addTodo = (text) => {
  todos.value.push({
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date(),
  });
};

// 切换待办事项状态
const toggleTodo = (id) => {
  const todo = todos.value.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};

// 删除待办事项
const deleteTodo = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.value.splice(index, 1);
  }
};

// 过滤待办事项
const filteredTodos = computed(() => {
  switch (filter.value) {
    case "active":
      return todos.value.filter((todo) => !todo.completed);
    case "completed":
      return todos.value.filter((todo) => todo.completed);
    default:
      return todos.value;
  }
});

// 统计信息
const stats = computed(() => {
  const total = todos.value.length;
  const completed = todos.value.filter((todo) => todo.completed).length;
  return {
    total,
    completed,
    percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
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

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <todo-input @add="addTodo" class="mb-8" />

        <todo-filter v-model="filter" :stats="stats" @filter-change="filter = $event" class="mb-6" />

        <todo-list :filtered-todos="filteredTodos" @toggle="toggleTodo" @delete="deleteTodo" />
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
