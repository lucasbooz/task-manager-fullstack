<script setup>
import { ref, onMounted, computed } from 'vue'
import {
  getTasks,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest
} from './taskService'

const tasks = ref([])
const newTask = ref('')

const fetchTasks = async () => {
  try {
    const response = await getTasks()
    tasks.value = response.data
  } catch (error) {
    console.error(error)
  }
}
 
const createTask = async () => {
  if (!newTask.value.trim()) return

  try {
    await createTaskRequest({
      title: newTask.value,
      completed: false,
      deadline: deadline.value || null
    })

    newTask.value = ''
    deadline.value = ''
    fetchTasks()
  } catch (error) {
    console.error(error)
  }
}

const toggleTask = async (task) => {
  try {
    await updateTaskRequest(task)
    fetchTasks()
  } catch (error) {
    console.error(error)
  }
}

const deleteTask = async (id) => {
  try {
    await deleteTaskRequest(id)
    fetchTasks()
  } catch (error) {
    console.error(error)
  }
}

const deadline = ref('')

const getStatus = (task) => {
  if (task.completed) return 'Concluída'
  if (!task.deadline) return 'Sem prazo'

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Pega só a parte da data (YYYY-MM-DD)
  const datePart = task.deadline.split('T')[0]

  const [year, month, day] = datePart.split('-')
  const deadlineDate = new Date(year, month - 1, day)

  if (deadlineDate < today) return 'Atrasada'

  return 'Em andamento'
}

const filter = ref('todas')

const filteredTasks = computed(() => {
  if (filter.value === 'todas') return tasks.value

  return tasks.value.filter(task => {
    const status = getStatus(task)

    if (filter.value === 'pendentes') return status === 'Em andamento'
    if (filter.value === 'concluidas') return status === 'Concluída'
    if (filter.value === 'atrasadas') return status === 'Atrasada'

    return true
  })
})

onMounted(() => {
  fetchTasks()
})
</script>

<template>
  <div class="container">
    <div class="card">
      <h1>Lista de Tarefas</h1>

      <p class="subtitle">
        Total: {{ tasks.length }} tarefas
      </p>

      <div class="form">
        <div class="form-row">
          <input
            v-model="newTask"
            type="text"
            placeholder="Digite uma tarefa"
          />

          <input
            v-model="deadline"
            type="date"
          />
        </div>

        <button @click="createTask">
          Adicionar
        </button>
      </div>

      <div class="filters">
        <button
          :class="{ active: filter === 'todas' }"
          @click="filter = 'todas'"
        >
          Todas
        </button>

        <button
          :class="{ active: filter === 'pendentes' }"
          @click="filter = 'pendentes'"
        >
          Pendentes
        </button>

        <button
          :class="{ active: filter === 'concluidas' }"
          @click="filter = 'concluidas'"
        >
          Concluídas
        </button>

        <button
          :class="{ active: filter === 'atrasadas' }"
          @click="filter = 'atrasadas'"
        >
          Atrasadas
        </button>
      </div>

      <div v-if="tasks.length === 0" class="empty">
        Nenhuma tarefa cadastrada.
      </div>

      <ul v-else>
        <li
          v-for="task in filteredTasks"
          :key="task.id"
          class="task-item"
        >
          <div class="task-left">
            <input
              type="checkbox"
              :checked="task.completed"
              @change="toggleTask(task)"
            />

            <span style="margin-left: 10px; font-size: 12px; color: gray;">
              ({{ getStatus(task) }})
            </span>

            <span
              :class="{ 
                completed: task.completed,
                late: getStatus(task) === 'Atrasada' 
              }"
            >
              {{ task.title }}
            </span>
          </div>

          <button
            class="delete-button"
            @click="deleteTask(task.id)"
          >
            Excluir
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #f4f4f4;
}

.container {
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

.card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.subtitle {
  color: gray;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.form button {
  padding: 10px 20px;
  border: none;
  background-color: #42b883;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.form button:hover {
  opacity: 0.9;
}

.form-row {
  display: flex;
  gap: 10px;
}

.form-row input {
  flex: 1;
  padding: 10px;
}

.form-row button {
  padding: 10px 20px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fafafa;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.task-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.completed {
  text-decoration: line-through;
  color: gray;
}

.delete-button {
  border: none;
  background: #ff5252;
  color: white;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.filters button {
  padding: 6px 12px;
  border: none;
  background: #ddd;
  cursor: pointer;
  border-radius: 5px;
}

.filters button.active {
  background: #42b883;
  color: white;
}

.late {
  color: red;
  font-weight: bold;
}

.delete-button:hover {
  opacity: 0.9;
}
</style>