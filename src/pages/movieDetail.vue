<template>
  <div class="box" >
    <div class="detail">
      <div class="pic">
        <img :src="imgPath + detailData.poster_path" />
        <div class='love' @click="loveCheck(detailData.id,$event)" ref="love">❤</div>
      </div>
      <div class="content">
        <div id="title">
          <h1>{{ detailData.title }}</h1>
          <h5>{{ detailData.tagline }}</h5>
        </div>
        <div id="info">
          <h4>vote:{{ detailData.vote_average }}point</h4>
          <h4>time:{{ detailData.runtime }}min</h4>
          <h4 v-for="(d, index) in detailData.genres" :key="index">
            {{ d.name }}
          </h4>
        </div>
        <div id="outline">
          <h4>outLine:</h4>
          <h4>{{ detailData.overview }}</h4>
        </div>
        <div class="back">
        <button @click="backToList">Back to Movies</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "movieDetail",
  data() {
    return {
      detailData: [],
      imgPath: "https://image.tmdb.org/t/p/w500",
    };
  },
  methods:{
    backToList(){
      this.$router.back()
      this.$store.commit('change',false)
    },
    
    popstate(){
      this.$store.commit('change',false)
    },

    loveCheck(id,e){
      this.$store.dispatch('addLoveMovie',[id,e])
      // console.log(this.$refs.love.className=='love-active')
      if(this.$refs.love.className=='love-active'){
        this.$refs.love.style.color='red'
      }else{
         this.$refs.love.style.color='white'
      }
    }
  },
  mounted() {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.$route.query.id +
        "?api_key=e147528034b3b1192f389af6460b3ad9&language=en-US"
    )
      .then((respone) => {
        return respone.json();
      })
      .then((data) => {
        this.detailData = data;
        console.log("電影Detail來了", data);
      });
    window.addEventListener('popstate', this.popstate);
    if(this.$store.state.loveMovie.includes(Number(this.$route.query.id))){
      this.$refs.love.style.color='red'
    }
    else{
      this.$refs.love.style.color='white'
    }
  },
  beforeDestroy(){
    console.log('電影Detail要死了')
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Mohave:ital,wght@1,300&display=swap");
.box {
  width: 100%;
  height: 93.1vh;
  display: flex;
}

.detail {
  width: 80%;
  height: 80%;
  display: flex;
  margin: auto;
  color: aliceblue;
  font-family: "Mohave", sans-serif;
}

.pic {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.pic img {
  width: 100%;
}

.content {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 4.5rem;
}

#title {
  letter-spacing: 0.2em;
}

h5 {
  color: gray;
}

#info {
  display: flex;
  margin-bottom: 8em;
}

#info h4 {
  border-right: 2px solid rgb(70, 70, 70);
  padding-right: 15px;
  font-size: 16px;
  margin: 5px 10px;
  letter-spacing: 0.3em;
}

#info h4:first-child {
  margin-left: 0;
}

#outline {
  width: 100%;
  height: 500px;
  letter-spacing: 0.2em;
  margin-bottom: 8em;
}

button {
  letter-spacing: 0.1em;
  padding: 15px;
  background-color: chocolate;
  border-radius: 10px;
  cursor: pointer;
  border: 0;
  width: 40%;
  margin: 0 10px;
}

button:hover {
  background-color: rgb(214, 128, 66);
  color: aliceblue;
}

.pic .love-active{
  color: red;
}

/********************************************** */

@media screen and (max-width: 768px){
  .box{
    height: auto;
  }
  .pic{
    margin: auto;
    width: 60%;
  }
  .detail{
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .content{
    width: 100%;
    padding: 0;
  }

  #title{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #info{
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    flex-wrap: wrap;
    justify-content: center;
  }

  #info h4{
    font-size: 14px;
    letter-spacing:0.1em;
  }

  #outline{
    box-sizing: border-box;
    padding: 0 2em;
    margin-top: 2em;
    height: 15%;
  }
  
  .back{
    display: flex;
    justify-content: center;
    position: relative;
  }
}
</style>