<template>
  <div class="flex-center flex-column body">
    <!-- logo -->
    <img class="main-logo" src="@/assets/logo.svg" alt="Storescript" />

    <!-- inputs -->
    <div class="full-width flex-center flex-column inputs">
      <v-form class="full-width" v-model="formIsValid">
        <v-text-field v-model="fullname" :rules="fullnameRules" v-if="!isLogin" label="Full name"></v-text-field>

        <v-text-field v-model="studentID" :rules="studentIDRules" label="Student ID"></v-text-field>
        <v-text-field v-model="password" :rules="passwordRules" label="Password" type="password"></v-text-field>

        <v-text-field
          v-model="confirmPassword"
          :rules="confirmPasswordRules"
          v-if="!isLogin"
          label="Confirm password"
          type="password"
        ></v-text-field>
      </v-form>
    </div>

    <v-btn
      class="login-signup-button"
      flat
      color="primary"
      :disabled="!formIsValid"
      @click="submit()"
    >{{isLogin? 'Login' : 'Signup'}}</v-btn>

    <div class="full-width flex-center flex-row flex-space statement">
      <span>{{isLogin? "Don't" : "Already"}} have an account with us?</span>

      <router-link v-if="isLogin" class="secondary--text" :to="{ name: 'Signup' }">Signup</router-link>
      <router-link v-else class="secondary--text" :to="{ name: 'Login' }">Login</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class Template extends Vue {
  @Prop({ default: true }) readonly isLogin!: boolean;

  formIsValid: boolean = false;

  studentID: string = "";
  studentIDRules = [
    (v: string) => !!v || "Student ID required",
    (v: string) => v.length > 5 || "ID must be more than 5 characters",
  ];

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

  fullname: string = "";
  fullnameRules = [
    (v: string) => !!v || "Please enter your full name",
    (v: string) =>
      v.trim().split(" ").join("").length > 4 || "No name is that short!",
  ];

  submit() {
    try {
      if (this.isLogin) {
        this.$dataService.login(this.studentID, this.password);
        this.$emit("success");
      } else {
        if (this.password !== this.confirmPassword) {
          this.showToast("Your passwords don't match");
          return;
        }

        this.$dataService.signup(this.fullname, this.studentID, this.password);
        this.$emit("success");
      }
    } catch (e) {
      this.showToast(e);
    }
  }

  showToast(message: string): void {
    this.$root.$emit("TOAST_EVENT", message);
  }
}
</script>

<style>
.main-logo {
  transition: all 0.5s ease-in-out;
}

.main-logo:hover {
  transform: scale(1.1);
}

.statement {
  margin-top: 20px;
}
</style>
