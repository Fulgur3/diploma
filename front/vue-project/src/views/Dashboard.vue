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
        <ul>
          <li v-for="session in sessions" :key="session.id">
            {{ session.name }}
          </li>
        </ul>
        <button @click="createSession">Create Session</button>
      </div>
      <div v-if="currentTab === 'quizzes'">
      <ul>
        <li v-for="quiz in quizzes" :key="quiz.id">
          {{ quiz.title }}
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
          <label for="quizName">Quiz Title:</label>
          <input type="text" id="quizName" v-model="newQuiz.title" required>
        </div>
        <!-- <div>
          <label for="questionTitle">Question Title:</label>
          <input type="text" id="questionTitle" v-model="newQuestion.title" required>
        </div>
        <div>
          <label for="questionSubtitle">Question Subtitle:</label>
          <input type="text" id="questionSubtitle" v-model="newQuestion.subtitle" required>
        </div>
        <div>
          <label for="questionType">Question Type:</label>
          <select id="questionType" v-model="newQuestion.type">
            <option value="text">Text</option>
            <option value="simple">Simple Choice</option>
            <option value="multiple">Multiple Choice</option>
          </select>
        </div> -->
        <!-- <div v-if="newQuestion.type !== 'text'">
          <div v-for="(option, index) in newQuestion.options" :key="index">
            <label :for="'option' + index">Option {{ index + 1 }}:</label>
            <input :id="'option' + index" v-model="option.value">
            <input type="checkbox" v-model="option.correct"> Correct
          </div>
          <div v-for="(option, index) in newQuestion.options" :key="index">
  <label :for="'optionLabel' + index">Option {{ index + 1 }}:</label>
  <input :id="'optionLabel' + index" v-model="option.label" required>
  <label>
    Correct:
    <input type="checkbox" v-model="option.correct">
  </label>
</div> -->
          <!-- <button type="button" @click="addOption">Add Option</button>
        </div>
        <div v-if="newQuestion.type === 'text'">
          <label for="questionAnswer">Correct Answer:</label>
          <input type="text" id="questionAnswer" v-model="newQuestion.answer">
        </div>
        <button type="button" @click="addQuestion">Add Question</button> -->
        <button type="submit">Save Quiz</button>
      </form>
    </div>
  </div>
</template>
  
  <script>
  import Question from '@/components/Question.vue'
  import { sendRequest } from "@/scripts/request.js";
  import ModalWindow from '@/components/ModalWindow.vue'
  export default {
     components:{ModalWindow,Question},
     
    data() {
      return {
        userInfo: {
        username: '',
        email: '',
        password: '',
      },
      showPassword: false,
        currentTab: 'sessions',
        sessions: [],
        quizzes: [],
        showQuizForm: false,
        newQuiz: {},
        newQuestion: {},
        option: {}
      };
    },
    mounted(){
        this.getQuizes();
        this.getSessions();
        this.fetchUserInfo();
    },
    methods: {
       async getSessions(){
        const response = await sendRequest('/session', 'GET');
        if (response.ok) {
           this.sessions=await response.json() 
        }
        },
        async getQuizes(){
        const response = await sendRequest('/quiz', 'GET');
        if (response.ok) {
           this.quizzes=await response.json() 
        }
        },
      createSession() {        
        alert('Create Session functionality');
      },

      async fetchUserInfo() {
      try {
        const response = await sendRequest(`/user/${localStorage.getItem("id")}`, 'GET'); // Replace userId with the actual user ID
        this.userInfo = await response.json();
      } catch (error) {
        console.error('Error fetching user information:', error);
      }  
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

      createQuiz() {
        
        this.showQuizForm = true;

      },

      async submitQuiz() {
        {
        const response = await sendRequest('/quiz', 'POST', {
      title: this.newQuiz.title,
    });
        if (response.ok) {     
           await this.getQuizes();
        } else {
          const errorMessage = await response.text();
          alert(errorMessage);
        }
    }
      },

      addQuestionForm() {
      // Show the question form
      this.showQuestionForm = true;
    },
    
    addOption() {
    this.newQuestion.options.push({ label: '', value: false });
    },
    
    addQuestion() {
        if (!this.newQuiz.questions) {
    this.newQuiz.questions = [];
  }

  // Prepare answers array
  let answers = [];
  if (this.newQuestion.type === 'multiple') {
    answers = this.newQuestion.options
      .filter(option => option.correct)
      .map(option => option.value);
  } else {
    answers.push(this.newQuestion.answer);
  }

  // Add the new question to the quiz
  this.newQuiz.questions.push({
    title: this.newQuestion.title,
    subtitle: this.newQuestion.subtitle,
    type: this.newQuestion.type,
    options: this.newQuestion.options || [], // Ensure options array is initialized
    answers: answers // Store answers as an array
  });

  console.log(this.newQuiz);
  // Reset newQuestion for next question
  this.newQuestion = {
    title: '',
    subtitle: '',
    type: 'text',
    options: [],
    answer: ''
  };
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
  .user-info {
  margin-bottom: 20px;
}
.user-info button {
  margin-left: 10px;
}
  
  form div {
    margin: 10px 0;
  }
  
  label {
    display: block;
  }
  </style>
  