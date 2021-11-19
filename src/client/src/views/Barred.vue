<template>
  <div id="BarredApp">
    <BC />
  </div>
</template>

<script>
import BC from '../components/BarredComponent.vue'

export default {
  name: 'App',
  components: {
    BC
  }
}
</script>



<style>

* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}
#BarredApp {
  background:#eefffe; 
}
</style>
