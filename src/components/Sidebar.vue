<template lang="pug">
	v-container(align-start justify-start fluid pa-0 row)
		v-layout(row justify-center)
			h3 Your Courses
			//-v-btn(:disabled="saved.length == 0" flat icon color="primary")
				v-icon fa-th-large
		v-layout(column)
			h5(v-if="saved.length == 0") It's lonely in here. Search for a course to get started.
			ul#termlist(full-width)
				v-list-group#courselist(v-for="term in saved" :key="term.title" v-model="term.active" no-action)
					v-list-tile(slot="activator")
						h4 {{ term.title }}
					li(v-for="course in term.courses" :key="course.id" @click.stop="openCourse(course, $event)")
							CourseListItem(:title="course.title" :id="course.id" :saved="course.saved")


</template>

<script>
import CourseListItem from "@/components/CourseListItem";

export default {
  name: "sidebar",
  components: {
    CourseListItem
  },
  props: {},
  data() {
    return {
      saved: [
        {
          title: "Spring 2019",
          active: true,
          courses: [
            {
              title: "CS 307: Principles of Software Engineering",
              id: "1",
              saved: true
            },
            {
              title: "CS 308: Principles of Software Engineering",
              id: "2",
              saved: false
            },
            { title: "CS 309: Principles of Software Engineering", id: "3" }
          ]
        },
        {
          title: "Fall 2018",
          active: true,
          courses: [
            {
              title: "CS 310: Principles of Software Engineering",
              id: "4",
              saved: false
            },
            {
              title: "CS 311: Principles of Software Engineering",
              id: "5",
              saved: true
            },
            {
              title: "CS 312: Principles of Software Engineering",
              id: "6",
              saved: false
            }
          ]
        }
      ]
    };
  },
  methods: {
    openCourse(courseObject, event) {
      this.$router.push({ path: "/", query: { course: courseObject.title } });
    }
  }
};
</script>

<style lang="less">
@import (reference) "../App.less";

ul,
ol {
  width: 100%;
  list-style-type: none;
  padding-left: 0 !important;
}
#termlist > div {
  margin-top: 2vh;
  div {
    padding-left: 0 !important;
  }
}
#courselist li {
  margin-top: calc(5px + 1vh);
}
</style>
