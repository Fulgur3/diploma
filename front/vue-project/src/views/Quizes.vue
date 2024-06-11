<template>
  <div class="quiz-questions">
    <h1>Quiz Questions</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <ul class="question-list">
        <li v-for="question in questions" :key="question.id" class="question-item">
          <div class="question-header">{{ question.title }}</div>
          <div class="question-subtitle">{{ question.subtitle }}</div>
          <div v-if="question.type === 'single'" class="question-options single">
            <div v-for="option in question.options" :key="option.label" class="option">
              <input type="radio" :name="'question-' + question.id" :value="option.label" disabled />
              <label :class="{ correct: option.value === 1 }">{{ option.label }}</label>
            </div>
          </div>
          <div v-if="question.type === 'multiple'" class="question-options multiple">
            <div v-for="option in question.options" :key="option.label" class="option">
              <input type="checkbox" :value="option.label" disabled />
              <label :class="{ correct: option.value === 1 }">{{ option.label }}</label>
            </div>
          </div>
          <div v-if="question.type === 'text'" class="question-options text">
            <p>Expected answer: {{ question.options[0].answer }}</p>
          </div>
          <button @click="editQuestion(question)" class="edit-question-button">Edit</button>
          <button @click="deleteQuestion(question.id)" class="delete-question-button">Delete</button>
        </li>
      </ul>
    </div>
    <button @click="showAddQuestionModal" class="add-question-button">Add Question</button>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ isEditing ? 'Edit Question' : 'Add New Question' }}</h2>
        <input v-model="newQuestionTitle" placeholder="Enter question title" class="input-question"/>
        <input v-model="newQuestionSubtitle" placeholder="Enter question subtitle" class="input-question"/>
        <select v-model="questionType" class="question-type-select">
          <option value="single">One correct answer</option>
          <option value="multiple">Multiple correct answers</option>
          <option value="text">Text answer</option>
        </select>
        <div v-if="questionType === 'single'" class="question-options single">
          <div v-for="(option, index) in singleOptions" :key="index" class="option">
            <input v-model="option.label" placeholder="Enter option text" class="input-option"/>
            <input type="radio" :value="index" v-model="correctSingleOption" /> Correct
            <button @click="removeSingleOption(index)" class="remove-option-button">Remove</button>
          </div>
          <button @click="addSingleOption" class="add-option-button">Add Option</button>
        </div>
        <div v-if="questionType === 'multiple'" class="question-options multiple">
          <div v-for="(option, index) in multipleOptions" :key="index" class="option">
            <input v-model="option.label" placeholder="Enter option text" class="input-option"/>
            <input type="checkbox" :value="index" v-model="correctMultipleOptions" /> Correct
            <button @click="removeMultipleOption(index)" class="remove-option-button">Remove</button>
          </div>
          <button @click="addMultipleOption" class="add-option-button">Add Option</button>
        </div>
        <div v-if="questionType === 'text'" class="question-options text">
          <input v-model="textAnswer" placeholder="Enter correct answer" class="input-option"/>
        </div>
        <button @click="isEditing ? updateQuestion() : addQuestion()" class="submit-button">{{ isEditing ? 'Update' : 'Submit' }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { sendRequest } from '@/scripts/request';

export default {
  data() {
    return {
      questions: [],
      loading: true,
      showModal: false,
      isEditing: false,
      editingQuestionId: null,
      newQuestionTitle: '',
      newQuestionSubtitle: '',
      questionType: 'single',
      singleOptions: [{ label: '', value: 0 }],
      correctSingleOption: 0,
      multipleOptions: [{ label: '', value: 0 }],
      correctMultipleOptions: [],
      textAnswer: '',
    };
  },
  mounted() {
    this.getQuiz();
  },
  methods: {
    async getQuiz() {
      const response = await sendRequest('/quiz/' + this.$route.params.id, 'GET');
      if (response.ok) {
        const data = await response.json();
        this.questions = data.questions;
        this.loading = false;
      }
    },
    showAddQuestionModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    addSingleOption() {
      this.singleOptions.push({ label: '', value: 0 });
    },
    removeSingleOption(index) {
      this.singleOptions.splice(index, 1);
    },
    addMultipleOption() {
      this.multipleOptions.push({ label: '', value: 0 });
    },
    removeMultipleOption(index) {
      this.multipleOptions.splice(index, 1);
    },
    async addQuestion() {
      if (this.newQuestionTitle.trim() === '') return;

      const newQuestion = {
        title: this.newQuestionTitle,
        subtitle: this.newQuestionSubtitle,
        type: this.questionType,
        options: [],
      };
      if (this.questionType === 'single') {
        newQuestion.options = this.singleOptions.map((option, index) => ({
          label: option.label,
          value: index === this.correctSingleOption ? 1 : 0
        }));
      } else if (this.questionType === 'multiple') {
        newQuestion.options = this.multipleOptions.map((option, index) => ({
          label: option.label,
          value: this.correctMultipleOptions.includes(index) ? 1 : 0
        }));
      } else if (this.questionType === 'text') {
        newQuestion.options = [{ answer: this.textAnswer }];
      }

      try {
        const response = await sendRequest('/quiz/' + this.$route.params.id + '/question', 'POST', newQuestion);
        if (response.ok) {
          this.questions.push(await response.json());
          this.closeModal();
        } else {
          const errorMessage = await response.text();
          alert(errorMessage);
        }
      } catch (error) {
        console.error('Error adding question:', error);
      }
    },
    async deleteQuestion(questionId) {
      try {
        const response = await sendRequest('/quiz/' + this.$route.params.id + '/question/' + questionId, 'DELETE');
        if (response.ok) {
          this.questions = this.questions.filter(question => question.id !== questionId);
        } else {
          const errorMessage = await response.text();
          alert(errorMessage);
        }
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    },
    editQuestion(question) {
      this.isEditing = true;
      this.editingQuestionId = question.id;
      this.newQuestionTitle = question.title;
      this.newQuestionSubtitle = question.subtitle;
      this.questionType = question.type;
      if (question.type === 'single') {
        this.singleOptions = question.options.map(option => ({ label: option.label, value: option.value }));
        this.correctSingleOption = question.options.findIndex(option => option.value === 1);
      } else if (question.type === 'multiple') {
        this.multipleOptions = question.options.map(option => ({ label: option.label, value: option.value }));
        this.correctMultipleOptions = question.options
          .map((option, index) => (option.value === 1 ? index : null))
          .filter(index => index !== null);
      } else if (question.type === 'text') {
        this.textAnswer = question.options[0].answer;
      }
      this.showModal = true;
    },
    async updateQuestion() {
      if (this.newQuestionTitle.trim() === '') return;

      const updatedQuestion = {
        title: this.newQuestionTitle,
        subtitle: this.newQuestionSubtitle,
        type: this.questionType,
        options: [],
      };
      if (this.questionType === 'single') {
        updatedQuestion.options = this.singleOptions.map((option, index) => ({
          label: option.label,
          value: index === this.correctSingleOption ? 1 : 0
        }));
      } else if (this.questionType === 'multiple') {
        updatedQuestion.options = this.multipleOptions.map((option, index) => ({
          label: option.label,
          value: this.correctMultipleOptions.includes(index) ? 1 : 0
        }));
      } else if (this.questionType === 'text') {
        updatedQuestion.options = [{ answer: this.textAnswer }];
      }

      try {
        const response = await sendRequest('/quiz/' + this.$route.params.id + '/question/' + this.editingQuestionId, 'PUT', updatedQuestion);
        if (response.ok) {
          const index = this.questions.findIndex(question => question.id === this.editingQuestionId);
          if (index !== -1) {
            this.questions.splice(index, 1, await response.json());
            this.closeModal();
          }
        } else {
          const errorMessage = await response.text();
          alert(errorMessage);
        }
      } catch (error) {
        console.error('Error updating question:', error);
      }
    },
    resetForm() {
      this.newQuestionTitle = '';
      this.newQuestionSubtitle = '';
      this.questionType = 'single';
      this.singleOptions = [{ label: '', value: 0 }];
      this.correctSingleOption = 0;
      this.multipleOptions = [{ label: '', value: 0 }];
      this.correctMultipleOptions = [];
      this.textAnswer = '';
      this.isEditing = false;
      this.editingQuestionId = null;
    },
  },
};
</script>

<style scoped>
.quiz-questions {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
}

.loading {
  text-align: center;
  color: #777;
}

.question-list {
  list-style-type: none;
  padding: 0;
}

.question-item {
  background: #f9f9f9;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.question-header {
  font-weight: bold;
}

.question-subtitle {
  font-style: italic;
  color: #666;
}

.question-options.single .option label.correct,
.question-options.multiple .option label.correct {
  color: green;
}

.add-question-button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.add-question-button:hover {
  background-color: #45a049;
}

.edit-question-button,
.delete-question-button {
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-question-button {
  background-color: #ffa500;
  color: white;
}

.edit-question-button:hover {
  background-color: #ff8c00;
}

.delete-question-button {
  background-color: #ff4c4c;
  color: white;
}

.delete-question-button:hover {
  background-color: #ff1c1c;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  border-radius: 10px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
}

.input-question,
.input-option,
.question-type-select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  box-sizing: border-box;
}

.add-option-button,
.remove-option-button,
.submit-button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.add-option-button:hover,
.remove-option-button:hover,
.submit-button:hover {
  background-color: #45a049;
}
</style>
