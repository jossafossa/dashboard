<template>
  <a :href="item.href" target="_blank">
    <article class="card-page">

      <header v-if="preview.thumbnail || preview.icon">
        <picture class="ratio ratio-square has-radius">
          <img :src="preview.thumbnail || preview.icon" :alt="item.name" />
        </picture>
      </header>

      <section>

        <span class="subtitle">{{ item.name }}</span>

        <h2 class="h6" v-if="preview.title">
          {{ preview.title }}
        </h2>

      </section>
    </article>
  </a>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const preview = ref({})

onMounted(() => {
  handlePreview();
});

const handlePreview = async () => {
  let previewResponse = await getPreview(props.item.href);
  if (previewResponse) {
    preview.value = previewResponse;
  }
}

const getPreview = async (url) => {
  let formData = new FormData();
  formData.append('url', url);
  let value = await fetch('https://preview.test/preview.php', {
    method: 'POST',
    body: formData
  });
  let json = await value.json();
  return json;
}


</script>