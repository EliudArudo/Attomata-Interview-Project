<template>
  <v-card>
    <v-toolbar dark color="white">
      <img class="logo" src="@/assets/logo.svg" alt="Storescript" />

      <v-toolbar-title class="primary--text">Transcript</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn flat icon color="error" @click="closeModal()">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>

    <ResultsComponent :transcript="transcript" @dismiss="closeModal()" />
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import ResultsComponent from "@/components/ResultsComponent.vue";

@Component({
  components: {
    ResultsComponent,
  },
})
export default class ResultModal extends Vue {
  @Prop() readonly transcript!: any;

  dialog = false;
  notifications = false;
  sound = true;
  widgets = false;

  closeModal(): void {
    this.$emit("closeModal");
  }
}
</script>
