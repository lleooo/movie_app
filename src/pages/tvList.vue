<template>
  <div>
    <div class="top-tv" v-show="!this.$store.state.showDetail">
      <h2>熱門影集</h2>
        <div class="tv" v-for="(d, index) in tvData" :key="index" >
          <div id="tvv" ref="tvv">
            <div id="tvv-img">
              <img :src="imgPath + d.backdrop_path" />
            </div>
            <div id="tvv-info">
              <h1>{{ d.name }}</h1>
              <h5>{{ d.first_air_date }}</h5>
              <div id="outLine">
                <h4>outLine:</h4>
                <h4>{{ d.overview }}</h4>
              </div>
            </div>
            <div class="open">
            <button @click="openTvDetail(d)">Detail</button>
            </div>
          </div>
        </div>
    </div>
      <router-view></router-view> 
  </div>
</template>

<script>
export default {
  name: "tvList",
  data() {
    return {
      tvData: [],
      filterTvData:[],
      imgPath: "https://image.tmdb.org/t/p/w500",
      tvDetail:false,
      openClick:false,
    };
  },

  methods:{
    openTvDetail(d){
      this.$store.commit('change',true)
      this.$router.push({
        path:'/tv/tvDetail',
        query:{
           id:d.id,
        }
      });
    },
    
  },

  mounted() {
    fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=e147528034b3b1192f389af6460b3ad9&language=en-US&page=1"
    )
      .then((respone) => {
        return respone.json();
      })
      .then((data) => {
        this.tvData= data.results;
        console.log("影集列表", this.tvData);
      });
      console.log(this.$store)
  },

};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Mohave:ital,wght@1,300&display=swap");

.tv{
  font-family: "Mohave", sans-serif;
  color: aliceblue;
  width: 100%;
  padding: 50px;
  box-sizing: border-box;
}
#tvv{
  display: flex;
  width: 100%;
}

#tvv-img{
  margin-right: 50px;
}

#tvv-info{
  width: 60%;
  letter-spacing: 0.2em;
  display: flex;
  flex-direction: column;
}

#tvv-info h3 {
  color: gray;
  margin: 0;
}

#outLine{
  width: 80%;
  margin-top: 2.5em;
}

.open{
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
}

.open button{
  width: 100%;
  font-size: 2em;
}

.tvdetail{
  width: 100%;
  background-color: brown;
}
</style>