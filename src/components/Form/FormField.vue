<template>
<div class="form-field">
    <div v-if="field.type === 'radio'" class="field-radios">
        <div v-for="option in field.options" :key="option.value">
            <label>
                <input
                    v-model="field.content"
                    type="radio" name="location"
                    :value="option.value"
                    class="field-radio"
                />
                {{ option.label }}
            </label>
        </div>
    </div>
    <div v-else class="field-text">
        <label :for="field.field">{{ handleLabel(field.label) }}</label>
        <br>
        <input
            v-model="field.content"
            :type="field.type"
            class="field-input"
            :class="{'field-error': field.error}"
        />
    </div>
    <div v-if="field.error">
        <span class="error-message">{{ field.error_message }}</span>
    </div>
</div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  field: Object,
  handleLabel: Function,
})

const field = ref(props.field)
const handleLabel = ref(props.handleLabel)
</script>
<style scoped>
.form-field {
    display: flex;
    flex-direction: column;
    width: calc(100% - 2vh);
    min-width: 100%;
}

label {
    margin-bottom: 1vh;
    font-size: 1.4vh;
    color: #202020;
}

.field-input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.field-radios {
    display: flex;
    gap: 2vh;
    justify-content: start;
    align-items: center;
    width: 100%;
    margin-top: 2vh;
}

.field-radio {
    margin-right: 1vh;
}

.field-error {
  border-color: rgb(255, 15, 15);
}

.error-message {
  color: rgb(255, 15, 15);;
  font-size: 1vh;
}
@media (max-width: 768px) {
    .form-field {
        flex-direction: column;
        text-align: left;
        flex: 1 1 100%;
        width: 100%;
    }

    .field-radios {
        align-items: center;
    }
}
</style>
