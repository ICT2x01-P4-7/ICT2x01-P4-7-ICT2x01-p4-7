<template>
  <div id="app">
    <div>

        <h2>Enter PIN Number</h2>
        <PincodeInput v-model="PIN" :length="4" :secure="true" />
        <div class="monitor">
            <span class="monitor-label">Parent value:</span>
            <span v-text="PIN" />
        </div>
        <button class="login-button" @click="login">Login</button>
    </div>
  </div>
</template>

<script>
    import axios from "axios";
    import PincodeInput from "vue-pincode-input";

    export default {
    name: "Login",
    component: {
        PincodeInput,
    },
    data: () => ({
        PIN: "",
        confirmPIN: "",
    }),
    methods: {
       
        login() {
        if (this.enterPIN === "") {
            console.log("Field is empty");
            return;
        }
        let newUser = {
            choosePIN: this.choosePIN,
            confirmPIN: this.confirmPIN,
        };
        axios.post("http://localhost:3000/api/User/login", newUser);
        },
    },
    };
</script>

<style lang="scss">
#app {
    margin-top: 100px;
    text-align: center;
    }
    .monitor {
    margin: 30px auto;
    font-size: 18px;
    font-family: Arial, sans-serif;
    opacity: 0.6;
    &-label {
        margin-right: 4px;
    }
}
.login-button {
  display: block;
  margin: 0 auto;
  border: none;
  border-radius: 3px;
  padding: 10px 30px;
  font-size: 18px;
  color: rgba(black, 0.8);
  transition: color 0.1s ease-in;
  &:hover,
  &:focus {
    cursor: pointer;
    color: rgba(black, 0.5);
  }
}
</style>
