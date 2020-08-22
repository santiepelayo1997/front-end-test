<template>
	<div >
         <div class="home-body">
             <form class="form-body">
                <!-- CATEGORY LIST -->
                <div class="row-boxes" v-for="item in tableArray" v-bind:key="item.id" v-animate-css="'zoomIn'" >
                         <div class="box-category" >
                                <span v-if="item.icon == 'deskop'">
                                        <i class="fas fa-home" id="icon-box"></i>
                                </span>
                                <span v-else>
                                        <i :class="'fa fa-' + item.icon" id="icon-box"></i>
                                </span>
                                <p id="text-gettingStarted"  @click="emitActionToParent(item.id);">{{item.title}}</p> 
                                <p id="text-articles">{{item.totalArticle }} articles</p>
                                <p id="text-last-update">Last update {{ countTotalDaysAgo(item.updatedOn)}} days ago</p>
                        </div>
                </div>
                
             </form>
         </div>
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
         countTotalDaysAgo(value){

            var a = moment(value);
            var b = moment().format();
            var diffInDays = a.diff(b, 'days');
            return Math.abs(diffInDays)

        },
         emitActionToParent: function(categoryId){
            this.$emit('click',categoryId)
         }
    }
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';
.form-body{
    margin-left:300px;
    margin-top:60px;
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
.home-body{
    position: absolute;
    width: 1920px;
    min-height: 620px;
    left: 0px;
    top: 299px;
    background: #FAFAFA;
}
.row-boxes{
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
#header-text{
    text-align: center;
    font-family: $font-family;
    color: $text-black;
    padding: 20px;

    h1{
        font-style: normal;
        font-weight: bold;
        font-size: 34px;
        line-height: 41px;
    }

    h3{
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 24px;
    }
}

</style>