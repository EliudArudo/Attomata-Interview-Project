<template>
  <div class="full-screen flex-center tab">
    <div class="full-width flex-center flex-column hidescroll body">
      <!-- Profile inputs -->
      <div class="full-width flex-center flex-column inputs">
        <v-form class="full-width" v-model="isProfileInfoCorrect">
          <v-text-field v-model="fullname" readonly :rules="fullnameRules" label="Full name"></v-text-field>
          <v-text-field v-model="studentID" readonly :rules="studentIDRules" label="Student ID"></v-text-field>
          <v-text-field v-model="course" readonly :rules="textRules" label="Course"></v-text-field>
          <v-text-field v-model="stage" readonly :rules="textRules" label="Stage"></v-text-field>
        </v-form>
      </div>

      <v-btn flat color="primary" :disabled="!isProfileInfoCorrect">Save details</v-btn>

      <div class="full-width flex-center flex-column inputs">
        <v-form class="full-width" v-model="isPasswordValid">
          <v-text-field v-model="password" :rules="passwordRules" type="password" label="Password"></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            :rules="confirmPasswordRules"
            type="password"
            label="Confirm password"
          ></v-text-field>
        </v-form>
      </div>

      <div class="flex-center flex-row flex-space mb-3 actions">
        <v-btn flat color="primary" :disabled="!isPasswordValid">Update</v-btn>
        <v-btn flat color="error" @click="deleteAccount()">Delete account</v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Profile extends Vue {
  isProfileInfoCorrect: boolean = false;
  isPasswordValid: boolean = false;

  fullname: string = "";
  fullnameRules = [
    (v: string) => !!v || "Please enter your full name",
    (v: string) =>
      v.trim().split(" ").join("").length > 4 || "No name is that short!",
  ];

  studentID: string = "123 456 789";
  studentIDRules = [
    (v: string) => !!v || "Student ID required",
    (v: string) => v.length > 5 || "ID must be more than 5 characters",
  ];

  course: string = "Bsc Accounting and Finance";
  stage: string = "Year 2 Semester 1";
  textRules = [(v: string) => !!v || "Please enter a valid entry"];

  password: string = "";
  passwordRules = [
    (v: string) => !!v || "Password required",
    (v: string) => v.length > 5 || "Password must be 6 or more characters",
  ];

  confirmPassword: string = "";
  confirmPasswordRules = [
    (v: string) => !!v || "Please confirm your password above",
    (v: string) => v.length > 5 || "It can't be below 6 characters",
  ];

  student: any;

  mounted() {
    this.student = this.$dataService.getCurrentLoggedInStudent();

    if (!this.student) return;

    this.fullname = this.student.name;
    this.studentID = this.student.id;
  }

  deleteAccount() {
    this.$dataService.deleteAccount();
    this.$router.push({ name: "Login" });
  }
}
</script>

<style scoped>
.body {
  justify-content: flex-start;
  max-height: calc(100vh - 56px - 56px);
  padding: 10px;

  box-sizing: border-box;
}
</style>
