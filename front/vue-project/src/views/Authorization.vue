<template>
  <div id="authorization">
    <div class="auth-container">
      <div class="toggle">
        <button @click="toggleForm" :class="{ active: isLoginFormVisible }">Sign In</button>
        <button @click="toggleForm" :class="{ active: !isLoginFormVisible }">Sign Up</button>
      </div>
      <form @submit.prevent="isLoginFormVisible ? signInForm() : signUpForm()" class="auth-form">
        <h2>{{ isLoginFormVisible ? 'Sign In' : 'Sign Up' }}</h2>
        <div class="form-group">
          <label for="login">Email</label>
          <input type="text" id="login" v-model="formData.email" required>
        </div>
        <div v-if="!isLoginFormVisible" class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="formData.username" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <div class="password">
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="formData.password" required>
            <span @click="togglePasswordVisibility">
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </span>
          </div>
        </div>
        <div v-if="!isLoginFormVisible" class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <div class="password">
            <input :type="showConfirmPassword ? 'text' : 'password'" id="confirm-password" v-model="confirmPass" @input="validateConfirmPassword" required>
            <span @click="toggleConfirmPasswordVisibility">
              <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </span>
          </div>
          <div class="error-message">{{ validationErrors.confirmPass }}</div>
        </div>
        <button type="submit" class="submit-btn">{{ isLoginFormVisible ? 'Sign In' : 'Sign Up' }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import { sendRequest } from "@/scripts/request.js";
import { fetchUser } from "@/scripts/service.js";

export default {
  name: "Authorization",
  data() {
    return {
      isLoginFormVisible: true,
      showPassword: false,
      showConfirmPassword: false,
      confirmPass: '',
      formData: {
        email: '',
        username: '',
        password: ''
      },
      validationErrors: {
        confirmPass: ''
      }
    };
  },
  methods: {
    toggleForm() {
      this.isLoginFormVisible = !this.isLoginFormVisible;
      this.showPassword = false;
      this.showConfirmPassword = false;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    validateConfirmPassword() {
      if (this.formData.password !== this.confirmPass) {
        this.validationErrors.confirmPass = "Passwords do not match";
        return false;
      } else {
        this.validationErrors.confirmPass = "";
        return true;
      }
    },
    async signInForm() {
      if (this.formData.email && this.formData.password) {
        const response = await sendRequest('/auth/login', 'POST', {login:this.formData.email, password:this.formData.password});
        if (response.ok) {
       
          const data = await response.json();
          console.log(data);  
          localStorage.setItem("Token", data.token);
          localStorage.setItem("id",data.user.id);
         // await fetchUser();
          this.$router.push('/dashboard');
        } else {
          const errorMessage = await response.text();
          alert(errorMessage);
        }
      }
    },
    async signUpForm() {
      if (this.formData.email && this.formData.username && this.formData.password && this.validateConfirmPassword()) {
        const response = await sendRequest('/auth/register', 'POST', this.formData);
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("Token", data.token);
          localStorage.setItem("id",data.user.id);
      //    await fetchUser();
          this.$router.push('/dashboard');
        } else {
          const errorMessage = await response.text();
          alert(errorMessage);
        }
        
      }
    }
  }
};
</script>

<style scoped>
#authorization {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
}

.auth-container {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.toggle {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.toggle button {
  flex: 1;
  padding: 0.5rem;
  border: none;
  background: none;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s, border-bottom 0.3s;
}

.toggle button.active {
  color: #007bff;
  border-bottom: 2px solid #007bff;
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.auth-form h2 {
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group .error-message {
  color: red;
  font-size: 0.875rem;
}

.password {
  position: relative;
}

.password span {
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
}

.submit-btn {
  background: #007bff;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #0056b3;
}
</style>
