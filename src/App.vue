<template>
  <v-app>
    <v-main>
      <RegisterComponent/>
    </v-main>
  </v-app>
</template>

<script>
import RegisterComponent from './components/RegisterComponent';

export default {
  name: 'App',

  components: {
    RegisterComponent,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
  #app {
    background-color: var(--v-background-base);
  }
</style>
