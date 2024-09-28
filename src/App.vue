<script setup lang="ts">
import ImageCard from 'components/ImageCard.vue';
import Skeleton from 'components/Skeleton.vue'
import ImageModal from 'components/ImageModal.vue'
import { ImageType } from 'types';
import api from 'utilities/api';
import {ref, onBeforeMount} from 'vue'

  const PAGE_SIZE = 20
  const SKELETON_COUNT = new Array(PAGE_SIZE).fill('skeleton')
  const images = ref<Array<ImageType>>([])
  const isLoading = ref(true)
  const modalData = ref<ImageType>()
  const search = ref('')

  const showModal = (image: ImageType) => {
    modalData.value = image
  }

  const getImages = async (query?: string) => {
    try {
      isLoading.value = true
      const url = query ? `/search/photos?query=${query}&page=1&per_page=${PAGE_SIZE}` : `/photos?page=1&per_page=${PAGE_SIZE}`
      let res = await api.get(url)
      if(res.status === 200) {
        images.value = res.data?.results || res.data
      }
      isLoading.value = false
    } catch (error) {
      
    }
  } 

  const setSearch = (query?: string) => {
    search.value = query || ''
    getImages(query)
  }

  const handleSearch = (event?: KeyboardEvent) => {
    if(event && event.key === 'Enter') {
      const query = (event.target as HTMLInputElement).value
      setSearch(query)
    }
  }

  onBeforeMount(getImages)

</script>

<template>
  <div class="main">
    <div class="main_content">
      <div class="search_result_component" v-if="!!search">
        <div class="back_component" :onclick="() => setSearch()"><img src="./assets/back.svg" class="back_icon" alt="back" /></div>
        <p class="search_result">Search results for "{{ search }}"</p>
      </div>
      <div class="search_component" v-else="!!search">
        <img src="./assets/search.svg" class="search_icon" alt="search" />
        <input type="text" class="search_input" placeholder="search for photo" :onkeypress="handleSearch" />
      </div>
      <div class="grid">
        <template v-for="(_s,_i) in SKELETON_COUNT" :key="'skeleton'+_i" v-if="isLoading">
          <Skeleton />
        </template>
        <template v-for="image in images" :key="image.id" v-if="!isLoading">
          <ImageCard :data="image" :open="() => showModal(image)"/>
        </template>
      </div>
    </div>
  </div>
  <ImageModal v-bind:data="modalData" :closeModal="() => modalData = undefined" />
</template>

<style scoped>
.main {
  min-height: calc(100vh - 0px);
  background: -webkit-linear-gradient(top, #DDE2E8 300px, white 0%);
  background: -moz-linear-gradient(top, #DDE2E8 300px, white 0%);
  background: -ms-linear-gradient(top, #DDE2E8 300px, white 0%);
  background: linear-gradient(top, #DDE2E8 300px, white 0%);
  padding: 120px 0px;
}
.main_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  max-width: 1300px;
  margin: 0 auto;
}
.search_result_component {
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
}
.back_component {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1000px;
  transition: all linear 200ms;
}
.back_icon {
  width: 30px;
  height: 30px;
}
.back_component:hover {
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.search_result {
  font-size: 2.5rem;
  font-weight: 600;
}
.search_component {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 16px;
  background-color: white;
  border-radius: 5px;
  width: 100%;
  max-width: 800px;
}
.search_icon {
  width: 20px;
  height: 20px;
}
.search_input {
  width: 100%;
  font-size: 16px;
  border: none;
  outline: none;
  background-color: transparent;
  color: black;
}
.grid {
  margin-top: 50px;
  width: 100%;
  /* max-width: 1300px; */
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 50px;
  gap: 20px;
}

.grid > :nth-child(2n - 1) {
  grid-row: span 6;
}

.grid > :nth-child(2n) {
  grid-row: span 8;
}

@media only screen and (min-width: 600px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
