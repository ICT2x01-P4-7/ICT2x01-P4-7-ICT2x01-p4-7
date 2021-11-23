<template>
  <div class = "popup">
      <div class="popup-inner">
          <slot /> <!--  CONTENTS WITHIN <Popup> in App.vue will appear here-->
        <button type="button" class="close" @click="$emit('close')">CLOSE POPUP</button>
        </div>

      </div>
</template>

<script>
export default {
    name: 'Popup', 
    methods: {
        close() {
            this.$emit('close');
        },
    },
};
</script>

<style>

</style>