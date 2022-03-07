<template>
    <div class="error-page">
        <div class="error-page-div">
            <img class="error-img" :src="src" alt="">
            <div >
                <div class="error-text">OOPS!</div>
                <div class="error">There seems to be something abnormal here!</div>
                <br>
                <el-button @click="backHomePage" type="primary" round>HomePage</el-button>
            </div>
        </div>
        
    </div>
</template>
<script>
    import '../../assets/css/404.less'
    import errorImg from '../../assets/images/401.gif'
export default{
    data(){
        return {
            src:errorImg
        }
    },
    created(){

    },
    methods:{
        backHomePage(){
            this.$router.push('/')
        }
    }

}
</script>

<style lang="less" scoped>
.error-page-div {
    // box-sizing: border-box;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items:center;
    // align-content: center;
    .error-img{
        // margin: 20 auto;
        // vertical-align: middle;
        
    }
    .error-text{
        font-size: 32px;
    font-weight: bold;
    line-height: 40px;
    color: #1482f0;
    // opacity: 0;  
    margin-bottom: 20px;
    -webkit-animation-name: slideUp-data-v-281ca300;
    animation-name: slideUp-data-v-281ca300;
    -webkit-animation-duration: .5s;
    animation-duration: .5s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    }
}
</style>