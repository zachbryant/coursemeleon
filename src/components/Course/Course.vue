<template lang="pug">
  v-container(grid-list-xs fluid align-content-center fill-height pa-0 ma-0)
    v-layout(v-if="loadingCourse" align-center justify-center fill-width fill-height)
      v-progress-circular(indeterminate color="primary")
    //-v-layout(v-if="!!alertMessage" align-end justify-center fill-width fill-height)
    v-layout(v-else row align-center justify-space-between justify-text fill-width fill-height)
      v-flex#courseNav(xs3 lg2 fill-height mr-4 mt-4)
        course-sidebar()
      v-flex#content(column align-center justify-center xs9 lg10 grow fill-height)
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
        v-btn(v-if="isAdmin()" small fab @click="showPermissionDialog = !showPermissionDialog")
          v-icon(color="blue") fa-user
        v-btn(v-if="isEditMode" small fab @click="showFileDialog = !showFileDialog")
          v-icon(color="purple") fa-paperclip
        v-btn(v-if="isEditMode" small fab @click="showColorDialog = !showColorDialog")
          v-icon(color="orange") fa-palette
        v-btn(small fab @click="saveEdit")
          v-icon(v-if="isEditMode" color="green") fa-check
          v-icon(v-else color="green") fa-pencil-alt
        v-btn(v-if="isEditMode" small fab @click="cancelEdit")
          v-icon(color="red") fa-times
    v-dialog(v-model="showPermissionDialog" width="50%")
      v-card(class="px-4 py-2")
        h2 Course Access Settings
        v-layout(row fill-width 
                align-center 
                justify-space-between)
          v-flex(xs5)
            v-switch(v-model="publishSwitch" 
                    :label="publishSwitch ? 'Published' : 'Unpublished'")
          v-flex(xs5)
            v-switch(v-model="whitelistSwitch"
                    :label="whitelistSwitch ? 'Whitelisted' : 'Unwhitelisted'")
          v-flex(xs2)
            v-btn(flat icon block color="primary" @click="saveAccess()")
              v-icon(@click="showPermissionDialog = !showPermissionDialog") fa-check
        draggable(:list="users" class="fill-width" type="transition" name="flip-list" v-if="whitelistSwitch")
          v-layout(v-for="(user, index) in users" row 
                  fill-width 
                  align-center 
                  justify-space-between
                  @mouseover="hoverUser(index)"
                  @mouseleave="hoverUser(-1)")
            v-flex(xs9)
              v-text-field(v-model="user.email" placeholder="User email")
            v-flex(xs2)
              v-select(:items="Object.keys(assignableAccessLevels)" 
                      label="Access"
                      :value="getDefaultAccess(user.level)"
                      @change="setUserLevel($event, index)")
        v-btn(v-if="whitelistSwitch" flat icon block color="primary")
          v-icon(@click="insertUser(users.length)") fa-plus
    v-dialog(v-model="showFileDialog" width="50%")
      v-card
        h2 Upload Files
        file-upload
    v-dialog(v-model="showColorDialog" width="35%")
      v-card(class="px-4 py-3")
        h2 Course Color
        v-layout(fill-width justify-center align-center class="mb-3")
          color-picker(:value="colorPrimary" @input="updateColor")
        v-layout(row fill-width)
          v-flex(xs6)
            v-btn(flat block color="error")
              v-icon(@click="resetColor") fa-times
          v-flex(xs6)
            v-btn(flat block color="primary")
              v-icon(@click="saveColor") fa-check
</template>

<script>
import { FileUpload, TermPicker } from "@/components/componentImports";
import { ACCESS_LEVELS } from "@/apiDefinitions";
import draggable from "vuedraggable";
import { Sketch } from 'vue-color'
const uuidv4 = require("uuid/v4");

