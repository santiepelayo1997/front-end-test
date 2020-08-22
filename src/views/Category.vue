<template>
	<div>
        <tawk-header></tawk-header>
         <!-- SEARCH -->
        <div id="header-search">
				<input type="text" id="txtSearch" placeholder="Search for answers" name="search">
				<button type="submit" id="btnSearch"><i class="fa fa-search" id="searchIcon"></i></button>
		</div>
         <!-- BODY -->
         <div class="home-body">
             <form class="form-body">
                    <ul class="breadcrumb">
                        <li><a href="#" @click="goToAllCategories()">All Categories</a></li>
                        <li>{{this.categoryTitle}}</li>
                    </ul>
             </form>

              <!-- CATEGORY DETAIL -->
              <div class="side-box-container" v-for="item in arrayCategory" v-bind:key="item.id">
                     <span v-if="item.icon == 'deskop'">
                            <i class="fas fa-home" id="icon-box"></i>
                     </span>
                     <span v-else>
                            <i :class="'fa fa-' + item.icon" id="icon-box"></i>
                     </span>
                      <p id="txt-gettingStarted">{{item.title}}</p>
                      <p id="txt-updated">Updated {{countTotalWeeksAgo(item.updatedOn)}} weeks ago</p>
                      <hr id="line">
                      <svg width="22" height="23" id="icon-warning" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 21.7942C16.5228 21.7942 21 17.3396 21 11.8445C21 6.34941 16.5228 1.89478 11 1.89478C5.47715 1.89478 1 6.34941 1 11.8445C1 17.3396 5.47715 21.7942 11 21.7942Z" stroke="#03A84E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11 15.8243V11.8442" stroke="#03A84E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11 7.86804V7.49744" stroke="#03A84E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <p id="description">{{item.description}}</p>
              </div>
              
              <!-- ARTICLE LIST -->
              <article-list :tableArray="arrayArticles"/>

              <!-- OTHER CATEGORIES SLIDE -->  
              <hr id="line">
              <p id="txt-other">Other Categories</p>

              <!-- CAROUSEL SLIDE -->
                <vueper-slides
                    class="no-shadow"
                    :visible-slides="3"
                    :gap="3"
                    id="slideBoxParent"
                    :slide-ratio="1 / 4"
                    :dragging-distance="200"
                >
                        <vueper-slide
                            v-for="item in arrayAllCategory"
                            :key="item.id"
                            class="slideBox"
                        >
                                <template v-slot:content>
                                    <span v-if="item.icon == 'deskop'">
                                            <i class="fas fa-home" id="carousel-icon"></i>
                                    </span>
                                    <span v-else>
                                            <i :class="'fa fa-' + item.icon" id="carousel-icon"></i>
                                    </span>
                                    <p id="text-gettingStarted">{{item.title}}</p>
                                    <p id="text-articles">{{item.totalArticle }} articles</p>
                                    <p id="text-last-update">Last update {{ countTotalDaysAgo(item.updatedOn)}} days ago</p>
                                </template>
                        </vueper-slide>
              </vueper-slides>
      
         </div>
	</div>
</template>

<script>

import Vue from 'vue'
import axios from 'axios';
import moment from 'moment'
import Header from '../components/Header.vue'
import ArticleList from '../components/ArticleList.vue'
import VAnimateCss from 'v-animate-css';
import { VueperSlides, VueperSlide } from 'vueperslides'

Vue.use(VAnimateCss);
Vue.prototype.moment = moment   

export default {
    name: 'Category',
    components:{
        'tawk-header': Header,
        'article-list': ArticleList,
        VueperSlides, VueperSlide, ArticleList
	},
    mounted(){
        this.getCategoryDetail();
        this.getAllArticle();
        this.getAllCategory();
    },
    data: function() {
        return {
            arrayArticles: [],
            arrayCategory: [],
            arrayAllCategory: [],
            categoryTitle: ''
        }
    },
    methods: {
        goToAllCategories(){
              this.$router.push('/').catch(error => {
              if (error.name != "NavigationDuplicated") {
                          throw error;
                      }
              });
        },
        countTotalDaysAgo(value){

            var a = moment(value);
            var b = moment().format();
            var diffInDays = a.diff(b, 'days');
            return Math.abs(diffInDays)

        },
        async getAllArticle(){
              await axios({
                        method: 'GET',
                        url: 'http://localhost:9000/api/category/',
               })
              .then(async (res) =>{
                     let array = []
                     res.data.forEach(function(item) {
                           if(item.status == "published"){
                               array.push(item)
                           }
                    });
                    this.arrayArticles = await array
              })
              .catch((autherr) => {
                    console.log(autherr)
              })
        },
        async getCategoryDetail(){
              let categoryId = localStorage.getItem("categoryId")
              await axios({
                        method: 'GET',
                        url: 'http://localhost:9000/api/categories/',
               })
              .then(async (res) =>{
                     
                     let array = []
                     res.data.forEach(function(item) {
                           if(item.id == categoryId){
                               array.push(item)
                           }
                    });
                    this.categoryTitle = await array[0].title
                    this.arrayCategory = await array
                     
              })
              .catch((autherr) => {
                    console.log(autherr)
              })
        },
         async getAllCategory(){
              let categoryId = localStorage.getItem("categoryId")
              await axios({
                        method: 'GET',
                        url: 'http://localhost:9000/api/categories/',
               })
              .then(async (res) =>{
                     
                     let array = []
                     res.data.forEach(function(item) {
                           if(item.id != categoryId){
                               array.push(item)
                           }
                    });
                    this.arrayAllCategory = await array
                     
              })
              .catch((autherr) => {
                    console.log(autherr)
              })
        },
         countTotalWeeksAgo(value){

            var a = moment(value);
            var b = moment().format();
            var diffInDays = a.diff(b, 'weeks');
            return Math.abs(diffInDays)

        }
    },
    computed:{
     
    }
}
</script>

