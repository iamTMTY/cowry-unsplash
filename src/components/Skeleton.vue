<script setup lang="ts">
</script>

<template>
  <div class="skeleton">
    <div class="skeleton_content">
      <p class="skeleton_paragraph"></p>
      <p class="skeleton_paragraph"></p>
    </div>
  </div>
</template>

<style scoped>
.skeleton {
  background-color: #F5F5F5;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  display: flex;
  align-items: flex-end;
  position: relative;
  overflow: hidden;
}

.skeleton_content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 20px;
}

.skeleton_paragraph::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  height: 100%;
  width: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0) 100%);
  animation: shimmer 1.5s infinite;
}

.skeleton_paragraph {
  background-color: #E7E7E7;
  height: 1rem;
  position: relative;
  overflow: hidden;
}

.skeleton_paragraph:first-child {
  width: 50%;
}

.skeleton_paragraph:nth-child(2) {
  width: 35%;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
