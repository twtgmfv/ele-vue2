<template>
  <div>
    <button @click="increment">增加+</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapMutations } from 'vuex'
  export default {
    methods: {
      ...mapMutations(['increment'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ratings
    color:blue
</style>
