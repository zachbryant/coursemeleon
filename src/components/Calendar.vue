<template>
    <div>
        <v-container grid-list-xl></v-container>
        <h1>Calendar</h1>
        <iframe 
            src="https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FNew_York" 
            style="border: 0" 
            width="50%" 
            height="600" 
            frameborder="0" 
            scrolling="no">
        </iframe>
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