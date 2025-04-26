<script setup lang="ts">
interface iInput {
  title: string
  required: boolean
  id: string
  name: string
  placeholder: string
  type: string
  validation?: string
  validationText?: string
  error: boolean
  value: string
}

const inputsList = reactive<iInput[]>([
  {
    title: 'Name',
    required: true,
    id: 'name',
    name: 'Name',
    placeholder: 'enter your name',
    type: 'text',
    validation: 'name',
    validationText: 'incorrect name',
    error: true,
    value: '',
  },
  {
    title: 'Email',
    required: true,
    id: 'email',
    name: 'Email',
    placeholder: 'enter your email',
    type: 'text',
    validation: 'email',
    validationText: 'incorrect email',
    error: true,
    value: '',
  },
  {
    title: 'Subject',
    required: true,
    id: 'subject',
    name: 'Subject',
    placeholder: 'what would you like to chat about',
    type: 'text',
    validation: 'subject',
    validationText: 'incorrect subject',
    error: true,
    value: '',
  },
  {
    title: 'Message',
    required: false,
    id: 'message',
    name: 'Message',
    placeholder: 'please provide additional details',
    type: 'textarea',
    error: false,
    value: '',
  },
])

const isErrors = computed(
  () => !!inputsList.filter(input => input.error).length
)

const $inputs = ref(null)

const onSubmit = async () => {
  try {
    const formData = new FormData()

    inputsList.forEach(el => {
      formData.append(el.name, el.value)
    })
    await fetch('https://formspree.io/f/xrgngrzb', {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    })
    setTimeout(() => {
      inputsList.forEach(input => (input.value = ''))
      $inputs.value?.forEach(input => input?.reset())
    }, 0)
    alert('Thank you for your message!')
  } catch (error) {
    alert('Something went wrong! Pease try again later.')
    console.log(error)
  }
}

const onChange = val => {
  const input = inputsList.find(input => input.id === val.id)
  if (!input) return
  input.value = val.value
  input.error = val.error
}
</script>

<template>
  <form class="form" novalidate @submit.prevent="onSubmit">
    <div class="form__inputs-wrapper">
      <TheInput
        v-for="(input, idx) in inputsList"
        :id="input.id"
        ref="$inputs"
        :key="idx"
        :required="input.required"
        :title="input.title"
        :name="input.name"
        :type="input.type"
        :validation="input.validation"
        :validation-text="input.validationText"
        :error="input.error"
        :placeholder="input.placeholder"
        @input-value="onChange"
      />
    </div>
    <button type="submit" class="form__btn" :disabled="isErrors">
      <span>SEND</span>
    </button>
  </form>
</template>
