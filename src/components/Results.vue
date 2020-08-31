<template>
  <ResultsComponent />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ResultsComponent from "@/components/ResultsComponent.vue";

@Component({
  components: {
    ResultsComponent,
  },
})
export default class Results extends Vue {
  allScoresAreValid: boolean = false;
}
</script>


<style scoped>
.body {
  max-width: 400px;
}

.entries {
  max-height: 400px;
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
</style>