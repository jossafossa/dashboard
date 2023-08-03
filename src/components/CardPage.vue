<template>
  <a :href="item.href" target="_blank">
    <article class="card-page">
      <header v-if="preview.thumbnail || preview.icon">
        <picture class="ratio ratio-square has-radius">
          <img :src="preview.thumbnail || preview.icon" :alt="item.name" />
        </picture>
      </header>

      <section>
        <div class="hstack gap-1">
          <button @click.prevent="$emit('remove')"><i class="fa-solid fa-trash"></i></button>
          <button @click.prevent="$emit('edit')"><i class="fa-solid fa-pencil"></i></button>
        </div>
        <span class="subtitle">{{ item.name }}</span>

        <h2 class="h6" v-if="preview.title">
          {{ preview.title }}
        </h2>
      </section>
    </article>
  </a>
</template>

<script setup>
import { defineProps, onMounted, ref, defineEmits } from 'vue'

// DEV = true when the url includes .test

let DEV = window.location.href.includes('.test')

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

defineEmits(['remove', 'edit'])

const preview = ref({})

onMounted(() => {
  handlePreview()
})

const handlePreview = async () => {
  let previewResponse = await getPreview(props.item.href)
  if (previewResponse) {
    preview.value = previewResponse
  }
}

const getPreview = async (url) => {
  let formData = new FormData()
  formData.append('url', url)
  let host = DEV ? 'http://www.preview.test/preview.php' : 'https://www.jossafossa.nl/preview.php'
  let value = await fetch(host, {
    method: 'POST',
    body: formData
  })
  let json = await value.json()
  return json
}
</script>