<style lang="scss" scoped>
@import url("https://unpkg.com/vueperslides/dist/vueperslides.css");

#slideBoxParent{
    margin-left:200px;
    margin-right:200px;
    padding:10px;
}
.slideBox{
    background-color:white;
    border: 1px solid #EEEEEE; 
    height: 270px;
}
#text-last-update{
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 16px;
    text-align: center;
    color: #adb5bd;
    margin-top:-12px;
}
#text-articles{
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 16px;
    text-align: center;
    color: #03A84E;
}
#text-gettingStarted{
    cursor: pointer;
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    color: #373737;
    margin-top:25px;
}
#txt-other{
    font-size:25px;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    color: #9C9AA6;
    text-align: center;
}
#description{
    position: absolute;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 18px;
    margin-left: 30px;
    margin-right: 30px;
    text-align: center;
    color: #9C9AA6;
}
#icon-warning{
    margin-left:140px;
    margin-top:10px;
}
#line {
   margin-top:40px;
   height:1px;
   border-width:0;
   color:gray;
   background-color:#eeeeee
}
#txt-updated{
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 22px;
    text-align: center;
    color: #9C9AA6;
    position: absolute;
    height: 22px;
    left: 0%;
    margin-top:-20px;
    right: 0%;
    top: calc(50% - 22px/2 + 15.13px);
}
#icon-box{
    margin-left:130px;
    margin-top:50px;
    color:#03A84E;
    margin-bottom:5px;
    font-size:50px;
}
#carousel-icon{
    margin-left:210px;
    margin-top:50px;
    color:#03A84E;
    margin-bottom:5px;
    font-size:50px;
}
#txt-gettingStarted{
    height: 28px;
    left: 1%;
    right: 0%;
    top: calc(50% - 28px/2 - 11.87px);
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 23px;
    line-height: 28px;
    text-align: center;
    color: #373737;
}

.side-box-container{
    margin-left:500px;
    position: absolute;
    width: 300px;
    height: 346px;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    border-radius: 4px;
}
ul.breadcrumb {
    padding: 10px 16px;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 22px;
    list-style: none;
}
ul.breadcrumb li {
    display: inline;
    font-size: 18px;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 22px;
    color: #9C9AA6;
}
ul.breadcrumb li+li:before {
    padding: 8px;
    color: #03A84E;
    content: "/\00a0";
}
ul.breadcrumb li a {
    color: #03A84E;
    text-decoration: none;
}
ul.breadcrumb li a:hover {
    color: #03A84E;
    text-decoration: underline;
}
.form-body{
    margin-left:490px;
    display: flex;
}
.home-body{
    position: absolute;
    width: 1920px;
    min-height: 620px;
    left: 0px;
    top: 299px;
    background: #FAFAFA;
}
#header-search{
        display: flex;
        justify-content: center;
}
#txtSearch{
        position: absolute;
        width: 720px;
        height: 60px;
        padding-left:20px;
        font-size:16px;
        top: 165px;
        font-family: Lato;
        font-style: normal;
        font-weight: normal;
        background: #FFFFFF;
        border: 1px solid #EEEEEE;
        border-radius: 4px;
}
#txtSearch::placeholder {
        font-family: Lato;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        color: #9C9AA6;
}
#searchIcon{
        color:white;
        font-size:25px;
}
#btnSearch{
        position: absolute;
        width: 80px;
        height: 64px;
        left: 1300px;
        top: 165px;
        border: 1px solid #03A84E;
        background: #03A84E;
        transform: matrix(-1, 0, 0, 1, 0, 0);
}
</style>