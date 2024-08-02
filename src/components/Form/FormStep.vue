<template>
<div>
    <div v-for="field in fields" :key="field.field">
        <FormField :field="field" :handleLabel="handleLabel"/>
    </div>
</div>
</template>
<script setup>
import { ref } from 'vue';
import FormField from '@/components/Form/FormField.vue'

const props = defineProps({
  fields: Array,
  handleLabel: Function,
})

const fields = ref(props.fields)
const handleLabel = ref(props.handleLabel)

</script>
