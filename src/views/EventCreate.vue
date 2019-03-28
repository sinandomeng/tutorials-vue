<template>
  <div class="create">
    <h1>Create Event</h1>

    <form @submit.prevent="createEvent">
      <div class="field">
        <label>Select a category</label>
        <select v-model="event.category">
          <option value="" disabled selected>Pick a category</option>
          <option v-for="cat in categories" :key="cat">{{ cat }}</option>
        </select>
      </div>

      <!-- <h3>Name & describe your event</h3> -->

      <div class="field">
        <label>Title</label>
        <input v-model="event.title" type="text" placeholder="Add an event title"/>
      </div>

      <div class="field">
        <label>Description</label>
        <input v-model="event.description" type="text" placeholder="Add a description"/>
      </div>

      <!-- <h3>Where is your event?</h3> -->

      <div class="field">
        <label>Location</label>
        <input v-model="event.location" type="text" placeholder="Add a location"/>
      </div>

      <!-- <h3>When is your event?</h3> -->

      <div class="field">
        <label>Date</label>
        <datepicker placeholder="Select a date" format="yyyy-MM-dd" v-model="event.date" @closed="event.date=formatDate(event.date)"></datepicker>
      </div>

      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>

      <input type="submit" class="button -fill-gradient" value="Submit"/>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }

    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  methods: {
    formatDate(date) {
      var m1 = date.getMonth() + 1
      var m2 = m1 < 10 ? '0' + m1 : m1
      var d1 = date.getDate()
      var d2 = d1 < 10 ? '0' + d1 : d1

      return [date.getFullYear(), m2, d2].join('-')
    },
    createEvent() {
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(result => {
          if (result.data.success) {
            this.$router.push({
              name: 'event-show',
              params: { id: result.data.response.id }
            })
          }

          this.event = this.createFreshEventObject()
        })
        .catch(error => {
          console.log('There was an error: ' + error.message)
        })
    },
    createFreshEventObject() {
      return {
        category: 'sustainability',
        organizer: 'John Doe',
        title: 'Title',
        description: 'Description',
        location: 'Location',
        date: '2019-03-01',
        time: '20:00'
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 20px;
}

.button {
  background: #39b982;
  color: #ffffff;
  padding: 20px;
  border: 0px;
  border-radius: 5px;
  font-weight: 700;
  text-transform: uppercase;
}
</style>
