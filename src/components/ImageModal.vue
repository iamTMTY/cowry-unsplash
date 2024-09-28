<script setup lang="ts">
import { ImageType } from 'types';
import { watch } from 'vue';

const props = defineProps<{ data?: ImageType; closeModal: () => void }>()

watch(() => props.data, () => {
  if(props.data?.id) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})
</script>

<template>
  <div v-if="!!data" class="modal-backdrop" @click="closeModal">
    <div class="modal-content" @click.stop>
      <img class="modal_img" :src="data?.urls?.full || ''" :alt="data.alt_description || data.description || ''">
      <div class="card_content">
        <p class="card_paragraph">{{ data.alt_description || data.description || '' }}</p>
        <p class="card_paragraph">{{ data.user.location || '' }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal_img {
  width: 100%;
  height: calc(100% - 100px);
  object-fit: cover;
  object-position: center;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.modal-content {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  max-width: 800px;
  max-height: 800px;
  width: 90vw;
  height: 70vh;
  overflow: hidden;
}

.card_content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  height: 100px;
  padding: 20px;
}

.card_paragraph {
  font-size: 1rem;
}

.card_paragraph:nth-child(2) {
  font-weight: 300;
}
</style>
