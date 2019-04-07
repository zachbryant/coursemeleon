<template>
  <div>
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
              v-model="new_term"
              label="Enter new term"
              id="new_term"
            ></v-text-field>
          </slot>
          
        </section>
        <footer class="modal-footer">
            <button
                type="button"
                class="btn-green"
                @click="cloneCourse"
              >
                Clone
            </button>
        </footer>
      </div>
    </div>
  </div>
</template>



<script>
  import CourseService from "../CourseService";
  export default {
    name: 'CloneModal',
    data() {
      return {
        courses: [],
        new_term: "",
      };
    },
    async created() { //runs automatically when component created
        try {
            this.courses = await CourseService.getPosts(); //populate courses array
        } catch(err) {
            this.error = err.message;
        }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      async cloneCourse() {
        try {
            this.courses = await CourseService.getPosts(); //populate courses array
        } catch(err) {
            this.error = err.message;
        }
        const t =
          this.courses[this.courses.length-1].courseID +
          "cmsplit" +
          this.courses[this.courses.length-1].courseTitle +
          "cmsplit" +
          this.new_term +
          "cmsplit" +
          this.courses[this.courses.length-1].termStart +
          "cmsplit" +
          this.courses[this.courses.length-1].googleCal +
          "cmsplit" +
          this.courses[this.courses.length-1].iCal +
          "cmsplit" +
          this.courses[this.courses.length-1].grades +
          "cmsplit" +
          this.courses[this.courses.length-1].announcements +
          "cmsplit" +
          this.courses[this.courses.length-1].resourceLink +
          "cmsplit" +
          this.courses[this.courses.length-1].contactInfo +
          "cmsplit" +
          this.courses[this.courses.length-1].generalText;
      console.log(t);
      await CourseService.insertPost(t);
      alert("Success! Course created!");
      //this.courses = await CourseService.getPosts();
    },
    },
  };
</script>

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
    width: 20%;
    padding:20px;
  }

  .modal-header,
  .modal-footer {
    padding: 10px;
    display: inline;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #AED581;
    font-size: 20px;
    font-weight: 600;
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
    color: rgb(121, 121, 121);
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #AED581;
    border: 1px solid #AED581;
    border-radius: 2px;
  }
</style>