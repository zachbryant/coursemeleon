<template lang="pug">
	v-container(fluid pa-0)
		v-layout(row align-center)
			v-flex(mr-5)
				h2 Your Courses
			v-flex(mx-4)
			v-flex(ml-5)
				v-btn(:disabled="saved.length == 0" flat icon color="primary")
					v-icon fa-th-large
		v-layout(column align-center mt-5)
			h3(v-if="saved.length == 0") It's lonely in here. Search for a course to get started.
			ul(style="width: 100%;")
				v-list-group(v-for="term in saved" :key="term.title" v-model="term.active" no-action)
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
              title:
                "CS 308: Principles of Software Engineering & more text here & more & more & more",
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
    openCourse(course, event) {
      console.log(course);
    }
  }
};
</script>

<style lang="less"></style>
