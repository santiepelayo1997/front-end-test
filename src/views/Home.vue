<template>
	<div>
        <tawk-header/>
        <!-- SEARCH -->
        <div id="header-search">
				<input type="text" id="txtSearch" v-model="search" placeholder="Search for answers" name="search">
				<button type="submit" id="btnSearch"><i class="fa fa-search" id="searchIcon"></i></button>
		</div>
        <!-- CATEGORY LIST -->
        <category-list 
            :tableArray="filteredList"
            @click="goToArticles"
        />
     
	</div>
</template>

<script>

import Vue from 'vue'
import axios from 'axios';
import moment from 'moment'
import Header from '../components/Header.vue'
import CategoryList from '../components/CategoryList.vue'
Vue.prototype.moment = moment   

export default {
    name: 'Home',
    components:{
        'tawk-header': Header,
        'category-list': CategoryList
    
	},
    mounted(){
        this.getAllCategories();
    },
    data: function() {
        return {
            arrayCategories: [],
            search: '',
        }
    },
    methods: {
        async getAllCategories(){

              await axios({
                        method: 'GET',
                        url: 'http://localhost:9000/api/categories',
               })
              .then(async (res) => {
                     let array = []
                     res.data.forEach(function(item) {
                           if(item.enabled == true){
                               array.push(item)
                               return array.sort((a, b) => a.order - b.order );
                           }
                    });
                    this.arrayCategories = await array
                     
              })
              .catch((autherr) => {
                    console.log(autherr)
              })

        },
     
        async goToArticles(categoryId){
             localStorage.setItem("categoryId", categoryId)
             this.$router.push('/Category').catch(error => {
              if (error.name != "NavigationDuplicated") {
                          throw error;
                      }
              });
        }
    },
    computed:{
        filteredList() {
            return this.arrayCategories.filter(item => {
                return item.title.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.form-body{
    margin-left:300px;
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
#icon-box{
    margin-left:130px;
    margin-top:30px;
    color:#03A84E;
    margin-bottom:5px;
    font-size:50px;
}
.break {
    flex-basis: 100%;
    height: 0;
}
.home-body{
    position: absolute;
    width: 1920px;
    min-height: 620px;
    left: 0px;
    top: 299px;
    background: #FAFAFA;
}
.row-boxes{
    margin-top:60px;
    padding:10px;
    display: inline-block;
   
}
.box-category{
    display: inline-block;
    position: relative;
    width: 315px;
    height: 220px;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    box-sizing: border-box;
    border-radius: 5px;
}
.box-category-hidden{
    margin-left:-10px;
}
.box-category:nth-child(3n) + .box-category {
   clear: both;
}
#header-search{
        display: flex;
        justify-content: center;
}
#txtSearch{
        position: absolute;
        width: 720px;
        height: 60px;
        padding-left:1.0416666666666665vw;
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
        left: 67.70833333333334vw;
        top: 165px;
        border: 1px solid #03A84E;
        background: #03A84E;
        transform: matrix(-1, 0, 0, 1, 0, 0);
}
</style>