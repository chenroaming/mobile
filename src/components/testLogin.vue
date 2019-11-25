<template lang="html">
  <div>
    <input type="text" v-model="code">
    <button @click="submit">dengru</button>
  </div>
</template>

<script>
import { login } from '@/api/courtDate.js'
export default {
  data() {
    return {
      code: ''
    }
  },
  methods: {
    submit() {
      login(this.code).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="css">
</style>
