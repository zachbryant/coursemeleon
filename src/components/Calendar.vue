<template>
    <div>
      <v-container grid-list-xl></v-container>
      <h1>Calendar</h1>
      <iframe 
          src="https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FNew_York" 
          style="border: 0" 
          width="65%" 
          height="600" 
          frameborder="0" 
          scrolling="no">
      </iframe>
      <br/>
      <v-container grid-list-xl>
        <div class="links">
          <v-btn id="linkItem"
            color="blue-grey"
            class="white--text"
            href="https://www.google.com/calendar/ical/256h9v68bnbnponkp0upmfq07s%40group.calendar.google.com/public/basic.ics"
          >
            Ical
            <v-icon right dark>cloud_download</v-icon>
          </v-btn>
        </div>
      </v-container>
      <v-container grid-list-xl></v-container>
    </div>
</template>

<script>
export default {
  name: "Calendar",
  props: {
    msg: String
  }
};
</script>

<style scoped lang="less">
.links {
  width: 75%;
  text-align: right;
  margin: auto;
  /*white-space: nowrap;*/
}

#linkItem {
  float: right;
}

</style>