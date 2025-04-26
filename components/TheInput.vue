<script setup lang="ts">
interface iProps {
  required?: boolean
  id: string
  title: string
  name: string
  type?: string
  validation?: string
  validationText?: string
  error?: boolean
  placeholder: string
}

const props = defineProps<iProps>()

const emit = defineEmits(['inputValue'])

const {
  inputValue,
  error,
  $input,
  onFocus,
  onBlur,
  onInput,
  reset,
  throwError,
} = useInput(emit, props)

defineExpose({
  throwError,
  reset,
})
</script>

<template>
  <label
    class="input"
    :class="type === 'textarea' && 'input--textarea'"
    :for="id"
  >
    <span class="input__title">{{ title }}*</span>
    <textarea
      v-if="type === 'textarea'"
      :id="id"
      ref="$input"
      v-model="inputValue"
      class="input__type input__type--textarea"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
    />
    <input
      v-else
      :id="id"
      ref="$input"
      v-model="inputValue"
      class="input__type"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
    />
    <div v-if="type !== 'textarea'" class="input__line" />
    <small v-if="error" class="input__error">
      {{ validationText }}
    </small>
  </label>
</template>
