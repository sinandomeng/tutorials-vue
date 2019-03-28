<template>
  <div>
    <h1>Event Details</h1>

    <div class="details-container">
      <div class="event-header">
        <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
        <h1>{{ event.title }}</h1>
        <h5>Organized by {{ event.organizer }}</h5>
        <h5>Category: {{ event.category }}</h5>
      </div>

      <BaseIcon name="map">
        <h2>Location</h2>
      </BaseIcon>

      <address>{{ event.location }}</address>

      <h2>Event details</h2>
      <p>{{ event.description }}</p>

      <h2>
        Attendees
        <span class="badge -fill-gradient">{{ (event.attendees) ? event.attendees.length : 0 }}</span>
      </h2>

      <ul class="list-group">
        <li class="list-item" v-for="(attendee, index) in event.attendees" :key="index">
          <b>{{ attendee.name }}</b>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: ['id'],
  data() {
    return { attendees: [] }
  },
  created() {
    this.fetchEvent(this.id)
  },
  methods: { ...mapActions('event', ['fetchEvent']) },
  computed: mapState({
    event: state => state.event.event
  })
}
</script>

<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
