<template>
  <div class="full-screen flex-center">
    <SignupLoginComponent :isLogin="false" @success="login()" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import SignupLoginComponent from "@/components/SignupLoginComponent.vue";

@Component({
  components: {
    SignupLoginComponent,
  },
})
export default class Signup extends Vue {
  login() {
    this.$router.push({ name: "Home" });
  }
}
</script>
