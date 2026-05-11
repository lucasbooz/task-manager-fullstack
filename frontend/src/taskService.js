import axios from 'axios'

const API_URL = 'http://localhost:3000/tasks'

export const getTasks = () => {
  return axios.get(`${API_URL}.json`)
}

export const createTaskRequest = (task) => {
  return axios.post(`${API_URL}.json`, {
    task
  })
}

export const updateTaskRequest = (task) => {
  return axios.patch(`${API_URL}/${task.id}.json`, {
    task: {
      completed: !task.completed
    }
  })
}

export const deleteTaskRequest = (id) => {
  return axios.delete(`${API_URL}/${id}.json`)
}