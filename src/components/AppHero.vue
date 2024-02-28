<script setup></script>
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
            Shaping a world with <span class="text-primary dark:text-white">reimagination.</span>
          </h1>
          <p class="mt-8 text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio incidunt nam itaque sed
            eius modi error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem
            harum omnis beatae ipsum soluta!
          </p>
          <div class="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
            <router-link
              to="/playground"
              class="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-indigo-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span class="relative text-base font-semibold text-white">Just Play!</span>
            </router-link>
            <a
              href="#"
              class="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
            >
              <span class="relative text-base font-semibold text-primary dark:text-white"
                >Highscore</span
              >
            </a>
          </div>
          <div
            class="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between"
          >
            <div class="text-left">
              <h6 class="text-lg font-semibold text-gray-700 dark:text-white">The lowest price</h6>
              <p class="mt-2 text-gray-500">Some text here</p>
            </div>
            <div class="text-left">
              <h6 class="text-lg font-semibold text-gray-700 dark:text-white">
                The fastest on the market
              </h6>
              <p class="mt-2 text-gray-500">Some text here</p>
            </div>
            <div class="text-left">
              <h6 class="text-lg font-semibold text-gray-700 dark:text-white">The most loved</h6>
              <p class="mt-2 text-gray-500">Some text here</p>
            </div>
          </div>
        </div>
        <div class="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
          <div class="p-4 grayscale transition duration-200 hover:grayscale-0">
            <img
              src="../assets/images/clients/microsoft.svg"
              class="h-12 w-auto mx-auto"
              loading="lazy"
              alt="client logo"
              width=""
              height=""
            />
          </div>
          <div class="p-4 grayscale transition duration-200 hover:grayscale-0">
            <img
              src="../assets/images/clients/airbnb.svg"
              class="h-12 w-auto mx-auto"
              loading="lazy"
              alt="client logo"
              width=""
              height=""
            />
          </div>
          <div class="p-4 flex grayscale transition duration-200 hover:grayscale-0">
            <img
              src="../assets/images/clients/google.svg"
              class="h-9 w-auto m-auto"
              loading="lazy"
              alt="client logo"
              width=""
              height=""
            />
          </div>
          <div class="p-4 grayscale transition duration-200 hover:grayscale-0">
            <img
              src="../assets/images/clients/ge.svg"
              class="h-12 w-auto mx-auto"
              loading="lazy"
              alt="client logo"
              width=""
              height=""
            />
          </div>
          <div class="p-4 flex grayscale transition duration-200 hover:grayscale-0">
            <img
              src="../assets/images/clients/netflix.svg"
              class="h-8 w-auto m-auto"
              loading="lazy"
              alt="client logo"
              width=""
              height=""
            />
          </div>
          <div class="p-4 grayscale transition duration-200 hover:grayscale-0">
            <img
              src="../assets/images/clients/google-cloud.svg"
              class="h-12 w-auto mx-auto"
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
</template>

<style scoped></style>
