<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Add/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { get } from "@/network/request"
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  async created(){
    const {code, data, text} = await get('/list')
    if(code) {
      console.log(text)
    }
    console.log(data)
  }
}
</script>
