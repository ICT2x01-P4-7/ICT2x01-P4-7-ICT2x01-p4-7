<template>
  <div>
    <b-modal ref="tutorial-modal" :hide-header-close="true" hide-footer>
      <div class="d-block text-center">
        <h2 class="h2 mb-3 fw-normal text-center pb-3">Tutorial Video</h2>

        <iframe width="400" height="315" src="https://www.youtube.com/embed/sfQaGgH6KxY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <hr />
          <div class="p-3 text-center">
            <b-container>
              <b-row>
                <b-col>
                  <b-button
                    variant="secondary"
                    type="button"
                    class="btn btn-primary btn-lg"
                    @click="cancel"
                  >
                    Cancel
                  </b-button></b-col
                >
              </b-row>
            </b-container>
          </div>
      </div>
    </b-modal>
  </div>
</template>

<script>


export default {
  name: "tutorial-screen",
  methods: {
    showModal() {
      this.$refs["tutorial-modal"].show();
    },
    hideModal() {
      this.$refs["tutorial-modal"].hide();
    },
    cancel() {
      this.hideModal();
    },
  },
};

</script>
