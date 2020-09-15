<template>
  <div class="full-screen flex-center tab" id="tab">
    <div class="full-width flex-center flex-column body">
      <!-- Entries -->
      <div class="full-width flex-center flex-column hidescroll entries">
        <!-- Entry -->
        <template v-if="Transcript">
          <div
            class="full-width flex-center flex-row flex-space entry"
            v-for="(subject,index) of Transcript.results"
            :key="`subject-${index}`"
          >
            <span class="name">{{subject.name}}</span>

            <div class="flex-center flex-row scores">
              <!-- Result -->
              <span class="result">{{subject.score}}%</span>
            </div>
          </div>
        </template>

        <v-form class="full-width" v-model="allScoresAreValid" ref="form" v-if="!Transcript">
          <div
            class="full-width flex-center flex-row flex-space entry"
            v-for="(subject,index) of subjects"
            :key="`subject-${index}`"
          >
            <span class="name">{{subject.title}}</span>

            <div class="flex-center flex-row scores">
              <template v-if="!Transcript">
                <v-text-field
                  placeholder="0"
                  type="number"
                  class="centralize-input-values"
                  :rules="[scoresAreValid(subject)]"
                  v-model="subjects[index].score"
                ></v-text-field>
                <span class="slash">/</span>
                <v-text-field
                  placeholder="0"
                  type="number"
                  :rules="[scoresAreAboveZero(subject)]"
                  class="centralize-input-values"
                  v-model="subjects[index].maxScore"
                ></v-text-field>
              </template>
            </div>
          </div>
        </v-form>
      </div>

      <div class="full-width separator">&nbsp;</div>

      <div class="full-width flex-center flex-column results" v-if="Transcript">
        <!-- Average -->
        <div class="full-width flex-center flex-row flex-space result-entry">
          <span class="secondary--text entry-title">Average</span>
          <span class="primary--text entry-title">{{Transcript.average}}%</span>
        </div>

        <!-- Rank -->
        <div class="full-width flex-center flex-row flex-space result-entry">
          <span class="secondary--text entry-title">Rank</span>
          <span class="primary--text entry-title">{{Transcript.rank}}</span>
        </div>
      </div>

      <div class="flex-center flex-row flex-space actions">
        <v-btn
          v-if="!Transcript"
          :loading="loading"
          flat
          color="primary"
          :disabled="!allScoresAreValid"
          @click="submitTranscript()"
        >Submit</v-btn>
        <v-btn
          :loading="loading"
          v-if="!Transcript"
          flat
          color="error"
          :disabled="!allScoresAreValid"
          @click="clearValues()"
        >Clear</v-btn>

        <!-- Transcript is filled -->
        <v-btn
          v-if="Transcript"
          :loading="loading"
          flat
          color="primary"
          @click="downloadTranscript()"
        >Download</v-btn>
        <v-btn
          v-if="Transcript"
          :loading="loading"
          flat
          color="secondary"
          @click="refresh()"
        >Refresh</v-btn>
        <v-btn
          v-if="Transcript"
          :loading="loading"
          flat
          color="error"
          @click="deleteTranscript()"
        >Delete</v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class ResultsComponent extends Vue {
  @Prop() readonly transcript!: any;

  Transcript: any = null;

  allScoresAreValid: boolean = false;
  loading: boolean = false;

  subjects: Array<any> = [
    {
      title: "Information communication technology",
      score: null,
      maxScore: null,
    },
    {
      title: "Life skills",
      score: null,
      maxScore: null,
    },
    {
      title: "Entrepreneurship",
      score: null,
      maxScore: null,
    },
    {
      title: "Information communication technology",
      score: null,
      maxScore: null,
    },
    {
      title: "Book keeping",
      score: null,
      maxScore: null,
    },
    {
      title: "Accounting I",
      score: null,
      maxScore: null,
    },
    {
      title: "Economics for business",
      score: null,
      maxScore: null,
    },
  ];

  mounted() {
    this.Transcript = this.transcript;
  }

  scoresAreValid(subject: any): boolean | string {
    return (
      (subject.score && Number(subject.score) <= Number(subject.maxScore)) ||
      "Invalid"
    );
  }

  scoresAreAboveZero(subject: any): boolean | string {
    return Number(subject.maxScore) > 0 || "Invalid";
  }

  submitTranscript(): void {
    this.Transcript = this.$dataService.calculateAndStoreTranscript(
      this.subjects
    );
  }

  downloadTranscript(): void {
    window.print();
  }

  deleteTranscript(): void {
    this.$dataService.deleteTranscript(this.transcript.id);
    this.$emit("dismiss");
  }

  clearValues(): void {
    for (let i = 0; i < this.subjects.length; i++) {
      this.subjects[i].score = 0;
      this.subjects[i].maxScore = 0;
    }

    setTimeout(() => {
      const form: any = this.$refs.form;
      form.reset();
    }, 200);
  }

  refresh(): void {
    for (let i = 0; i < this.subjects.length; i++) {
      this.subjects[i].score = 0;
      this.subjects[i].maxScore = 0;
    }

    this.Transcript = null;
  }
}
</script>


<style scoped>
.body {
  max-width: 400px;
}

.entries {
  height: calc(100% - 50px);
  /* max-height: 400px; */
  justify-content: flex-start;

  padding: 10px;
}

.scores {
  width: 100px;
}
.slash {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.result {
  font-weight: bold;
  font-size: 17px;

  padding: 10px;
}
</style>