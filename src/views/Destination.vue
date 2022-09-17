<template>
    <div>
    <section v-if="destination" class="destination">
 <h1>  {{destination.name}}</h1>
    <GoBack />
 <div class="destination-details">
    <img :src="`/images/${destination.image}`" :alt="destination.name">
    <p>{{destination.description}}</p>
    </div>
</section>

<section class="experiences">
    <h2>Top Experiences in {{destination.name}}</h2>
    <div class="cards">
    <router-link      
    v-for="experience in destination.experiences"
    :key="experience.slug"
    :to="{name:'experience.show', params:{experienceSlug:experience.slug}}"
     >
<ExperienceCard
:experience="experience"
/>
</router-link>
</div>
<router-view />
</section>
</div>
</template>
<script>
import sourceData from "@/data.json"
import ExperienceCard from "@/components/ExperienceCard.vue"
import GoBack from "@/components/GoBack.vue"
export default {
    components: { ExperienceCard,  GoBack },
    props:{
        id:{type:String, required:true}
    },

//    data() {
//     return{
// destination:null
//     }
//    },
    computed:{
      
        destination(){
            return sourceData.destinations.find(
                (destination)=>destination.id===parseInt(this.id)
            )
        }
        
//     },
//     methods:{
//         // use the ajax in the method
//  async initData(){
//     const response = await  fetch(`https://travel-dummy-api.netlify.app/${this.$route.params.slug}`)
//       this.destination=await response.json()
// }
//     },
    //  fetched and watch to ensure re-rendering when navigating
    //  async created(){
    //   this.initData()
    //   this.$watch(()=> this.$route.params,this.initData)
    // instead of using this.$watch, the pages can be recreated by using "key attribute "
    // ie. ":key=$route.path" in the App.vue
    }
}
</script>

