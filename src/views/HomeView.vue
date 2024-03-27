<script setup>
import AppStats from '@/components/AppStats.vue'
// import AppFeatures from '@/components/AppFeatures.vue'
// import AppTestimonial from '@/components/AppTestimonial.vue'
// import AppCallToAction from '@/components/AppCallToAction.vue'
// import AppBlog from '@/components/AppBlog.vue'
</script>

<template>
  <div class="relative" id="home">
    <div
      aria-hidden="true"
      class="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
    >
      <div
        class="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"
      ></div>
      <div
        class="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"
      ></div>
    </div>
    <div class="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
      <div class="relative pt-36 ml-auto">
        <div class="lg:w-2/3 text-center mx-auto">
          <h1 class="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
            Welcome
          </h1>
          <p class="mt-8 text-gray-700 dark:text-gray-300">
            This app will tes your reflex and show how fast you are!
          </p>
          <div class="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
            <router-link
              to="/playground"
              class="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-indigo-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span class="relative text-base font-semibold text-white">Just Play!</span>
            </router-link>
            <router-link
              to="/highscore"
              class="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
            >
              <span class="relative text-base font-semibold text-primary dark:text-white"
                >Highscore</span
              >
            </router-link>
          </div>
          <div
            class="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between"
          >
            <div class="text-left">
              <h6 class="text-lg font-semibold text-gray-700 dark:text-white">Free to play</h6>
            </div>
            <div class="text-left">
              <h6 class="text-lg font-semibold text-gray-700 dark:text-white">
                Use latest technology stack
              </h6>
            </div>
            <div class="text-left">
              <h6 class="text-lg font-semibold text-gray-700 dark:text-white">
                Use for the most people
              </h6>
            </div>
          </div>
        </div>
        <div class="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
          <div class="p-4 grayscale transition duration-200 hover:grayscale-0">
            <img
              src="../assets/images/clients/vue.svg"
              class="h-16 w-auto mx-auto"
              loading="lazy"
              alt="client logo"
              width=""
              height=""
            />
          </div>
          <div class="p-4 grayscale transition duration-200 hover:grayscale-0">
            <img
              src="../assets/images/clients/npm.svg"
              class="h-16 w-auto mx-auto"
              loading="lazy"
              alt="client logo"
              width=""
              height=""
            />
          </div>
          <div class="p-4 flex grayscale transition duration-200 hover:grayscale-0">
            <img
              src="../assets/images/clients/nodejs.svg"
              class="h-20 w-auto m-auto"
              loading="lazy"
              alt="client logo"
              width=""
              height=""
            />
          </div>
          <div class="p-4 grayscale transition duration-200 hover:grayscale-0">
            <img
              src="../assets/images/clients/tailwind.svg"
              class="h-16 w-auto mx-auto"
              loading="lazy"
              alt="client logo"
              width=""
              height=""
            />
          </div>
          <div class="p-4 flex grayscale transition duration-200 hover:grayscale-0">
            <img
              src="../assets/images/clients/javascript.svg"
              class="h-16 w-auto m-auto"
              loading="lazy"
              alt="client logo"
              width=""
              height=""
            />
          </div>
          <div class="p-4 flex grayscale transition duration-200 hover:grayscale-0">
            <img
              src="../assets/images/clients/vite.svg"
              class="h-16 w-auto m-auto"
              loading="lazy"
              alt="client logo"
              width=""
              height=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <AppFeatures /> -->
  <AppStats />
  <!-- <AppTestimonial />
  <AppCallToAction />
  <AppBlog /> -->
</template>
