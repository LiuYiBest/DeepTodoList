import axios from 'axios'

const baseURL = 'https://lojzowngtnbe.sealoshzh.site' // 替换为你的实际API地址

const api = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const todoApi = {
    // 获取所有待办事项
    getTodos: async () => {
        try {
            const response = await api.get('/get-todo')
            return response.data
        } catch (error) {
            console.error('获取待办事项失败:', error)
            throw error
        }
    },

    // 添加新的待办事项
    addTodo: async (value) => {
        try {
            const response = await api.post('/add-todo', { value })
            return response.data
        } catch (error) {
            console.error('添加待办事项失败:', error)
            throw error
        }
    },

    // 更新待办事项状态
    updateTodo: async (id) => {
        try {
            const response = await api.post(`/update-todo/${id}`)
            return response.data
        } catch (error) {
            console.error('更新待办事项失败:', error)
            throw error
        }
    },

    // 删除待办事项
    deleteTodo: async (id) => {
        try {
            const response = await api.post(`/del-todo/${id}`)
            return response.data
        } catch (error) {
            console.error('删除待办事项失败:', error)
            throw error
        }
    }
} 