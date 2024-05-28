<template>
  <div class="question">
    <h3>{{ question.title }}</h3>
    <p>{{ question.subtitle }}</p>
    <div v-if="question.type === 'text'">
      <!-- Input field for text type -->
      <input type="text" v-model="answer">
    </div>
    <div v-else-if="question.type === 'simple_choice'">
      <!-- Input fields for simple choice type -->
      <div v-for="(option, index) in question.options" :key="index">
        <input type="checkbox" :id="'option' + index" v-model="selectedOptions[index]">
        <label :for="'option' + index">{{ option.text }}</label>
      </div>
    </div>
    <div v-else-if="question.type === 'multiple_choice'">
      <!-- Input fields for multiple choice type -->
      <div v-for="(option, index) in question.options" :key="index">
        <input type="checkbox" :id="'option' + index" v-model="selectedOptions[index]">
        <label :for="'option' + index">{{ option.text }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Object  // Object representing the question
  },
  data() {
    return {
      answer: '',  // For text type
      selectedOptions: []  // For simple_choice and multiple_choice types
    };
  }
};
</script>