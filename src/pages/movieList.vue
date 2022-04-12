<template>
  <div class="top-movie">
    <h2 v-show="!this.$store.state.showDetail">熱門電影</h2>
    <div class="movie-container" v-show="!this.$store.state.showDetail">
      <div
        class="movie"
        :id="d.id"
        v-for="(d, index) in movieData"
        :key="index"
      >
        <div class="movie-img">
          <img :src="imgPath + d.poster_path" @click="detail(d, $event)" />
          <div class="love" @click="loveCheck(d, $event)" :ref="d.id">❤</div>
        </div>
        <h1>{{ d.original_title }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "movieList",
  data() {
    return {
      movieData: [],
      imgPath: "https://image.tmdb.org/t/p/w500",
      love:[]
    };
  },

  methods: {
    detail(d, e) {
      this.$store.commit("change", true);
      this.$router.push({
        path: "/movieDetail",
        query: {
          id: d.id,
        },
      });
    },
    loveCheck(d, e) {
      this.$store.dispatch("addLoveMovie", [d.id, e]);
    },
  },
  watch: {},

  mounted() {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=e147528034b3b1192f389af6460b3ad9&language=zh-TW&page=1"
    )
      .then((respone) => {
        return respone.json();
      })
      .then((data) => {
        this.movieData = data.results;
        console.log("電影列表來了", this.movieData);
      })
  },
  
  updated(){
    this.movieData.forEach(e=>{
          this.$store.state.loveMovie.forEach(a=>{
            if(e.id==a){
              this.$refs[e.id][0].className='love-active'
            }
          })
        })
    
  },
  beforeDestroy() {
    console.log("電影列表死了", this.movieData);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Mohave:ital,wght@1,300&display=swap");
h2 {
  color: white;
}

h1 {
  font-family: "Mohave", sans-serif;
  letter-spacing: 0.1em;
  width: 250px;
  text-align: center;
}

.movie-container {
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.movie {
  width: 350px;
  margin: 15px 5px;
  font-size: 10px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.movie-img {
  position: relative;
}

.movie img {
  width: 250px;
  height: 350px;
}

.love {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 2em;
}

.love-active {
  color: red;
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 2em;
}
</style>