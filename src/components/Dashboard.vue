<template>
  <div class="dashboard">
    <div class="vstack gap-2">

      <div class="vstack gap-1">

        <h2>Pages</h2>

        <div class="grid stretch-cards">

          <CardPage v-for="item in pages" :key="item.id" :item="item"></CardPage>
          <button class='card flex-center' @click="addNewPage">
            <span class="button">
              Add new copy button
            </span>
          </button>
        </div>

      </div>

      <hr>

      <div class="vstack gap-1">

        <h2>Copy</h2>

        <div class="grid stretch-cards">
          <CardCopy v-for="item in copyItems" :key="item.id" :item="item"></CardCopy>

          <button class='card flex-center' @click="addNewCopyItem">
            <span class="button">
              Add new copy button
            </span>
          </button>
        </div>

      </div>


    </div>
  </div>
</template>

<script setup>
import state from '@/getState.js';
import CardPage from '@/components/CardPage.vue';
import CardCopy from '@/components/CardCopy.vue';

const pages = state.pages;
const copyItems = state.copyItems;

console.log(pages);

const addNewPage = () => {
  const name = prompt('Name of the new page');
  const href = prompt('URL of the new page');

  if (name && href) {
    state.pages.push({
      id: Date.now(),
      name,
      href
    });
  }
};

const addNewCopyItem = () => {
  const name = prompt('Name of the new copy item');
  const value = prompt('What do you want to copy');

  if (name && value) {
    state.copyItems.push({
      id: Date.now(),
      name,
      value
    });
  }

};

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