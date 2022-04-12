<template>
  <div>
    <div id="atvv" ref="tvv">
      <div id="atvv-img">
        <img :src="imgPath + this.allTvData[0].backdrop_path" />
      </div>
      <div id="atvv-info">
        <h1>{{ this.allTvData[0].name }}</h1>
        <h5>共{{ this.allTvData[0].seasons.length }}季</h5>
        <div id="aoutLine">
          <h4>outLine:</h4>
          <h4>{{ this.allTvData[0].overview }}</h4>
        </div>
      </div>
      <div class="aopen">
        <button @click="backToTv">back to tv</button>
      </div>
    </div>
    <div
      class="season"
      v-for="(s, index) in this.allTvData[0].seasons"
      :key="index"
    >
      <div id="seasonImg">
        <img :src="imgPath + s.poster_path" />
      </div>
      <div id="seasonText">
        <div id="seasoninfo">
          <h4>{{ s.name }}</h4>
          <h4>共{{ s.episode_count }}集</h4>
        </div>
        <div id="seasonoverview">
          <h4>{{ s.overview }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tvDetail",
  data() {
    return {
      imgPath: "https://image.tmdb.org/t/p/w500",
      allTvData: [],
    };
  },
  methods:{
    backToTv(){
      this.$router.back()
      this.$store.commit('change',false)
    },
    popstate(){
      this.$store.commit('change',false)
    }
  },
  mounted() {
    const fetchReq1 = fetch(
      `https://api.themoviedb.org/3/tv/${this.$route.query.id}?api_key=e147528034b3b1192f389af6460b3ad9&language=en-US`
    ).then((res) => res.json());
    const fetchReq2 = fetch(
      `https://api.themoviedb.org/3/tv/${this.$route.query.id}/season/1?api_key=e147528034b3b1192f389af6460b3ad9&language=en-US`
    ).then((res) => res.json());
    const allData = Promise.all([fetchReq1, fetchReq2]);
    allData.then((res) => {
      this.allTvData = res;
      console.log(this.allTvData);
    });
    window.addEventListener('popstate', this.popstate);
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Mohave:ital,wght@1,300&display=swap");
#atvv {
  display: flex;
  width: 100%;
  font-family: "Mohave", sans-serif;
  color: aliceblue;
}

#atvv-img {
  margin-right: 50px;
}

#atvv-info {
  width: 60%;
  letter-spacing: 0.2em;
  display: flex;
  flex-direction: column;
}

#atvv-info h3 {
  color: gray;
  margin: 0;
}

#aoutLine {
  width: 80%;
  margin-top: 2.5em;
}

.aopen {
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
}

.aopen button {
  width: 100%;
  font-size: 1em;
}

.atvdetail {
  width: 100%;
  background-color: brown;
}
/********************************** */

.season {
  display: flex;
  width: 80%;
  margin:auto;
  margin-top: 1em;
}

#seasonImg img {
  width: 250px;
  height: 300px;
}

#seasonText{
  color:azure;
  font-family: "Mohave", sans-serif;
  width: 80%;
  margin-left: 2em;
  letter-spacing: 0.2em;
}

#seasonoverview{
  margin-top: 4em;
}

button {
  letter-spacing: 0.1em;
  padding: 15px;
  background-color: chocolate;
  border-radius: 10px;
  cursor: pointer;
  border: 0;
  width: 40%;
}
</style>