<template>
<div>
    <form>
        <div v-for="(formLabel, index) in formLabels" :key="index">
            <div v-if="index === currentFormStep" class="step-container">
                <span>Etapa 
                    <span class="current-step">{{ index + 1 }}</span>
                    de {{ formLabels.length }}
                </span>
                <h1>{{ handleLabel(formLabel) }}</h1>
                <!-- COLOCAR AQUI MENSAGEM DE SUCESSO OU ERRO NO CADASTRO(TALVEZ VALIDAR NOVAMENTE OS DADOS ANTES DE ENVIAR) -->
                <FormStep :fields="filteredFields(index)" :handleLabel="handleLabel"/>
            </div>
        </div>
        <div class="step-buttons-container">
            <button
                v-if="currentFormStep > 0" class="step-button-outlined"
                @click.prevent="handleSteps(false)"
            >
                Voltar
            </button>
            <button
                :type="isSubmitButton() ? 'submit' : ''"
                class="step-button"
                @click.prevent="handleSteps(true)"
            >
                {{ isSubmitButton() ? 'Cadastrar' : 'Continuar' }}
            </button>
        </div>
        <div v-if="submitStatusMessage.enabled" class="status-message-container">
            <p :class="submitStatusMessage.class">{{ submitStatusMessage.message }}</p>
        </div>
    </form>
</div>
</template>
<script setup>
import { ref, computed } from 'vue';
import FormStep from '@/components/Form/FormStep.vue'

const formLabels = ref([
    'Seja bem-vindo(a)',
    ['Pessoa Física', 'Pessoa Jurídica'],
    'Senha de acesso',
    'Revise suas informações'
])

const currentFormStep = ref(0)
const formRevision = ref(true)
const submitStatusMessage = ref({
    enabled: false,
    class: 'status-message-loading',
    message: 'Cadastrando usuário...',
})

const formFields = ref([
    {
        field: 'email',
        type: 'text',
        label: 'Endereço de e-mail',
        step: 0,
        allow_revision: true,
        options: null,
        rules: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/],
        error: false,
        error_message: 'Forneça um email válido',
        content: null
    },
    {
        field: 'person_type',
        type: 'radio',
        label: '',
        step: 0,
        allow_revision: false,
        options: [
            {
                label: 'Pessoa física',
                value: 'natural_person'
            },
            {
                label: 'Pessoa jurídica',
                value: 'legal_person'
            }
        ],
        rules: [/^.+$/],
        error: false,
        error_message: 'Campo obrigatório',
        content: 'natural_person'
    },
    {
        field: 'name',
        type: 'text',
        label: ['Nome', 'Razão social'],
        step: 1,
        allow_revision: true,
        options: null,
        rules: [/^.+$/],
        error: false,
        error_message: 'Campo obrigatório',
        content: null
    },
    {
        field: 'document',
        type: 'number',
        label: ['CPF', 'CNPJ'],
        step: 1,
        allow_revision: true,
        options: null,
        rules: [/^\d{11}$/, /^\d{14}$/],
        error: false,
        error_message: 'Forneça um número válido',
        content: null
    },
    {
        field: 'birth_date',
        type: 'date',
        label: ['Data de nascimento', 'Data de abertura'],
        step: 1,
        allow_revision: true,
        options: null,
        rules: [/^\d{4}-\d{2}-\d{2}$/],
        error: false,
        error_message: 'Campo obrigatório',
        content: ''
    },
    {
        field: 'phone',
        type: 'number',
        label: 'Telefone',
        step: 1,
        allow_revision: true,
        options: null,
        rules: [/^\d{11}$/],
        error: false,
        error_message: 'Forneça um número válido',
        content: null
    },
    {
        field: 'password',
        type: 'password',
        label: 'Sua senha',
        step: 2,
        allow_revision: true,
        options: null,
        rules: [/^.{6,}$/],
        error: false,
        error_message: 'Digite uma senha com mais de 6 caracteres',
        content: null
    }
])

