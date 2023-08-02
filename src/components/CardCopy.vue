<template>
  <button @click="copyToClipboard(item.value)" target="_blank">
    <article class="card-copy">
      <section>
        <h2>{{ item.name }}</h2>
      </section>
    </article>
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  item: {
    type: Object,
    required: true
  }
});

const copyToClipboard = (value) => {
  console.log(value);
  navigator.clipboard.writeText(value);
};


</script>

<style lang="scss"></style>