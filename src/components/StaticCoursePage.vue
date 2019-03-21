<template lang="pug">
    v-layout(column align-start justify-start)
      text-item(:data="titleData" :key="titleData.id")
      br
      br
      v-layout(column justify-text)
        image-item(:data="imageData" :key="imageData.id")
        h5 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        br
        br
        br
        link-item(:data="linkData" :key="linkData.id")
        p Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        br
        br
        br
        h3 Subsection
        p Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        br
        br
        br
        h3 Subsection
        p Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        br
        br
        br
        h3 Subsection
        p Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        br
</template>

<script>
import { TextItem, LinkItem, ImageItem } from "@/components/componentImports";

export default {
  name: "staticcoursepage",
  components: {
    TextItem,
    ImageItem,
    LinkItem
  },
  props: {
    name: String
  },
  data() {
    return {
      titleData: {
        type: 'h1', 
        instanceName: "text-item",
        text: "Static Course Page", 
        style:"",
        id: "487y3yauzusvlndj"
      },
      imageData: {
        instanceName: "image-item",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMn21luHa1AcUwfJfQC9a0uozdMEGiHGOaIIgfgAX_0a8fCJkh",
        width: "30%",
        id: "87yy4tugnjkjbyy92oq"
      },
      linkData: {
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
              id: "yy6u76i76rjd23r2qt"
            }
          ]
        }
      }
    }
  }
};
</script>
