<script>
import { defineNuxtComponent } from "#app";

export default defineNuxtComponent({
  data: () => ({
    todoList: [],
  }),
  methods: {
    fetchTodoList() {
      fetch("https://jsonplaceholder.typicode.com/todos/")
        .then((response) => response.json())
        .then((json) => {
          this.todoList = json;
        });
    },
  },
});
</script>

<template>
  <div>
    <img src="./nav.jpg" alt="By Workshop&" />
    <p>
      Photo by
      <a
        href="https://unsplash.com/@workshopand?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >Workshop&</a
      >
      on
      <a
        href="https://unsplash.com/s/photos/todoList?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >Unsplash</a
      >
    </p>

    <h1>hello FrontEnd Masters</h1>
    <button @click="fetchTodoList">Fetch Data</button>

    <ul>
      <li v-for="todo in todoList" :key="`todo-key-${todo.key}`">
        <input type="checkbox" :checked="todo.completed" /> {{ todo.title }}
      </li>
    </ul>
  </div>
</template>
