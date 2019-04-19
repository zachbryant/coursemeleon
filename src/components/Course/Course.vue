<template lang="pug">
  v-container(grid-list-xs fluid align-content-center fill-height pa-0 ma-0)
    v-layout(v-if="loadingCourse" align-center justify-center fill-width fill-height)
      v-progress-circular(indeterminate color="primary")
    v-layout(v-else row align-center justify-space-between justify-text fill-width fill-height)
      v-flex#courseNav(xs3 lg2 fill-height mr-4)
        course-sidebar()
      v-flex#content(column align-center justify-center xs9 lg10 shrink fill-height)
        // TODO add editable title here
        list-item(ref="courseDataList")
    v-layout#fabContainer(v-if="canShowFab()" column justify-end)
      v-speed-dial(v-model="showFab"
              bottom left
              direction="top"
              transition="scale-transition")
        template(v-slot:activator)
          v-btn(v-model="showFab"
                color="primary"
                dark fab)
            v-icon fa-cog
            v-icon fa-times
        v-btn(small fab @click="showPermissionDialog = !showPermissionDialog")
          v-icon(color="blue") fa-user
        v-btn(v-if="isEditMode" small fab @click="showFileDialog = !showFileDialog")
          v-icon(color="purple") fa-paperclip
        v-btn(small fab @click="saveEdit")
          v-icon(v-if="isEditMode" color="green") fa-check
          v-icon(v-else color="green") fa-pencil-alt
        v-btn(v-if="isEditMode" small fab @click="cancelEdit")
          v-icon(color="red") fa-times
    v-dialog(v-model="showPermissionDialog" width="50%")
      v-card
        h2 Course User Access
        draggable(:list="users" class="fill-width" type="transition" name="flip-list")
          v-layout(v-for="(user, index) in users" row 
                  fill-width 
                  align-center 
                  justify-space-between
                  @mouseover="hoverUser(index)"
                  @mouseleave="hoverUser(-1)")
            v-flex(xs1 v-show="hoverUserIndex == index")
              v-btn(flat icon color="error" @click="removeUser(index)")
                v-icon fa-times
            v-flex(xs9)
              v-text-field(v-model="users[index].email" box single-line)
            v-flex(xs2)
              v-select(items="" label="Access")
    v-dialog(v-model="showFileDialog" width="50%")
      v-card
        h2 Upload Files
        file-upload
</template>

<script>
import FileUpload from "@/components/Course/FileUpload.vue";
import draggable from "vuedraggable";
import ACCESS_LEVELS from "@/apiDefinitions";
const uuidv4 = require("uuid/v4");

export default {
  name: "coursePage",
  components: {
    "list-item": () => import("./Simple/List.vue"),
    "rich-content": () => import("./Simple/RichContent.vue"),
    "course-sidebar": () => import("./Compound/CourseSidebar.vue"),
    FileUpload,
    draggable
  },
  props: {
    search: {
      type: Object,
      required: false
    },
    isCreate: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      activeTab: 0,
      showFab: false,
      loadingCourse: false,
      showFileDialog: false,
      showPermissionDialog: false,
      users: [],
      hoverUserIndex
    };
  },
  methods: {
    // TODO update based on permission
    canShowFab() {
      return this.isLoggedIn && !this.loadingCourse;
    },
    saveEdit() {
      this.$store.dispatch("toggleEditMode");
      this.$store.dispatch("setCourseUsers", users);
      if (this.isCreate) {
        this.$router.push({
          path: "/",
          query: {
            cid: this.$store.getters.course.cid
          }
        });
      }
    },
    cancelEdit() {
      this.$store.commit("toggleEditMode");
      this.$router.go();
    },
    getTitle() {
      return this.course.title ? this.course.title : "";
    },
    loadCourse() {
      // TODO add some animation
      this.loadingCourse = true;
      let self = this;
      if (this.search)
        this.$store
          .dispatch("queryCourse", this.search)
          .then(function(ok) {
            console.log(ok);
          })
          .catch(function(error) {
            console.log(error);
            console.log("error getting course");
          })
          .then(function() {
            self.loadingCourse = false;
          });
    },
    hoverUser(index) {
      this.hoverUserIndex = index;
    },
    removeUser(index) {
      this.users.splice(index, 1);
    },
    insertUser(index) {
      this.users.splice(index, 0, {
        email: "",
        level: 0,
      })
    }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    isEditMode: function() {
      return this.$store.getters.isEditMode;
    }
  },
  created() {
    if (this.isCreate) {
      this.$store.commit("setEditMode", true);
      this.$store.commit("setActiveCourse", {
        course_name: "",
        cid: uuidv4(),
        tabs: [
          {
            title: "",
            id: uuidv4(),
            elements: [
              {
                instanceName: "text-item",
                id: uuidv4(),
                data: {
                  type: "h1",
                  text: ""
                }
              }
            ]
          }
        ],
        course_abbr: "",
        term: "",
        term_start: "",
        color: "",
        font: "",
        pri: "no",
        published: false,
        whitelist: false
      });
      console.log("Creating course"); 
      console.log(this.$store.getters.course);
    }
    else if (this.search && (!this.$store.getters.course || Object.keys(this.$store.getters.course).length == 0)) {
      this.loadCourse();
      // TODO load course users
    }
  }
};
</script>

<style lang="less">
#fabContainer {
  position: fixed;
  bottom: 30px;
  left: 30px;
}
.fill-width {
  width: 100%;
}
</style>
