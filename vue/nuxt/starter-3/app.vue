<script>
import { defineNuxtComponent } from "#app";

export default defineNuxtComponent({
  data: () => ({
    photoGallary: [],
  }),
  computed: {
    numberOfPhotos() {
      return this.photoGallary.length;
    },
  },
  methods: {
    fetchPhotoGallary() {
      fetch("https://jsonplaceholder.typicode.com/photos")
        .then((response) => response.json())
        .then((json) => {
          this.photoGallary = json;
        });
    },
  },
});
</script>

<template>
  <h1>Photo Gallary</h1>
  <button @click="fetchPhotoGallary">Fetch Data</button>
  <p>{{ numberOfPhotos }} photos</p>
  <ul>
    <li v-for="photo in photoGallary" :key="`photo-id-${photo.id}`">
      <img :src="photo.thumbnailUrl" />
    </li>
  </ul>
</template>

<style></style>
