<template>
  <div>
    When controlling the flow of text, using the CSS property
    <span class="inline bg-slate-500">display: inline</span>
    will cause the text inside the element to wrap normally. While using the
    property
    <span class="inline-block bg-slate-500">display: inline-block</span> will
    wrap the element to prevent the text inside from extending beyond its
    parent. Lastly, using the property
    <span class="block bg-slate-500">display: block</span>
    will put the element on its own line and fill its parent.
  </div>
  <div>
    <div class="flex items-center">
      <div class="object-contain w-52 h-52">
        <img
          src="https://dogefs.s3.ladydaily.com/~/source/unsplash/photo-1674806706838-94ee66a78f7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
        />
      </div>
      <div>
        <strong class="block">Andrew Alfred</strong>
        <span class="block">Technical advisor</span>
      </div>
    </div>
  </div>

  <!-- <div class="inline-grid grid-cols-4 grid-rows-5 gap-4">
    <div v-for="item in 20">a grid unit</div>
  </div> -->
</template>

<script setup lang="ts"></script>

<style scoped></style>
