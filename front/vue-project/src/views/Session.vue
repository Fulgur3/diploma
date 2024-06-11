<template>
    <div class="session-page">
      <h2 v-if="session">{{ session.quiz.title }}</h2>
      <div v-if="session" v-for="(question, index) in session.quiz.questions" :key="question.id">
        <div class="question">
          <p>{{ question.title }}</p>
          <p v-if="question.subtitle">{{ question.subtitle }}</p>
          <div v-if="question.type === 'single'">
            <div v-for="option in question.options" :key="option.id">
              <input 
                type="radio" 
                :id="'option-' + option.id" 
                :name="'question-' + question.id" 
                :value="option.label" 
                v-model="answer[question.id]" 
                v-on:change="e=>handleChange(question.id,option.label)"
              />
              <label :for="'option-' + option.id">{{ option.label }}</label>
            </div>
          </div>
          <div v-else-if="question.type === 'multiple'">
            <div v-for="option in question.options" :key="option.id">
              <input 
                type="checkbox" 
                :id="'option-' + option.id" 
                :name="'question-' + question.id" 
                :value="option.label" 
                :checked="selectedOptions[question.id] && selectedOptions[question.id].includes(option.id)" 
                @change="updateMultipleSelection(question.id, option.id)" 
              />
              <label :for="'option-' + option.id">{{ option.label }}</label>
            </div>
          </div>
          <div v-else-if="question.type === 'text'">
            <textarea 
              :name="'question-' + question.id" 
              v-model="textAnswers[question.id]"
            ></textarea>
          </div>
        </div>
      </div>
      <button @click="submitAnswers">Submit Answers</button>
    </div>
  </template>
  
  <script>
  import { sendRequest } from "@/scripts/request.js";
  
  export default {
    data() {
      return {
        answers: {},
        session: null,
        selectedOptions: {}, // обрані варіанти для питань типу single та multiple
        textAnswers: {}, // текстові відповіді на питання типу text
      };
    },
    mounted() {
      this.getSession();
    },
    methods: {
      async getSession() {
        const sessionCode = this.$route.params.code;
        try {
          const response = await sendRequest(`/session/${sessionCode}`, 'GET');
          if (response.ok) {
            this.session = await response.json();
          } else {
            console.error('Failed to fetch session data');
          }
        } catch (error) {
          console.error('Error fetching session data:', error);
        }
      },
      updateMultipleSelection(questionId, optionId) {
        if (!this.selectedOptions[questionId]) {
          this.$set(this.selectedOptions, questionId, []);
        }
        const index = this.selectedOptions[questionId].indexOf(optionId);
        if (index > -1) {
          this.selectedOptions[questionId].splice(index, 1);
        } else {
          this.selectedOptions[questionId].push(optionId);
        }
      },
      async submitAnswers() {
        const answers = [];
        for (const questionId in this.selectedOptions) {
          if (this.selectedOptions.hasOwnProperty(questionId)) {
            answers.push({
              questionId: parseInt(questionId),
              selectedOptions: this.selectedOptions[questionId],
              textAnswer: this.textAnswers[questionId] || ''
            });
            try {
          const response = await sendRequest(`/session/${this.session.id}/question/${this.question.id}/answer`, 'POST', answer);
          if (response.ok) {
            alert('Answers submitted successfully!');
          } else {
            console.error('Failed to submit answers');
          }
        } catch (error) {
          console.error('Error submitting answers:', error);
        }
          }
        }
        
      }
    }
  };
  </script>
  
  <style scoped>
  .session-page {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .question {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .question p {
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  label {
    margin-left: 5px;
  }
  
  textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    resize: vertical;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  