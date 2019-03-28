<template>
  <router-link
    class="event-card"
    :to="{ name: 'event-show', params: { id: event.id, event: event  }}"
  >
    <div>
      <span>@ {{ event.time }} on {{ event.date }}</span>
      <h4>({{ event.id }}) {{ event.title }}</h4>
      <BaseIcon name="users">{{ (event.attendees) ? event.attendees.length : 0 }} attending</BaseIcon>
    </div>
  </router-link>
</template>

<script>
export default {
  props: { event: Object },
  data() {
    return {
      attendee: null
    }
  }
}
</script>

<style lang="scss" scoped>
.event-card {
  border: 1px solid #ccc;
  color: #0a0a0a;
  display: block;
  padding: 30px;
  text-decoration: none;
  margin: 30px 0px;

  h4 {
    font-weight: 600;
    margin: 10px 0px;
  }
}
</style>
