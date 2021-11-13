<template>
  <div id="app2">
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showModal" v-on:click="showModal = false"></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal" v-if="showModal">
      <h1>Lorem Ipsum</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem provident explicabo accusamus laudantium voluptatum nobis sed nesciunt neque possimus molestiae?</p>
      </div>
    </transition>
    </div>
</template>

<script>

export default{
  name:"HistoryComponent",
  props: ["modal"],
  show(){
    return {
      showModal: true
    };
  },
  hide(){
    return {
      showModal: false
    };
  },
};
</script>

<style scoped lang="scss">

* {
 margin: 0;
 padding: 0;
 box-sizing: border-box;
}

body {
 font-family: 'montserrat', sans-serif;
}
#app2 {
 position: relative;
 
 display: flex;
 justify-content: center;
 align-items: center;
 
 width: 100vw;
 min-height: 100vh;
 overflow-x: hidden;
}

#historybutton {
 appearance: none;
 outline: none;
 border: none;
 background: none;
 cursor: pointer;
 
 display: inline-block;
 padding: 15px 25px;
 background-image: linear-gradient(to right, #CC2E5D, #FF5858);
 border-radius: 8px;
 
 color: #FFF;
 font-size: 18px;
 font-weight: 700;
 
 box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
 transition: 0.4s ease-out;
}
 .button
 :hover {
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
 }


.modal-overlay {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 z-index: 98;
 background-color: rgba(0, 0, 0, 0.3);
}

.modal {
 position: fixed;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 z-index: 99;
 
 width: 100%;
 max-width: 400px;
 background-color: #FFF;
 border-radius: 16px;
 
 padding: 25px;
}
.modal
.h1 {
color: #222;
font-size: 32px;
font-weight: 900;
margin-bottom: 15px;
}

.modal
.p {
color: #666;
font-size: 18px;
font-weight: 400;
margin-bottom: 15px;
}

.fade-enter-active,
.fade-leave-active {
 transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
 opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
 transition: transform .5s;
}

.slide-enter,
.slide-leave-to {
 transform: translateY(-50%) translateX(100vw);
}
</style>

