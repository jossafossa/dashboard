<template>
  <div class="dashboard">
    <div class="vstack gap-2">
      <div class="vstack gap-1">
        <h2>Pages</h2>

        <div class="grid stretch-cards">
          <CardPage
            v-for="item in pages"
            :key="item.id"
            :item="item"
            @remove="remove(item)"
            @edit="edit(item)"
          ></CardPage>
          <button class="card flex-center" @click="addNewPage">
            <span class="button"> Add page </span>
          </button>
        </div>
      </div>

      <hr />

      <div class="vstack gap-1">
        <h2>Copy</h2>

        <div class="grid stretch-cards">
          <CardCopy v-for="item in copyItems" :key="item.id" :item="item"></CardCopy>

          <button class="card flex-center" @click="addNewCopyItem">
            <span class="button"> Add copy value </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import state from '@/getState.js'
import CardPage from '@/components/CardPage.vue'
import CardCopy from '@/components/CardCopy.vue'

const pages = state.pages
const copyItems = state.copyItems

console.log(pages)

const remove = (item) => {
  const index = state.pages.indexOf(item)
  if (index > -1) {
    state.pages.splice(index, 1)
  }
}

const edit = (item) => {
  const newName = prompt('New name', item.name)
  if (newName) {
    item.name = newName
  }

  const newHref = prompt('New URL', item.href)
  if (newHref) {
    item.href = newHref
  }
}

const addNewPage = ({ name = false, href = false } = {}) => {
  name = name || prompt('Name of the new page')
  href = href || prompt('URL of the new page')

  if (name && href) {
    state.pages.push({
      id: Date.now(),
      name,
      href
    })
  }
}

const addNewCopyItem = () => {
  const name = prompt('Name of the new copy item')
  const value = prompt('What do you want to copy')

  if (name && value) {
    state.copyItems.push({
      id: Date.now(),
      name,
      value
    })
  }
}

// add a new url on a global paste anywhere on the page
window.addEventListener('paste', (event) => {
  console.log(event)
  const url = event.clipboardData.getData('text/plain')
  if (url) {
    addNewPage({
      href: url
    })
  }
})
</script>

<style lang="scss">
@import '@/assets/main.scss';

.dashboard {
  padding: 2rem;
}

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>
