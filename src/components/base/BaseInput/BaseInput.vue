<script setup lang="ts">
interface Props {
  modelValue?: string | number
  label?: string
  placeholder?: string
  type?: string
  error?: string
  hint?: string
  disabled?: boolean
  required?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
}>()

const inputId = props.id ?? `input-${Math.random().toString(36).slice(2, 7)}`
</script>

<template>
  <div class="base-input" :class="{ 'base-input--error': !!error, 'base-input--disabled': disabled }">
    <label v-if="label" :for="inputId" class="base-input__label">
      {{ label }}
      <span v-if="required" class="base-input__required" aria-hidden="true">*</span>
    </label>

    <input
      :id="inputId"
      class="base-input__field"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="emit('blur', $event)"
    />

    <p v-if="error" :id="`${inputId}-error`" class="base-input__error" role="alert">{{ error }}</p>
    <p v-else-if="hint" :id="`${inputId}-hint`" class="base-input__hint">{{ hint }}</p>
  </div>
</template>

<style lang="scss" scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);

  @include m.element('label') {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-neutral-700);
  }

  @include m.element('required') {
    color: var(--color-danger);
    margin-left: var(--spacing-1);
  }

  @include m.element('field') {
    width: 100%;
    height: 40px;
    padding: 0 var(--spacing-3);
    font-size: var(--font-size-sm);
    color: var(--color-text);
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
    outline: none;

    &::placeholder { color: var(--color-neutral-400); }

    &:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgb(37 99 235 / 0.15);
    }

    &:disabled { background-color: var(--color-neutral-100); cursor: not-allowed; }
  }

  @include m.modifier('error') {
    .base-input__field {
      border-color: var(--color-danger);

      &:focus { box-shadow: 0 0 0 3px rgb(220 38 38 / 0.15); }
    }
  }

  @include m.element('error') {
    font-size: var(--font-size-xs);
    color: var(--color-danger);
  }

  @include m.element('hint') {
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
  }
}
</style>
