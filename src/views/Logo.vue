<template>
  <div class="full-screen flex-center">
    <div class="flex-center flex-column logo-text">
      <img class="main-logo" src="@/assets/logo.svg" alt="Storescript" />

      <div class="text">
        <span class="primary--text">STORE</span>
        <span class="secondary--text">SCRIPT</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Logo extends Vue {
  mounted() {
    setTimeout(() => {
      this.$router.push({ name: "Login" });
    }, 3000);
  }
}
</script>

<style scoped>
.text {
  font-family: "Orator Std";
  font-size: 17px;
  font-weight: Bold;
  padding: 10px;
}

.main-logo {
  animation-name: spin;
  animation-duration: 3000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
