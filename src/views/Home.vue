<template>
  <div class="Home">
    <div class="destinations">
      <h1>All Destinations</h1>
      <button @click="triggerRouterError">Trigger Router Error</button>
      <router-link
        v-for="destination in destinations"
        :key="destination.id"
        :to="{
          name: 'destination.show',
          params: { id: destination.id, slug: destination.slug },
        }"
      >
        <h2>{{ destination.name }}</h2>
        <img :src="`/images/${destination.image}`" :alt="destination.name" />
      </router-link>
    </div>
  </div>
</template>
<script>
import sourceData from '@/data.json'
import { isNavigationFailure,NavigationFailureType } from 'vue-router'
export default ({
    data() {
       return{
        destinations:sourceData.destinations
       }
    },
    methods: {
        async triggerRouterError(){
            const navigationFailure= await this.$router.push("/")
            if(isNavigationFailure(navigationFailure, NavigationFailureType.dup)){
      console.log(navigationFailure.to)
      console.log(navigationFailure.from.name)
            } else{
            }
    }
}})
</script>
