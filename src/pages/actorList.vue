<template>
  <div class="top-actor"></div>
</template>

<script>
export default {
  name: "actorList",
  data() {
    return {
      loveMovie: [],
      movies_path:[]
    };
  },
  mounted() {
    console.log(this.$store.state.loveMovie);
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=e147528034b3b1192f389af6460b3ad9&language=zh-TW&page=1"
    )
      .then((respone) => {
        return respone.json();
      })
      .then((data) => {
        data.results.forEach((e) => {
          this.movies_path=e.poster_path;
          console.log(this.movies_path)
        });
      });
  },
};
</script>

<style>
</style>