<template>
  <v-app>
    <router-view></router-view>

    <v-snackbar v-model="snackbar" :timeout="3000">{{snackmessage}}</v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  snackmessage: string = "";
  snackbar: boolean = false;

  mounted() {
    // DEV
    // this.$router.push({ name: "Home" });

    this.setUpToastEventListener();
  }

  setUpToastEventListener(): void {
    this.$root.$on("TOAST_EVENT", (message: string) => {
      this.snackmessage = message;
      this.snackbar = true;
    });
  }
}
</script>


<style>
::-webkit-scrollbar-track,
::-webkit-scrollbar {
  background-color: transparent;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar {
  width: 2px;
}

::-webkit-scrollbar-thumb {
  background-color: #f29200;
  border-radius: 7px;
}

@font-face {
  font-family: "Orator Std";
  src: url("./assets/fonts/Orator-Std-Font.otf");
}

html,
body {
  margin: 0;
  padding: 0;

  height: 100%;
  width: 100%;

  color: #4b4b4b;
}

/* Helpers */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-column {
  flex-direction: column;
}

.flex-row {
  flex-direction: row;
}

.flex-space {
  justify-content: space-between;
}

.full-screen {
  height: 100%;
  width: 100%;
}

.full-width {
  width: 100%;
}

/* Overrides */
.v-btn {
  text-transform: none !important;
}

.v-tabs__bar {
  display: none;
}

.v-window,
.v-window__container,
.v-window-item {
  height: 100%;
}

.centralize-input-values input {
  text-align: center !important;
}

.centralize-input-values input:focus {
}

.centralize-input-values .v-label {
  width: 100% !important;
  text-align: center !important;
}

input::placeholder {
  text-align: center;
}

input[type="number"] {
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.v-toolbar,
.v-card {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.05),
    0 4px 5px 0 rgba(0, 0, 0, 0.05), 0 1px 10px 0 rgba(0, 0, 0, 0.05) !important;
}

.hidescroll {
  overflow-y: hidden;
}

.hidescroll:hover {
  overflow-y: auto;
}

/* Common styles */
.main-logo {
  height: 50px;
  width: auto;
}

.body {
  width: 100%;
  max-width: 300px;
}

.separator {
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
}

.tab {
  align-items: flex-start;
  padding-top: 10px;
}

.results {
  margin-top: 15px;
}

.result-entry {
  margin-bottom: 15px;
  padding: 0 10px;

  font-size: 18px;
}

.inputs {
  margin-top: 30px;

  transition: all 3s ease-in-out;
}

.inputs .v-text-field {
  margin-bottom: 20px;
  width: 100%;
}

.logo {
  height: 20px;
  width: auto;
}
</style>