const personType = computed(() => {
    let type = formFields.value.find((field) => field.field === 'person_type')
    if (!type) {
        return 'natural_person'
    }
    return type.content
})

const isSubmitButton = () => {
    let isSubmit = currentFormStep.value === (formLabels.value.length - 1)
    return isSubmit
}

const filteredFields = (step) => {
    let fields = []
    if (formRevision.value && currentFormStep.value === (formLabels.value.length - 1)) {
        fields = formFields.value.filter((field) => field.allow_revision)
        return fields
    }
    fields = formFields.value.filter((field) => field.step === step)
    return fields
}

const handleLabel = (labels) => {
    if (!Array.isArray(labels)) {
        return labels
    }
    
    let label = personType.value === 'natural_person' ? labels[0] : labels[1]

    return label
}

const handleItem = () => {
    let item = {}
    formFields.value.forEach((formField) => {
        item[formField.field] = formField.content
    })

    return item
}

const handleResetFields = () => {
    let fields = []
    formFields.value.forEach((formField) => {
        formField.content = formField.field === 'person_type' ? 'natural_person' : null
    })

    return fields
}

const handleValidation = (fields) => {
    fields.forEach((formField) => {
        let rule = ''
        if (Array.isArray(formField.label) && formField.rules.length > 1) {
            rule = personType.value === 'natural_person' ? formField.rules[0] : formField.rules[1]
        } else {
            rule = formField.rules[0]
        }

        if (!rule.test(formField.content)) {
            formField.error = true
        } else {
            formField.error = false
        }
    })
}

const handleSteps = async (option) => {
    if (!option && currentFormStep.value > 0) {
        currentFormStep.value--
    }

    handleValidation(filteredFields(currentFormStep.value))
    let invalidFields = filteredFields(currentFormStep.value).find((field) => field.error)
    if (invalidFields) {
        return
    }
    
    if (option) {
        if (currentFormStep.value === (formLabels.value.length - 1)) {
            await handleSubmit()
            return
        }
        currentFormStep.value++
    }
}

const handleSubmit = async () => {
    let item = handleItem()
    try {
        submitStatusMessage.value.enabled = true
        const response = await fetch('/registration', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        const result = await response.json();
        if (result.status === 200) {
            submitStatusMessage.value.class = "status-message-success";
            submitStatusMessage.value.message = "Cadastro realizado com sucesso!";
            currentFormStep.value = 0
            handleResetFields()
        } else {
            submitStatusMessage.value.class = "status-message-error";
            submitStatusMessage.value.message = "Erro ao cadastrar pois há campos não preenchidos";
        }
    } catch (error) {
        submitStatusMessage.value.class = "status-message-error";
        submitStatusMessage.value.message = "Erro ao tentar cadastrar, tente novamente";
    }
}
</script>
<style scoped>
form {
    display: flex;
    flex-direction: column;
}

form h1 {
    font-size: 2.5vh;
    font-weight: 600;
    margin-bottom: 2vh;
}

form span {
    font-size: 1.5;
    color: #888888;
    margin-bottom: 2vh;
}

.current-step {
    color: #ff9900;
}

.step-buttons-container {
    display: flex;
    justify-content: space-between;
    margin-top: 4vh;
    gap: 2vh;
}

.step-button-outlined,
.step-button {
    padding: 1vh 2vh;
    border: 2px solid #ff9900;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    flex: 1;
}

.step-button-outlined {
    background-color: #ffffff;
    color: #ff9900;
}

.step-button {
    background-color: #ff9900;
    color: #ffffff;
}

.step-button-outlined:hover,
.step-button:hover {
    opacity: 0.8;
}

.status-message-container {
    text-align: center;
    font-size: 1.75vh;
    padding-top: 2vh;
}

.status-message-loading {
    color: rgb(255, 251, 15);
}

.status-message-success {
    color: rgb(15, 255, 15);
}

.status-message-error {
    color: rgb(255, 15, 15);
}
</style>
