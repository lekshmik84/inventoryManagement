<script setup>
import { onBeforeUnmount, onBeforeMount, ref } from "vue";
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";

const email = ref('');
const password = ref('');
const loading = ref(false);
const store = useStore();
const body = document.getElementsByTagName("body")[0];
const router = useRouter();


onBeforeMount(() => {
  store.state.hideConfigButton = true;
  store.state.showNavbar = false;
  store.state.showSidenav = false;
  store.state.showFooter = false;
  body.classList.remove("bg-gray-100");
});
onBeforeUnmount(() => {
  store.state.hideConfigButton = false;
  store.state.showNavbar = true;
  store.state.showSidenav = true;
  store.state.showFooter = true;
  body.classList.add("bg-gray-100");
});

const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(email);
};

// Login handler
const loginHandle = async (event) => {
  event.preventDefault();

  if (!isValidEmail(email.value)) {
    console.error('Invalid email format');
    return;
  }

  if (!password.value) {
    console.error('Password cannot be empty');
    return;
  }
  loading.value = true;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log('User logged in:', userCredential.user);
    router.push('/Product');
  } catch (error) {
    console.error('Error logging in:', error.message);
    // Handle login errors
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <div class="container top-0 position-sticky z-index-sticky">
      <div class="row">
        <div class="col-12">
        </div>
      </div>
    </div>
    <main class="mt-0 main-content bg-image">
      <span class="mask bg-gradient-success opacity-6"></span>
      <section>
        <div class="page-header min-vh-100">
          <div class="container">
            <div class="row display">
              <div class="mx-auto col-xl-4 col-lg-5 col-md-7 mx-lg-0 loginCard">
                <div class="card card-plain">
                  <div class="pb-0 card-header text-start">
                    <h4 class="font-weight-bolder">Sign In</h4>
                    <p class="mb-0">Enter your email and password to sign in</p>
                  </div>
                  <div class="card-body">
                    <form role="form">
                      <div class="mb-3">
                        <argon-input
                          id="email"
                          type="email"
                          placeholder="Email"
                          name="email"
                          size="lg"
                          v-model= "email"
                        />
                      </div>
                      <div class="mb-3">
                        <argon-input
                          id="password"
                          type="password"
                          placeholder="Password"
                          name="password"
                          size="lg"
                          v-model= "password"
                        />
                      </div>
                      <argon-switch id="rememberMe" name="remember-me">Remember me</argon-switch>
                      <div class="text-center">
                        <argon-button
                          class="mt-4 loginButton"
                          variant="gradient"
                          color="success"
                          fullWidth
                          size="lg"
                          @click="loginHandle"
                        >{{ loading ? 'Signing in...' : 'Sign in' }}</argon-button>
                      </div>
                    </form>
                  </div>
                  <div class="px-1 pt-0 text-center card-footer px-lg-2">
                    <p class="mx-auto mb-4 text-sm">
                      Don't have an account?
                      <router-link to="/signup" class="text-success text-gradient font-weight-bold">Sign up</router-link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<style scoped>
  .loginButton {
    background-image: linear-gradient(310deg, #bf1eb3 0%, #2dcecc 100%);
  }

  .display{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bg-image {
    background-image: url('../assets/img/pexels-tiger-lily-4487383.jpg');
    background-size: cover;
    background-position: center;
  }

  .loginCard {
    background: white;
    border-radius: 15px;
  }
</style>
