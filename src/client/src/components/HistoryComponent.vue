<template>
<<<<<<< HEAD
    <div>
        <transition name="fade" appear>
            <div class="modal-overlay" v-if="showModal" v-on:click="modalToggle">
            </div>
        </transition>
        <transition name="slide" appear>
            <div class="modal" v-if="showModal">
                <h1>History</h1>
                <button class="button close" v-on:click="modalToggle">
                    Close
                </button>
                <div class="history-container">
                    <div class="history-item" >
                        <h2>
                            Attempt 1
                        </h2>
                        <p>1. Turn Right</p>
                        <p>2. Move Backwards</p>
                        <p>3. Turn Left</p>
                    </div>
                    <div class="history-item" >
                        <h2>
                            Attempt 2
                        </h2>
                        <p>1. Turn Right</p>
                        <p>2. Move Backwards</p>
                        <p>3. Turn Left</p>
                    </div>
                    <div class="history-item" >
                        <h2>
                            Attempt 3
                        </h2>
                        <p>1. Turn Right</p>
                        <p>2. Move Backwards</p>
                        <p>3. Turn Left</p>
                    </div>
                    <div class="history-item" >
                        <h2>
                            Attempt 4
                        </h2>
                        <p>1. Turn Right</p>
                        <p>2. Move Backwards</p>
                        <p>3. Turn Left</p>
                    </div>
                </div>
            </div>
        </transition>
            
        <button class=button v-on:click="modalToggle()" ref="history">HistoryHistoryHistoryHistory</button>
=======
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
>>>>>>> 38213373804368188da684ba2cf1b226aee2a949
    </div>
</template>

<script>

<<<<<<< HEAD
export default {
    data(){
        return{
            showModal: false
        }
    },
    methods: {
        modalToggle(){
            this.showModal = !this.showModal;
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'montserrat', sans-serif;
}

#app {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
}

.button {
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

 .close{
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 10px;
    margin-right: 10px;
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
    width: 90%;
    height: 90vh;
    background-color: #FFF;
    border-radius: 16px;
    padding: 25px;
}
.modal
h1 {
    color: #222;
    font-size: 50px;
    font-weight: 900;
    text-align: left;
    margin-left: 50px;
    margin-bottom: 30px;
    margin-top: 10px;
    overflow: auto;
 }
 
.modal
p {
    color: #666;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 6px;
}

.history-container{
    overflow: auto;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 70vh
}

.history-item{
    background-color:rgb(124, 124, 124);
    position: relative;
    left: 5%;
    width: 90%;
    height: 90%;
    border-radius: 8px;
    margin-bottom: 10px;
}

.history-item
h2 {
    color: white;
    font-size: 30px;
    text-align: left;
    margin-left: 30px;
    margin-top: 10px;
    padding-top: 20px;
}

.history-item
p{
    color: white;
    margin-top: 1%;
    padding-bottom: 3%;
=======
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
>>>>>>> 38213373804368188da684ba2cf1b226aee2a949
}

.fade-enter-active,
.fade-leave-active {
<<<<<<< HEAD
    transition: opacity .5s;
=======
 transition: opacity .5s;
>>>>>>> 38213373804368188da684ba2cf1b226aee2a949
}

.fade-enter,
.fade-leave-to {
<<<<<<< HEAD
    opacity: 0;
=======
 opacity: 0;
>>>>>>> 38213373804368188da684ba2cf1b226aee2a949
}

.slide-enter-active,
.slide-leave-active {
<<<<<<< HEAD
    transition: transform .5s;
=======
 transition: transform .5s;
>>>>>>> 38213373804368188da684ba2cf1b226aee2a949
}

.slide-enter,
.slide-leave-to {
<<<<<<< HEAD
    transform: translateY(-50%) translateX(100vw);
}
</style>
=======
 transform: translateY(-50%) translateX(100vw);
}
</style>

>>>>>>> 38213373804368188da684ba2cf1b226aee2a949
