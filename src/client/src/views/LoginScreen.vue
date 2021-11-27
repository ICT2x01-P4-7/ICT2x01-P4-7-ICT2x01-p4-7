<template>
  <main class="form-login">
    <div class="card">
      <div class="card-body">
        <form>
          <h2 class="h3 mb-3 fw-normal text-center">Log in</h2>
          <h3 class="h3 mb-3 fw-normal text-center">PIN</h3>
          <div class="text-center">
            <PincodeInput v-model="PIN" :length="4" :secure="true" />
          </div>
          <div class="text-center pt-3">
            <b-alert variant="danger" v-model="showAlert">{{
              alertMessage
            }}</b-alert>
          </div>
          <div class="p-3 text-center">
            <button type="button" class="btn btn-primary btn-lg" @click="login">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
    <p class="mt-3 mb-3 text-muted text-center">© TileUp</p>
  </main>
</template>

<script>
import axios from "axios";
import PincodeInput from "vue-pincode-input";
import { localhost } from "../config/config.js";

export default {
  name: "LoginScreen",
  component: {
    PincodeInput,
  },
  data: () => {
    return {
      showAlert: false,
      PIN: "",
      alertMessage: "Something went wrong",
    };
  },
  watch: {
    PIN: function (val) {
      if (val.length === 4) {
        this.login();
      }
    },
  },
  methods: {
    login(e) {
      if (e) {
        e.preventDefault();
      }
      if (this.PIN.length != 4) {
        this.PIN = "";
        this.alertMessage = "Please input 4 digits";
        this.displayAlert();
        return;
      }
      const user = {
        PIN: this.PIN,
      };
      axios
        .post(`${localhost}/user/login`, user)
        .then((response) => {
          const token = response.data.data.token;
          axios.defaults.headers.common["x-access-token"] = token;
          sessionStorage.setItem("token", token);
          this.$router.push("/program");
        })
        .catch((error) => {
          const errorData = error.response.data;
          // if (errorData.lockUntil) {
          // }
          this.alertMessage = errorData.message;
          this.PIN = "";
          this.displayAlert();
        });
    },
    displayAlert() {
      this.showAlert = true;
    },
  },
};
</script>

<style lang="css">
body {
  display: flex;
  padding-top: 60px;
  padding-bottom: 60px;
  align-items: center;
  background-color: #f6f6f6;
}
.form-login {
  width: 100%;
  max-width: 450px;
  margin: auto;
}
label {
  font-weight: 600;
}
</style>
