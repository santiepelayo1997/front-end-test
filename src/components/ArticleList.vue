<template>
	<div >
        <span class="article-container" v-for="item in tableArray" v-bind:key="item.id" >
                <div class="article-box" v-animate-css="'zoomIn'">
                <i :class="'fa fa-' + item.icon" id="article-icon"></i>
                <p id="article-title">{{item.title}}</p>
                <p id="article-subtitle">Updated {{moment(item.updatedOn).format("MMM D, YYYY") }} </p>
                <svg width="11" height="20" id="article-arrowlink" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.21802 18.3195L9.65417 9.92577L1.21802 1.53207" stroke="#03A84E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </span>
	</div>
</template>

<script>
import Vue from 'vue'
import VAnimateCss from 'v-animate-css';
import moment from 'moment'
Vue.prototype.moment = moment   

Vue.use(VAnimateCss);
export default {
    name: 'Header',
    props:{
         tableArray: Array,
    },
    methods: {
         
    }
}
</script>

<style lang="scss" scoped>
.article-box{
    top: 38.55%;
    margin-left:850px;
    bottom: 51.75%;
    width:640px ;
    height: 92px;
    margin-bottom:16px;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    border-radius: 4px;
    display: flex;
}
#article-arrowlink{
    margin-left:400px;
    margin-top:37px;
    cursor: pointer;
}
#article-icon{
    margin-left:40px;
    margin-top:36px;
    font-size:18px;
    color:#03A84E;
}
#article-subtitle{
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 22px;
    color: #9C9AA6;
    margin-left:25px;
    margin-top:47px;
}
#article-title{
    position: absolute;
    height: 24px;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    color: #373737;
    margin-left:85px;
}
</style>