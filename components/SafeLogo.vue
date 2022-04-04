<template>
  <div class="v-picker--full-width fill-width d-flex justify-center" >
  <img
    class="safe-logo"
    alt="Safe-logo"
    src="~static/safe-logo.svg"
  >
  </div>
</template>

<style>
.safe-logo {
  height: 180px;
  width: 180px;
 /* transform: rotateY(500deg);
  animation: turn 3.5s ease-out forwards 1s;*/
}
.fill-width{
   width: -webkit-fill-available
 }

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
