<template>
  <div class="recommend">
      <Title>推荐歌单</Title>
      <ul class="recommendList">
        <router-link v-for="rem in recommendMusicList" :key="rem.id" to="/" tag="li">
          <div>
            <img :src="rem.picUrl"/>
            <span>{{rem.playCount|formatNum}}</span>
          </div>
          <p>{{rem.name|substr(26)}}</p>
        </router-link>
      </ul>
      <Title>最新音乐</Title>
      <MusicItem :newMusicList="newMusicList"></MusicItem> 
  </div>
</template>

<script>
import Title from '../components/Title'
import MusicItem from '../components/MusicItem'
export default {
  name: 'Recommend',
  components: {
    Title,
    MusicItem
  },
  data(){
    return {
      recommendMusicList:[],
      newMusicList:[]
   
    }
    // console.log(recommendMusicList);
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.$http.get('/personalized?limit=6').then(data=>{//获取推荐歌单
        // console.log(data);
          vm.recommendMusicList=data.data.result;
      });
      vm.$http.get('/personalized/newsong').then(data=>{//获取最新音乐列表
          vm.newMusicList=data.data.result;
      });

      
    });
  },
  filters:{//拦截器
    formatNum(value){
        return (value/10000).toFixed(1)+"万";
    },
    substr(value,len){
      return value.substr(0,len)+'...';
    }
  }
}
</script>
<style lang="less" scoped>
ul.recommendList{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li{
    width:33%;
    margin-top:20px;
    div{
      position: relative;
      span{
        top:2px;
        right:3px;
        position: absolute;
        color:white;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
      }
    }
    p{
      font-size:12px;
      text-align: left;
      word-wrap:none;
      padding:0px 8px;
    }
  }
}
</style>
