<script setup lang="ts">
import { ImageType } from 'types';

defineProps<{ data: ImageType; open?: () => void }>()
</script>

<template>
  <div class="card" @click="open">
    <img class="card_img" :src="data.urls.small" :alt="data.alt_description || data.description || ''" />
    <div class="overlay"></div>
    <div class="card_content">
      <p class="card_paragraph">{{ data.alt_description || data.description || '' }}</p>
      <p class="card_paragraph">{{ data.user.location || '' }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #F5F5F5;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  display: flex;
  align-items: flex-end;
  position: relative;
}

.card:hover > .overlay {
  opacity: 1;
}

.card:hover > .card_content {
  opacity: 1;
}

.overlay {
  opacity: 0;
  position: absolute;
  transition: opacity linear 300ms;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%);
  background: -webkit-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%);
  background: -moz-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%);
  background: -ms-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%);
}

.card_img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.card_content {
  opacity: 0;
  transition: opacity linear 300ms;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 20px;
  position: relative;
  z-index: 5;
}

.card_paragraph {
  font-size: 1rem;
  color: white;
}

.card_paragraph:nth-child(2) {
  font-weight: 300;
}
</style>
