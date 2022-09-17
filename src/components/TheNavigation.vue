<template>
  <div id="nav">
    <AppLink id="logo" to="/">Travel App_vue</AppLink>
    <AppLink
      v-for="destination in destinations"
      :key="destination.id"
      :to="{ name: 'destination.show', params: { id: destination.id, slug:destination.slug } }"
    >
      <h2>{{ destination.name }}</h2>
    </AppLink>
    <AppLink to="#">Beniah</AppLink>
    <AppLink :to="{name: 'protected'}"> Dashboard</AppLink>
  </div>
</template>

<script>
import sourceData from "@/data.json";
export default {
  data() {
    return {
      destinations: sourceData.destinations,
    };
  },
};
</script>
<style scoped>
#nav .vue_active_link {
  color: rgb(124, 206, 233);
  border-bottom: 2px solid rgb(225, 210, 210);
}
</style>
