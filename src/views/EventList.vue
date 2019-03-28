<template>
  <div>
    <h1>Events Listing</h1>

    <router-link
      v-if="page !== 1"
      :to="{ name: 'event-list', query: { page: page - 1 }}"
      rel="prev"
    >
      Previous Page
    </router-link>

    <router-link
      v-if="event.events.total > (page * 5)"
      :to="{ name: 'event-list', query: { page: page + 1 }}"
      rel="next"
    >
      Next Page
    </router-link>

    <EventCard
      v-for="event in event.events.data"
      v-bind:key="event.id"
      :event="event"
    />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch('event/fetchEvents', this.page)
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState(['event'])
  }
}
</script>