export default {
  name: "coursePage",
  components: {
    "list-item": () => import("./Simple/List.vue"),
    "rich-content": () => import("./Simple/RichContent.vue"),
    "course-sidebar": () => import("./Compound/CourseSidebar.vue"),
    FileUpload,
    "term-picker": TermPicker,
    'color-picker': Sketch,
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
      showColorDialog: false,
      newColor: "",
      users: [],
      editedUsers: false,
      hoverUserIndex: -1,
      assignableAccessLevels: {
        None: ACCESS_LEVELS.NONE,
        View: ACCESS_LEVELS.VIEW,
        Edit: ACCESS_LEVELS.EDIT,
        Admin: ACCESS_LEVELS.ADMIN,
        Owner: ACCESS_LEVELS.OWNER
      }
    };
  },
  methods: {
    resetColor() {
      this.newColor = "";
      this.updateVuetifyColors();
      this.showColorDialog = false;
    },
    saveColor() {
      this.colorPrimary = this.newColor;
      this.$store.dispatch("updateCourse", this.course);
      this.showColorDialog = false;
    },
    updateColor(color) {
      this.newColor = color.hex;
      this.updateVuetifyColors();
    },
    updateVuetifyColors() {
      let color = this.newColor || this.colorPrimary;
      this.$vuetify.theme.primary = color;
      this.$vuetify.theme.secondary = color;
      this.$vuetify.theme.accent = color;
    },
    setUserLevel(event, index) {
      this.editedUsers = true;
      console.log(this.assignableAccessLevels[event]);
      this.users[index].level = this.assignableAccessLevels[event];
    },
    canShowFab() {
      return (
        this.isCreate ||
        (this.isLoggedIn && !this.loadingCourse && this.isEditor())
      );
    },
    saveAccess() {
      if (!this.isCreate) {
        this.users = this.users.filter(user => {
          return !!user.email;
        })
        this.$store.dispatch("updateCourse", this.course);
        this.$store.dispatch("setCourseUsers", this.users);
      }
    },
    saveEdit() {
      let users = this.users;
      this.$store.dispatch("toggleEditMode", { users });
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
    isViewerOnly() {
      return this.accessLevel == ACCESS_LEVELS.VIEW;
    },
    isEditor() {
      return this.isCreate || this.accessLevel >= ACCESS_LEVELS.EDIT;
    },
    isAdmin() {
      return this.isCreate || this.accessLevel >= ACCESS_LEVELS.ADMIN;
    },
    getDefaultAccess(level) {
      var def = 0;
      for (var key in this.assignableAccessLevels) {
        if (this.assignableAccessLevels[key] == level) {
          return key;
        }
      }
      return def;
    },
    loadUsers() {
      let self = this;
      if (this.isAdmin() && (this.editedUsers || !this.users.length > 0)) {
        this.$store
          .dispatch("getCourseAccessList")
          .then(function(respData) {
            self.users = respData.users;
            self.editedUsers = false;
          })
          .catch(function(err) {});
      }
    },
    loadCourse() {
      // TODO add some animation
      this.loadingCourse = true;
      let self = this;
      if (this.search)
        this.$store
          .dispatch("queryCourse", this.search)
          .then(function(ok) {
            self.loadUsers();
            self.updateVuetifyColors();
          })
          .catch(function(response) {
            console.log(response);
            let message =
              response.data.message || "Oops! We couldn't load this course.";
            switch (response.status) {
              case 404:
                self.$router.push("/404");
                self.$store.commit("setInfoMessage", message);
                break;
              case 500:
                if (message) self.$store.commit("setErrorMessage", message);
                break;
              default: {
                self.$store.commit("setWarningMessage", message);
              }
            }
          })
          .then(function() {
            self.loadingCourse = false;
          });
    },
    hoverUser(index) {
      this.hoverUserIndex = index;
    },
    removeUser(index) {
      this.editedUsers = true;
      this.users.splice(index, 1);
    },
    insertUser(index) {
      this.editedUsers = true;
      this.users.splice(index, 0, {
        email: "",
        level: 0
      });
    }
  },
  computed: {
    colorPrimary: {
      get() {
        return this.$store.getters.courseColor || this.$vuetify.theme.primary;
      },
      set(value) {
        this.$store.commit("setColor", value);
      }
    },
    publishSwitch: {
      get() {
        return this.$store.getters.course.published;
      },
      set(value) {
        this.$store.commit("setPublished", value);
      }
    },
    whitelistSwitch: {
      get() {
        return this.$store.getters.course.whitelist;
      },
      set(value) {
        this.$store.commit("setWhitelisted", value);
      }
    },
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    isEditMode: function() {
      return this.$store.getters.isEditMode;
    },
    course: function() {
      return this.$store.getters.course;
    },
    accessLevel: function() {
      return this.$store.getters.accessLevel;
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
              }, {
                instanceName: "term-picker",
                id: uuidv4(),
                data: {
                  date: new Date().toISOString().substring(0, 10)
                }
              }
            ]
          }
        ],
        course_abbr: "",
        term: "",
        term_start: "",
        term_end: "",
        color: "",
        font: "",
        pri: "no",
        published: false,
        whitelist: false
      });
    } else if (
      this.search &&
      (!this.$store.getters.course ||
        Object.keys(this.$store.getters.course).length == 0)
    ) {
      this.loadCourse();
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
