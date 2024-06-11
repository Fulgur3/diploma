<template>
  <div class="dashboard">
    <div class="user-info">
      <h2>User Information</h2>
      <p><strong>Username:</strong> {{ userInfo.username }}</p>
      <p><strong>Email:</strong> {{ userInfo.email }}</p>
    </div> 

    <div class="tabs">
      <button @click="currentTab = 'quizzes'" :class="{ active: currentTab === 'quizzes' }">Quizzes</button>
      <button @click="currentTab = 'sessions'" :class="{ active: currentTab === 'sessions' }">Sessions</button>
    </div>        

    <div v-if="currentTab === 'sessions'">
      <input v-model="sessionCode" placeholder="Enter session code" class="input-search"/>
      <button @click="getSessionByCode">Search Session</button>
      <ul>
        <li v-for="session in sessions" :key="session.id">
          {{ session.code }}
          <div class="button-group">
            <button v-if="sessionFound" @click="takeSession(session.code)">Take Session</button>
            <button v-if="sessionFound" @click="showAnswers(session.code)">Show Answers</button>
          </div>
        </li>
      </ul>
      <button @click="createSession">Create Session</button>
      <form @submit.prevent="submitSession">
        <div class="form-group">
          <label for="quizSelect">Select Quiz:</label>
          <select name="quiz" id="quizSelect" v-model="newSession.quizId" required>
            <option v-for="quiz in quizzes" :key="quiz.id" :value="quiz.id">{{ quiz.title }}</option>
          </select>
          <button type="submit">Save Session</button>
        </div>
      </form>
    </div>

    <div v-if="currentTab === 'quizzes'">
      <ul>
        <li v-for="quiz in quizzes" :key="quiz.id">
          {{ quiz.title }}
          <div class="button-group">
            <button @click="editQuiz(quiz.id)">Edit Quiz</button>
            <button @click="deleteQuiz(quiz.id)">Delete Quiz</button>
          </div>
        </li>
      </ul>
      <button @click="createQuiz">Create Quiz</button>
    </div>

    <div v-if="showQuizForm" class="form-container">
      <h2>Create Quiz</h2>
      <form @submit.prevent="submitQuiz">
        <div class="form-group">
          <label for="quizName">Quiz Title:</label>
          <input type="text" id="quizName" v-model="newQuiz.title" required>
        </div>
        <button type="submit">Save Quiz</button>
      </form>
    </div>
  </div>
</template>

<script>
import { sendRequest } from "@/scripts/request.js";

export default {
  data() {
    return {
      userInfo: {
        username: '',
        email: '',
      },
      currentTab: 'sessions',
      sessions: [],
      quizzes: [],
      showQuizForm: false,
      newQuiz: {},
      newSession: {},
      sessionCode: '', // поле для ввода кода сессии
      sessionFound: false, // флаг, указывающий, что сессия найдена
    };
  },
  mounted() {
    this.getQuizes();
    this.getSessions();
    this.fetchUserInfo();
  },
  methods: {
    async getSessions() {
      const response = await sendRequest('/session', 'GET');
      if (response.ok) {
        this.sessions = await response.json();
      }
    },
    async getQuizes() {
      const response = await sendRequest('/quiz', 'GET');
      if (response.ok) {
        this.quizzes = await response.json();
      }
    },
    async getSessionByCode() {
      if (this.sessionCode.trim() === '') return;

      const response = await sendRequest(`/session/${this.sessionCode}`, 'GET');
      if (response.ok) {
        const session = await response.json();
        this.sessions = [session]; // показываем только найденную сессию
        this.sessionFound = true; // устанавливаем флаг, что сессия найдена
      } else {
        alert('Session not found');
        this.sessionFound = false; // сбрасываем флаг, если сессия не найдена
      }
    },
    async fetchUserInfo() {
      try {
        const response = await sendRequest(`/user/${localStorage.getItem("id")}`, 'GET');
        this.userInfo = await response.json();
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    },
    createQuiz() {
      this.showQuizForm = true;
    },
    async submitQuiz() {
      const response = await sendRequest('/quiz', 'POST', {
        title: this.newQuiz.title,
      });
      if (response.ok) {
        await this.getQuizes();
        this.showQuizForm = false;
        this.newQuiz = {};
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    },
    createSession() {
      alert('Create Session functionality');
    },
    async submitSession() {
      const response = await sendRequest('/session', 'POST', {
        quizId: this.newSession.quizId,
        isOpen: true,
      });
      if (response.ok) {
        await this.getSessions();
        this.newSession = {};
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    },
    editQuiz(quizId) {
      this.$router.push(`/quiz/${quizId}`);
    },
    async deleteQuiz(quizId) {
      const response = await sendRequest(`/quiz/${quizId}`, 'DELETE');
      if (response.ok) {
        await this.getQuizes();
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    },
    async closeSession(sessionId) {
      const response = await sendRequest(`/session/${sessionId}/close`, 'PUT');
      if (response.ok) {
        await this.getSessions();
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    },
    async showResults(sessionId) {
      this.$router.push(`/session/${sessionId}/results`);
    },
    async takeSession(sessionCode) {
      this.$router.push(`/session/${sessionCode}`);
    },
    async showAnswers(sessionCode) {
      this.$router.push(`/session/${sessionCode}/answers`);
    },
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

.user-info {
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.user-info h2 {
  margin-top: 0;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  cursor: pointer;
  background-color: #e0e0e0;
  border: none;
  border-radius: 5px;
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
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.button-group {
  display: flex;
  gap: 10px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}

.form-container {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  margin-top: 20px;
}

.form-group {
  margin: 10px 0;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"], select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
}

button[type="submit"]:hover {
  background-color: #218838;
}

.input-search {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
}
</style>
