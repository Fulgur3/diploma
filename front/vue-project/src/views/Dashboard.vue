<template>
    <div class="dashboard">
      <h1>Dashboard</h1>
      <div class="tabs">
        <button @click="currentTab = 'sessions'" :class="{ active: currentTab === 'sessions' }">Sessions</button>
        <button @click="currentTab = 'quizzes'" :class="{ active: currentTab === 'quizzes' }">Quizzes</button>
      </div>
      <div v-if="currentTab === 'sessions'">
        <h2>Sessions</h2>
        <ul>
          <li v-for="session in sessions" :key="session.id">
            {{ session.name }}
            <!-- Add more session details here -->
          </li>
        </ul>
        <button @click="createSession">Create Session</button>
      </div>
      <div v-if="currentTab === 'quizzes'">
        <h2>Quizzes</h2>
        <ul>
          <li v-for="quiz in quizzes" :key="quiz.id">
            {{ quiz.name }}
            <button @click="editQuiz(quiz.id)">Edit Quiz</button>
            <!-- Add more quiz details here -->
          </li>
        </ul>
        <button @click="createQuiz">Create Quiz</button>
      </div>
      <div v-if="showQuizForm">
        <h2>Create Quiz</h2>
        <form @submit.prevent="submitQuiz">
          <div>
            <label for="quizName">Quiz Name:</label>
            <input type="text" id="quizName" v-model="newQuiz.name" required>
          </div>
          <div>
            <button type="button" @click="addQuestion">Add Question</button>
          </div>
          <div v-for="(question, index) in newQuiz.questions" :key="index">
            <label :for="'question' + index">Question {{ index + 1 }}:</label>
            <input :id="'question' + index" v-model="question.text" required>
            <button type="button" @click="editQuestion(index)">Edit</button>
          </div>
          <button type="submit">Save Quiz</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentTab: 'sessions',
        sessions: [
          // Example sessions data
          { id: 1, name: 'Session 1' },
          { id: 2, name: 'Session 2' },
        ],
        quizzes: [
          // Example quizzes data
          { id: 1, name: 'Quiz 1' },
          { id: 2, name: 'Quiz 2' },
        ],
        showQuizForm: false,
        newQuiz: {
          name: '',
          questions: [],
        },
      };
    },
    methods: {
      createSession() {
        // Implement session creation logic
        alert('Create Session functionality');
      },
      createQuiz() {
        this.showQuizForm = true;
      },
      submitQuiz() {
        // Implement quiz submission logic
        alert('Quiz Created: ' + JSON.stringify(this.newQuiz));
        this.showQuizForm = false;
        this.newQuiz = { name: '', questions: [] };
      },
      addQuestion() {
        this.newQuiz.questions.push({ text: '' });
      },
      editQuiz(quizId) {
        // Implement quiz editing logic
        alert('Edit Quiz: ' + quizId);
      },
      editQuestion(index) {
        // Implement question editing logic
        alert('Edit Question: ' + index);
      },
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    padding: 20px;
  }
  
  .tabs {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }
  
  .tabs button {
    padding: 10px 20px;
    cursor: pointer;
  }
  
  .tabs button.active {
    background-color: #007bff;
    color: white;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  ul li {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
  }
  
  button {
    margin: 5px;
  }
  
  form div {
    margin: 10px 0;
  }
  
  label {
    display: block;
  }
  </style>
  