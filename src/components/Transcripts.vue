<template>
  <div class="full-screen flex-center tab">
    <div class="full-width flex-center flex-column body">
      <!-- Transcript list -->
      <div class="full-width flex-center flex-column hidescroll transcripts">
        <v-card
          class="full-width"
          v-for="(transcript, index) of transcripts"
          :key="`card-${index}`"
          @click.stop="sendOpenTranscriptModalEvent(transcript)"
        >
          <div class="full-width flex-center flex-row">
            <span>{{setDate(transcript.dateSubmitted)}}</span>
            <v-spacer></v-spacer>
            <span class="primary--text score">{{transcript.average}}%</span>
          </div>
        </v-card>
      </div>

      <!-- Separator -->
      <div class="full-width separator" v-if="transcripts.length > 0">&nbsp;</div>

      <div class="full-width flex-center flex-column results" v-if="transcripts.length > 0">
        <!-- Average -->
        <div class="full-width flex-center flex-row flex-space result-entry">
          <span class="secondary--text entry-title">Average score</span>
          <span class="primary--text entry-title">{{getAverageScore(transcripts)}}%</span>
        </div>

        <!-- Rank -->
        <div class="full-width flex-center flex-row flex-space result-entry">
          <span class="secondary--text entry-title">Average rank</span>
          <span class="primary--text entry-title">{{getAverageRank(transcripts)}}</span>
        </div>

        <!-- Actions -->
        <div class="flex-center flex-row actions">
          <v-btn flat color="error">Clear all</v-btn>
        </div>
      </div>

      <div class="full-screen flex-center" v-if="transcripts.length === 0">
        <span>No transcripts yet</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { students } from "@/mock/data.ts";

import moment from "moment";

@Component({})
export default class Transcripts extends Vue {
  transcripts: Array<any> = [];

  mounted(): void {
    if (!this.$dataService.getCurrentLoggedInStudent()) {
      return;
    }

    this.transcripts = this.$dataService.getCurrentLoggedInStudent().transcripts;

    console.log(this.$dataService.getCurrentLoggedInStudent());
  }

  getAverageScore(transcripts: Array<any>): number {
    let sum = 0;

    for (let i = 0; i < transcripts.length; i++) sum += transcripts[i].average;

    const average = Math.floor(sum / transcripts.length);

    return average;
  }

  getAverageRank(transcripts: Array<any>): number {
    let sum = 0;

    for (let i = 0; i < transcripts.length; i++) sum += transcripts[i].rank;

    const average = Math.floor(sum / transcripts.length);

    return average;
  }

  setDate(date: any): string {
    const formattedDate: string = moment(date).utc().format("Do MMM YYYY");
    return formattedDate;
  }

  sendOpenTranscriptModalEvent(transcript: any): void {
    this.$emit("openTranscript", transcript);
  }
}
</script>

<style scoped>
.body {
  max-width: 400px;
}

.transcripts {
  height: calc(100% - 132px);
  /* max-height: 400px; */
  padding: 10px;

  justify-content: flex-start;
}

.v-card {
  margin-bottom: 20px;
  padding: 15px;

  cursor: pointer;
}

.score {
  font-weight: bold;
}
</style>
