<template lang="pug">
    list-item(:data="listData")
</template>

<script>
import { ListItem } from "@/components/componentImports";

export default {
  name: "staticcoursepage",
  components: {
    ListItem
  },
  props: {
    name: String
  },
  data() {
    return {
      listData: {
        elements: [
          {
            type: 'h1', 
            instanceName: "text-item",
            text: "Static Course Page", 
            style:"",
            id: "487y3yauzusvlndj"
          },
          {
            type: "img",
            instanceName: "image-item",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMn21luHa1AcUwfJfQC9a0uozdMEGiHGOaIIgfgAX_0a8fCJkh",
            width: "30%",
            id: "87yy4tugnjkjbyy92oq"
          },
          {
            type: 'h3', 
            isEditMode2: true,
            instanceName: "text-item",
            text: "Subsection 1", 
            style:"",
            id: "66udhdtfht"
          },
          {
            type: 'p', 
            isEditMode2: true,
            instanceName: "text-item",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
            style:"text-align: justify;text-justify: inter-word;",
            id: "y5yrjrhtgzesewa2"
          },
          {
            type: 'h3', 
            instanceName: "text-item",
            text: "Subsection 2", 
            style:"",
            id: "ijfwoajjglabbfbds"
          },
          {
            type: 'a',
            instanceName: "link-item",
            href: "https://google.com",
            id: "iuyttu56ujy",
            data: {
              elements: [
                {
                  type: 'p', 
                  instanceName: "text-item",
                  text: "Google link",
                  style:"text-align: justify;text-justify: inter-word;",
                  id: "yy65ye66"
                },
              ]
            }
          },
          {
            type: 'p', 
            instanceName: "text-item",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
            style:"text-align: justify;text-justify: inter-word;",
            id: "y4ghurvsjrgrrdg"
          },
          {
            type: 'a',
            instanceName: "link-item",
            href: "http://localhost:8080",
            id: "4456t8uwj",
            data: {
              elements: [
                {
                  instanceName: "image-item",
                  src: "https://files.slack.com/files-pri/TFDG5E7P0-FGU7EK2GL/53520573_10157179161188185_8237806355298123776_n.jpg",
                  width: "30%",
                  id: "6ujtdyjfkltkfyxt"
                }
              ]
            }
          }
        ]
      }
    }
  }
};
</script>
