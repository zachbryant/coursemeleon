<template>
  <div class="modal-backdrop">
    <div class="modal">
      <slot name="header">
      </slot>

      <slot name="body">
      </slot>

      <slot name="footer">
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CloneModal',

    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Update term
        </slot>

        <button type="button" class="btn-close" @click="close"> x </button>

      </header>
      <section class="modal-body">
        <slot name="body">
          New term 
          <v-text-field
            label="Term"
          ></v-text-field>
        </slot>
        
       </section>
       <footer class="modal-footer">
          <button
              type="button"
              class="btn-green"
              @click="close"
            >
              Close
          </button>
      </footer>
    </div>
  </div>
</template>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity .3s ease;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: inline;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #AED581;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
    display: inline;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #AED581;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #AED581;
    border: 1px solid #AED581;
    border-radius: 2px;
  }
</style>