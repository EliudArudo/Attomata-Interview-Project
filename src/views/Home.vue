<template>
  <div class="full-screen">
    <!-- Top nav -->
    <v-toolbar>
      <img class="logo" src="@/assets/logo.svg" alt="Storescript" />

      <v-toolbar-title class="primary--text">{{navItems[bottomNavActiveIndex].title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <div class="flex-center profile-name">
          <span class="secondary--text">{{initializeName(loggedInUsername)}}</span>
        </div>

        <v-btn flat icon color="error" @click="logout()">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- Home body -->
    <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
      <v-tab v-for="n in 3" :key="n" ripple>Item {{ n }}</v-tab>

      <v-tab-item class="flex-center">
        <!-- <v-btn flat @click.stop="dialog = true">Result</v-btn> -->
        <Results />
      </v-tab-item>

      <v-tab-item class="flex-center">
        <Transcripts @openTranscript="openTranscriptModal" />
      </v-tab-item>

      <v-tab-item class="flex-center">
        <Profile />
      </v-tab-item>
    </v-tabs>

    <!-- Bottom nav -->
    <v-bottom-nav
      color="#657ACD"
      :active.sync="bottomNavActiveIndex"
      :value="true"
      absolute
      dark
      shift
    >
      <v-btn dark v-for="(item, index) of navItems" :key="`nav-${index}`">
        <span>{{item.title}}</span>
        <v-icon>{{item.icon}}</v-icon>
      </v-btn>
    </v-bottom-nav>

    <!-- Modal -->
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <ResultModal :key="cheatCode" @closeModal="closeModal()" :transcript="transcript" />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import ResultModal from "@/components/ResultModal.vue";

import Results from "@/components/Results.vue";
import Transcripts from "@/components/Transcripts.vue";
import Profile from "@/components/Profile.vue";

@Component({
  components: {
    ResultModal,
    Results,
    Transcripts,
    Profile,
  },
})
export default class Home extends Vue {
  transcript: any = null;

  active = 0;
  bottomNavActiveIndex = 0;

  dialog = false;
  cheatCode = 0;
  notifications = false;
  sound = true;
  widgets = false;

  navItems = [
    {
      title: "Results",
      icon: "assignment",
    },
    {
      title: "Transcripts",
      icon: "library_books",
    },
    {
      title: "Profile",
      icon: "perm_identity",
    },
  ];

  loggedInUsername: string = "";

  @Watch("bottomNavActiveIndex")
  onNavChanged(index: number): void {
    this.active = index;
  }

  mounted() {
    this.loggedInUsername = this.$dataService.getCurrentLoggedInStudent().name;
  }

  initializeName(name: string): string {
    const nameArray: Array<string> = name.split(" ");

    let initialsArray: Array<string> = [];
    let currentName: string;

    for (let i = 0; i < nameArray.length; i++) {
      currentName = nameArray[i];

      const initial: string = currentName.charAt(0).toUpperCase();
      initialsArray.push(initial);
    }

    const initials: string = initialsArray.join(" ");
    return initials;
  }

  openTranscriptModal(transcript: any): void {
    this.transcript = transcript;

    this.cheatCode++;
    this.dialog = true;
  }

  logout(): void {
    this.$dataService.logout();
    this.$router.push({ name: "Login" });
  }

  closeModal(): void {
    this.dialog = false;
  }
}
</script>


<style scoped>
.v-toolbar {
  height: 56px;
  background: white;
}

.v-toolbar__content,
.v-toolbar__items {
  height: 56px !important;
}

.v-toolbar__title {
  font-weight: 500 !important;
  font-size: 18px;
}

.profile-name {
  height: 100%;
  font-size: 18px;
  font-weight: 300;
}

.v-tabs {
  height: calc(100% - 56px - 56px);
}
</style>