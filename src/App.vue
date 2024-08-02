<template>
  <main id="app">
    <div class="form-container">
      <Form />
    </div>
  </main>
</template>
<script setup>
import Form from '@/components/Form/Form.vue'
</script>
<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  background-color: #e0e0e0;
  font-family: 'Roboto';
}

.form-container {
  background-color: #f0f0f0;
  width: 40vh;
  padding: 4vh;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .form-container {
    width: 37.5vh;
    padding: 2vh;
  }
}
</style>