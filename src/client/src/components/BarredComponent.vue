<template>
  <div class="container">
      <div id="title">
          <h1>Barred Log In 🚗</h1>
      </div>
      <div class="timer">
          <svg
        width="163"
        height="165"
        viewBox="-8 -8 184 188"
        fill="none"
        id="first-segment"
      ><!--First path refers to the background line-->
        <path
          stroke="#E9D2B1"
          stroke-width="15"
          stroke-linecap="round"
          d="M165.16,163.38A172,172,0,0,0,0,0"
        />
        <!--Second path with the ID refers to the timer line -->
        <path
          id="top-right"
          stroke="#F85959"
          stroke-width="15"
          stroke-linecap="round"
          d="M165.16,163.38A172,172,0,0,0,0,0"
        />
      </svg>
      <svg
        width="163"
        height="165"
        viewBox="-8 -8 184 188"
        fill="none"
        id="second-segment"
      >
        <path
          stroke="#E9D2B1"
          stroke-width="15"
          stroke-linecap="round"
          d="M0,163.34A172,172,0,0,0,164.44,0"
        />
        <path
          id="bottom-right"
          stroke="#F85959"
          stroke-width="15"
          stroke-linecap="round"
          d="M0,163.34A172,172,0,0,0,164.44,0"
        />
      </svg>
      <svg
        width="163"
        height="165"
        viewBox="-8 -8 184 188"
        fill="none"
        id="third-segment"
      >
        <path
          stroke="#E9D2B1"
          stroke-width="15"
          stroke-linecap="round"
          d="M0,0A172,172,0,0,0,165.16,162.61"
        />
        <path
          id="bottom-left"
          stroke="#F85959"
          stroke-width="15"
          stroke-linecap="round"
          d="M0,0A172,172,0,0,0,165.16,162.61"
        />
      </svg>
      <svg
        width="163"
        height="165"
        viewBox="-8 -8 184 188"
        fill="none"
        id="fourth-segment"
      >
        <path
          stroke="#E9D2B1"
          stroke-width="15"
          stroke-linecap="round"
          d="M160.17,0A172,172,0,0,0,0,161.51"
        />
        <path
          id="top-left"
          stroke="#F85959"
          stroke-width="15"
          stroke-linecap="round"
          d="M160.17,0A172,172,0,0,0,0,161.51"
        />
      </svg>
      <h2>{{timeDisplay}}</h2>
      </div>
      <button @click="handleButtonClick">{{buttonText}}</button>
  </div>


</template>

<script>
import ProgressBar from 'progressbar.js'
export default {
    name: 'Home',
    data: function() {
        const pomodoroDuration = 0.1 * 60; /* Can be edited to change the number shown*/
        /*12.5 will display 12:30*/
        return {
            /*currenTimeInSeconds will give an error because you cannot refer to another variable
            from return if you put pomodoroDuration in the return*/
            currentTimeInSeconds: pomodoroDuration,
            currentSegment: 1,
            buttonText: 'Start',
            topRight: null,
            bottomRight: null,
            bottomLeft: null,
            topLeft: null,
            pathOptions: {
                easing: "linear",
                duration: pomodoroDuration * 1000, /*1000 milliseconds = 1 second*/
                /*use pathOption in the progressBar input)*/
            },
            interval: null,
        }
    },
    mounted: function() { /*Mounted is like a lifecycle hook*/ 
    /*#top-right id refers to the top right path in the template*/
    /*Need a const for each side*/

        this.topRight = new ProgressBar.Path("#top-right",this.pathOptions);
        this.topRight.set(1); /*For the error "topRight assigned a value but never used"*/

        this.bottomRight = new ProgressBar.Path("#bottom-right", this.pathOptions);
        this.bottomRight.set(1);

        this.bottomLeft = new ProgressBar.Path("#bottom-left", this.pathOptions);
        this.bottomLeft.set(1);

        this.topLeft = new ProgressBar.Path("#top-left", this.pathOptions);
        this.topLeft.set(1);
    },

    methods: {
        handleButtonClick() {
            console.log('hi');
        /*If set to 0.5, topright line will appear to count half of the line*/
        /*Set to 1 on default but once press button, expect it to animate to 0*/
        /*topRight is not defined error because it is defined under mounted and we are 
        unable to refer to it*/ 
        /*Solution is to declare and set all to null under the data section of "export default"*/
        /*also change the to this. instead of const under mounted:() */
            if (this.buttonText === 'Start' || this.buttonText === 'Resume') {
                this.buttonText = "Pause";
                this.animateBar();
            } else if (this.buttonText === 'Pause') {
                this.buttonText = 'Resume';
            }
        },

        animateBar() {
            this.interval = setInterval(() => {
                this.currentTimeInSeconds -=1; /*To countdown the timer seconds*/
            },1000)
            switch(this.currentSegment) {
                case 1:
                    this.topRight.animate(0, this.onFinish);
                    break;
                case 2:
                    this.bottomRight.animate(0,this.onFinish);
                    break;
                case 3:
                    this.bottomLeft.animate(0, this.onFinish);
                    break;
                case 4:
                    this.topLeft.animate(0, this.onFinish);
                    break;

            }
        },

        onFinish() {
            clearInterval(this.interval);
        }


    },
    computed: {
        timeDisplay() {
            const minutes = parseInt(this.currentTimeInSeconds / 60);
            const seconds = this.currentTimeInSeconds % 60;
            /*Slice to get the first 2 character*/
            const paddedMinutes = ("0" + minutes).slice(-2);
            const paddedSeconds = ("0" + seconds).slice(-2);
            return `${paddedMinutes}:${paddedSeconds}`;
            /*use this result of this at the <h2> under the template*/
        },
    },
};
</script>

<style>
.container {
    height: 100vh; /*to make colour cover the whole screen*/
    display: flex;
    flex-direction: column;
    align-items: center; /*Align everything to the center */
}

#title {
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    align-items:center;
}

h1 {
    font-size: 40px;
    color: black;
}

.timer {
    position:relative;
    /*To create space between button, and title from the timer */
    margin-top:100px;
    width: 330px;
    height: 330px;

}

/*Segments to draw the timer outershape*/

#first-segment {
    position: absolute;
    top: 0;
    right: 0;
}

#second-segment {
    position: absolute;
    bottom: 0;
    right: 0;
}

#third-segment {
    position: absolute;
    bottom: 0;
    left: 0;
}

#fourth-segment {
    position: absolute;
    top: 0;
    left: 0;
}

h2 {
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%); /*Go back 50% from that 50% to align center*/
    font-size: 64px;
    color:black;
}

button {
    margin-top: 50px;
    width: 200px;
    height: 68px;
    background: black;
    border-radius: 20px;
    border: none;
    cursor: pointer;

    font-size: 36px;
    line-height: 45px;
    text-align:center;
    color: #fff8ee;
}

button:focus {
    outline: none; /*So there will be no outline around the button after clicking */
}
</style>

