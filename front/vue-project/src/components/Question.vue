<template>
    <div class="question" @click="goToBookDetail">
      <img src="@/assets/car.jpg" class="question-img-top img" alt="">
      <div class="question-body">
        <div class="question_header">
          <span class="question_title">{{ book.title }}</span>
        </div>
        <div class="question_text">
          <div>
            <span class="question_year">{{ book.pub_year }}</span>
            <div v-for="genre in book.genrs" :key="genre.id">
              <span class="question_genre"> {{ genre.genre }}</span>
            </div>
          </div>
          <span class="question_author">{{ book.author }}</span>
        </div>
        <div class="question_footer">
          <!-- <router-link :to="{name: 'Product', params: {id: book.id}}" >More information</router-link> -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Question",
    props: {
      book: Object,
      genre: String,
    },
    computed: {},
    methods: {
      goToBookDetail() {
        this.$router.push({name: 'Product', params: {id: this.book.id}});
      }
    }
  }
  </script>
  
  <style scoped>
  .question {
    width: 300px;
    height: 400px;
    position: relative;
  }
  
  .img-wrapper {
    position: relative;
  }
  
  .product-notification {
    position: absolute;
    top: 0;
    right: 0;
    background-color: white;
    border-radius: 0 4px 0 4px;
    padding: .5em 1em;
    font-size: .75em;
    color: red;
  }
  
  .img {
    width: 100%;
    height: 20em;
    object-fit: cover;
    object-position: center top;
  }
  
  .question-body {
    display: flex;
    flex-direction: column;
    padding: .5em;
    height: 20%;
  
    font-size: .75em;
  
    position: relative;
  }
  
  .question_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .question_title {
    font-size: 12pt;
  }
  
  .question_author {
    color: black;
  }
  
  .question_text {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
  }
  
  .question_text > div {
    display: flex;
    gap: 1em;
    color: rgba(0, 0, 0, 0.50);
  }
  
  .question_footer {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
    font-size: 8pt;
    align-items: flex-end;
  }
  </style>