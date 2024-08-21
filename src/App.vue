<template>
  <v-app>
    <v-app-bar app color="white" justify="space-around" collapse-on-scroll elevate-on-scroll>
      <!-- <router-link to="/">
        <v-btn icon to="/home">
          <v-img src="./assets/img/jing5.jpg"></v-img>
        </v-btn>
      </router-link> -->
      <!-- <v-navigation-drawer>...</v-navigation-drawer> -->
      <v-btn icon @click.stop="drawer = !drawer">
        <v-avatar icon="mdi-vuetify" image="src/assets/img/jing5.jpg"></v-avatar>
      </v-btn>
      <v-toolbar-title>Serenity Acupuncture</v-toolbar-title>
        <v-tabs align-with-title height="inherit">
          <v-tab v-for="link in links" :key="link" router :to="'/' + link.toLowerCase().split(' ')[0].replace('about', '')" color="grey" variant="text" class="mx-2" rounded="xl">
              {{ link }}
          </v-tab>
        </v-tabs>
        <!-- <v-breadcrumbs :items="links" divider="" type="button" align-with-title height="inherit"></v-breadcrumbs> -->
        <v-spacer></v-spacer>
        <v-chip class="ma-2" color="primary" variant="outlined" @click.stop="bookingDialog = !bookingDialog" @click="fetchGoogleData">
          Book Online
          <v-icon end icon="mdi-account-outline"></v-icon>
        </v-chip>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list-item prepend-avatar="src/assets/img/image1.jpg" title="Administrators"></v-list-item>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-login" title="Log in" value="login"></v-list-item>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="Dashboard"></v-list-item>
        <v-list-item prepend-icon="mdi-logout" title="Log out" value="logout"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <Login></Login>

    <!-- Dialog #1 -->
    <v-dialog v-model="bookingDialog1" width="auto" @click:outside="bookingDialog = !bookingDialog1; timeSelection = null;">
        <v-card class="align-center" style="padding:10px;">
          <v-icon @click="bookingDialog = !bookingDialog1; timeSelection = null;" color="error" style="position:absolute; top:-2px; right:-2px;">mdi-close-box</v-icon>
        <!-- <v-btn icon="mdi-close-circle-outline" color="red" variant="outlined" size="x-small" top right @click="bookingDialog = !bookingDialog1"></v-btn> -->
          <v-card-title>
            Select Session & Date
          </v-card-title>
          <v-row style="--v-selection-control-size:0px; --v-input-control-height:0px; margin:0px 3px 0px 3px;">
            <v-radio-group v-model="sessionType" inline color="blue">
              <v-radio label="60-min $125" value="60"></v-radio>
              <v-radio label="90-min (two-sided) $125" value="90"></v-radio>
            </v-radio-group>
          </v-row>

          <v-row style="--v-selection-control-size:0px; --v-input-control-height:0px; margin:0px 3px 0px 3px;">
            <v-checkbox v-model="partOfDay" label="Morning" color="primary" value="morning" hide-details>
            </v-checkbox>
            <v-checkbox v-model="partOfDay" label="Afternoon" color="primary" value="afternoon" hide-details>
            </v-checkbox>
            <v-checkbox v-model="partOfDay" label="Evening" color="primary" value="evening" hide-details>
            </v-checkbox>
          </v-row>

          <vc-date-picker v-model="date" style="margin:0px 20px 20px 20px" trim-weeks :columns="$screens({ default: 1, lg: 1 })" :min-date="new Date()" :max-date="new Date().setMonth(new Date().getMonth()+3)" is-required :disabled-dates='disabledDates'/>

          <v-card-text v-if="timeTable" class="font-weight-bold">
            Select Time
          </v-card-text>
          <v-card-text v-else class="text-center">
            <span class="font-weight-bold" style="color:dodgerblue;">No time availability</span>
            <span style="color:dodgerblue; width:270px; display:flex; font-size: small;">for this search. Please re-select the parameters above.</span>
          </v-card-text>

          <!-- Time chips table -->
          <v-row v-if="timeTable" class="justify-center" style="width:270px; margin:0px 0px 15px 0px;">
            <v-chip-group v-model="timeSelection" @click="bookingDialog2 = true" selected-class="text-green" style="flex-wrap:wrap;" class="justify-center">
              <v-chip v-for="time in timeTable" :key="time" :value="time" style="color:forestgreen; margin-right:0px; margin:4px;">
                <span class="text-center justify-center font-weight-bold" style="width:35px;">
                  {{ time }}
                </span>
              </v-chip>
            </v-chip-group>
          </v-row>

          <v-card-actions class="py-6">
            <v-btn variant="tonal" color="red" @click="(bookingDialog = null)">
              <v-icon>mdi-cancel</v-icon> &nbsp;Cancel
            </v-btn>
          </v-card-actions>

        </v-card>
    </v-dialog>

    <!-- Dialog #2 -->
    <v-dialog v-if="timeSelection" v-model="bookingDialog2" width="auto" @click:outside="timeSelection = null;">
      <v-card class="align-center" style="padding:10px;">
        <v-icon @click="bookingDialog2 = !bookingDialog2; bookingDialog = null; timeSelection = null;" color="error"
          style="position:absolute; top:-2px; right:-2px;">mdi-close-box</v-icon>
        <v-card-title>
          Confirm & Submit
        </v-card-title>
        <v-card-text class="text-center" style="color:forestgreen;">
          <span class="font-weight-bold">
            {{ this.sessionType }}
          </span> 
          minutes acupuncture on
          <br>
          <span class="font-weight-bold">
            {{ this.weeks[date.getDay()] }}, {{ this.months[date.getMonth()] }} {{ date.getDate() }}
          </span>, {{ date.getFullYear() }}
          <br>
          at
          <span class="font-weight-bold">
            {{ timeSelection }} {{ timeSelection.substring(0, timeSelection.indexOf(":")) < 12 ? "AM" : "PM" }}
          </span>
          <br>
          The fee is 
          <span class="font-weight-bold">
            $125
          </span> CAD
        </v-card-text>

        <v-form v-model="bookingForm" @submit.prevent="onSubmit">
            <v-radio-group v-model="clientType" inline color="blue" :rules="[required]" >
              <v-radio label="New Client" value="new"></v-radio>
              <v-radio label="Returning Client" value="returning"></v-radio>
            </v-radio-group>

            <v-text-field label="Phone number e.g. 6043334444"
              v-model="phone"
              :readonly="loading"
              :rules="[required, isCanadaBCNumber, isTenDigitNumber]"
              clearable
              placeholder="Enter your phone number"
            ></v-text-field>
            <v-text-field label="E-mail e.g. adam123@gmail.com" 
              v-model="email" 
              :readonly="loading"
              :rules="[required, isValidEmail]" 
              clearable
              placeholder="Enter your e-mail"
            ></v-text-field>

            <!-- VueRecaptchaV2 -->
              <vue-recaptcha v-if="clientType && phone && email" sitekey="6LcgGLwjAAAAAHqM9IEaju-hORsaQsZhbyMVWfBp" @verify="onVerify" @expired="onExpired"></vue-recaptcha>

            <!-- VueRecaptchaV3 -->
            <VueRecaptchaV3 :bookingForm="bookingForm" :loading="loading" :recaptchaV2="recaptchaV2"
              @responseRecaptchaV3="(msg) => recaptchaV3 = msg" />
        </v-form>

        <v-card-actions>
          <v-col>
            <v-btn variant="tonal" color="primary" style="margin-top:20px;" @click="bookingDialog2 = !bookingDialog2; timeSelection = null;">
              &nbsp;<v-icon>mdi-reply</v-icon> &nbsp;Back &nbsp;
            </v-btn>
          </v-col>
          <v-col>
            <v-btn variant="tonal" color="red" style="margin-top:20px;" @click="bookingDialog2 = !bookingDialog2; bookingDialog = null; timeSelection = null;">
              <v-icon>mdi-cancel</v-icon> &nbsp;Cancel
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog #3 -->
    <v-dialog v-model="bookingDialog3" width="auto">
      <v-card class="align-center" style="padding:10px;">
        <v-icon @click="bookingDialog = !bookingDialog1; timeSelection = null;" color="error"
          style="position:absolute; top:-2px; right:-2px;">mdi-close-box</v-icon>
        <!-- <v-btn icon="mdi-close-circle-outline" color="red" variant="outlined" size="x-small" top right @click="bookingDialog = !bookingDialog1"></v-btn> -->
        <v-card-title>
          Incomplete or Complete
        </v-card-title>
      </v-card>
    </v-dialog>

    <v-main>
      <!-- <HelloWorld /> -->
      <!-- <VueRecaptchaV2/> -->
      <!-- <router-view :bookingDialog="bookingDialog" :fetchGoogleData="fetchGoogleData" @responsebookingDialog="(msg) => bookingDialog = msg"></router-view> -->
      <router-view></router-view>
      <Footer />
    </v-main>
  </v-app>
</template>

<script setup>
  // import HelloWorld from '@/components/HelloWorld.vue'
  // import VueRecaptchaV2 from '@/components/VueRecaptchaV2.vue'
  import Login from '@/components/Login.vue'
  import VueRecaptchaV3 from '@/components/VueRecaptchaV3.vue'
  import Footer from '@/components/Footer.vue'
  import { ref } from 'vue'
</script>
<script>
  // import { useTheme } from 'vuetify'
  import { VueRecaptcha } from 'vue-recaptcha';
  export default {
    name: "App",
    components: {
      Login,
      VueRecaptcha,
      VueRecaptchaV3,
    },
    data: () => ({
      links: [
        'About Us',
        'Therapist',
        // 'Blog',
        'Contact Us',
        // { title: 'helloworld', disabled: false, href: '/helloworld' },
      ],
      sessionType: '60',
      partOfDay: ['morning', 'afternoon', 'evening'],
      drawer: null,
      bookingDialog: null, // 1st booking button, selection popup is decided by bookingDialog1 computed by "0 && !2"
      bookingDialog2: null, // confirm/submit popup
      bookingDialog3: null,
      date: new Date(),
      timeList: [], // 9:00am, 4:30pm
      disabledDates: [
        { weekdays: [1] },
        { start: new Date(2023, 1, 20), end: new Date(2023, 1, 20) }, // Feb 20
        { start: new Date(2023, 3, 7), end: new Date(2023, 3, 7) }, // April 7
        { start: new Date(2023, 4, 22), end: new Date(2023, 4, 22) },
        { start: new Date(2023, 6, 1), end: new Date(2023, 6, 1) },
        { start: new Date(2023, 7, 7), end: new Date(2023, 7, 7) },
        { start: new Date(2023, 8, 4), end: new Date(2023, 8, 4) },
        { start: new Date(2023, 9, 9), end: new Date(2023, 9, 9) },
        { start: new Date(2023, 10, 11), end: new Date(2023, 10, 11) },
        { start: new Date(2023, 11, 25), end: new Date(2023, 11, 25) }, // December 25
      ],
      calendarToken: null,
      newDisabledDates: [],
      existingSchedule: [],
      timeTable: null,
      timeSelection: null,
      bookingForm: false,
      phone: null,
      email: null,
      loading: false,
      weeks: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      clientType: '',
      recaptchaV2: false,
      // sitekey: "6LcgGLwjAAAAAHqM9IEaju-hORsaQsZhbyMVWfBp", // For recaptchaV2, put key here will cause return issue
      recaptchaV3: false,
    }),
    computed: {
      bookingDialog1() {
        return this.bookingDialog && !this.bookingDialog2;
      },
    },
    methods: {
      // Get new access token for the coming Serenity data.
      async fetchGoogleData() {
        const data = ref(null);
        const error = ref(null);
        const tokenUrl = 'https://oauth2.googleapis.com/token';
        const options = {
          client_id: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID,
          client_secret: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token: '1//066zNbzwgVfJaCgYIARAAGAYSNwF-L9IrJADF-Sbz1ZqFeqG-8c5f5id6EPaesYc9TYubqGI3ELgJ8veMXWJW2HBra4rJ2-20o4M',
        };

        // const result = async () => {

        await fetch(tokenUrl, { method: 'POST', body: JSON.stringify(options) })
          .then((res) => res.json())
          .then((json) => (data.value = json))
          .catch((err) => (error.value = err));
        
        if (data.value.access_token) {
          this.calendarToken = data.value.access_token;
          this.fetchSerenityData();
        } else {
          console.log("No token responded: " + error.value);
        }

        this.disabledDates = this.disabledDates.splice(0, 10);
        this.getTimeTable();

        // const { refreshTokenData } = axios.get(tokenUrl, qs)
        // return ${tokenUrl}?${qs.toString()}"";
      },

      // Get Serenity raw data to synchornize the valid schedule.
      async fetchSerenityData() {
        const data = ref(null);
        const error = ref(null);
        const calendarUrl = "https://www.googleapis.com/calendar/v3/calendars/calendarId/events"
        const parameters = {
          calendarId: '639c8e16c9261c1969fa84928ea833ed96c213744e9eb2e64c49d4d242da55d7@group.calendar.google.com',
          access_token: this.calendarToken,
        };

        const params = new URLSearchParams(parameters);
        await fetch(calendarUrl + '?' + params.toString(), { method: 'GET'}) // body is not allowed for this url
          .then((res) => res.json())
          .then((json) => (data.value = json))
          .catch((err) => (error.value = err));

        if (data.value.items) {
          this.serenityData = data.value.items;
          this.getValidSchedule();
        } else {
          console.log("No data responded: " + error.value);
        }
      },

      // Get new existing schedule array in the format of [date, [[start, end],...]] instead of association array which VueJS doesn't support. And then, update the disabled dates.
      getValidSchedule() {
        this.existingSchedule = [];
        this.newDisabledDates = [];
        this.serenityData.forEach((item, index) => {
          // "start" "end": { "dateTime": "2022-12-14T09:30:00-08:00"}
          let dateString = item.start.dateTime.substr(0, 10);
          let startTime = item.start.dateTime.substr(11, 5);
          let endTime = item.end.dateTime.substr(11, 5);
          let i = this.existingSchedule.findIndex((ds) => ds.includes(dateString));

          if (i != -1) {
            this.existingSchedule[i][1].push([startTime, endTime]);
            this.existingSchedule[i][1].sort((a, b) => a[0].substr(0, 2) - b[0].substr(0, 2));
          } else {
            this.existingSchedule.push([dateString, [[startTime, endTime]]]);
          }
        });

        // [date, [[start, end],...]] ex: [2022-12-14,[[09:30,10:30],[14:00,15:30], ...]]
        this.existingSchedule.forEach((item, index) => {
          // Watching whichWeekday, sessionType & partOfDay to put invalid date into disabledDates according to the array
          let dayString = item[0];
          let timeArray = item[1];
          let isValidDay = false;

          // Add business hours to timeArray
          let d = new Date(dayString.substr(0, 4), dayString.substr(5, 2) - 1, dayString.substr(8, 2));
          let day = d.getDay();

          // Monday to Thursday 8: 30 am - 7: 00 pm
          if (1 <= day <= 4) {
            timeArray.splice(0, 0, ['', '08:30']);
            timeArray.push(['19:00', '']);
          }
          // Friday 8: 30 am - 5: 30 pm 
          if (day == 5) {
            timeArray.splice(0, 0, ['', '08:30']);
            timeArray.push(['17:30', '']);
          }
          // Saturday 9: 00 am - 5: 00 pm
          if (day == 6) {
            timeArray.splice(0, 0, ['', '09:00']);
            timeArray.push(['17:00', '']);
          }
          // Sunday
          if (day == 0) {
            console.log("Sunday should not be included.")
          }

          // if any end-start valid period > sessionType, works in partOfDay, then isValidDay == true
          for (let i=0; i<timeArray.length-1; i++) {
            let end = new Date(dayString + 'T' + timeArray[i][1]);
            let start = new Date(dayString + 'T' + timeArray[i+1][0]);
            
            // sessionType: 60 or 90 min
            if (((start - end)/60000) >= this.sessionType) {
              // morning 08:30~12:00, afternoon 12:00~17:30, evening 17:30~19:00
              if (this.verifyPartOfDay(dayString, end, start)) {
                isValidDay = true;
              }
            }
          }
          
          if (!isValidDay) {
            // Put invalid date into disabledDates according to the new array.
            this.newDisabledDates.push({ 
              start: new Date(dayString.substr(0, 4), dayString.substr(5, 2) - 1, dayString.substr(8, 2)),
              end: new Date(dayString.substr(0, 4), dayString.substr(5, 2) - 1, dayString.substr(8, 2))
            });
          }

          dayString = null;
          timeArray = null;
        });
        
        this.disabledDates = this.disabledDates.splice(0,10).concat(this.newDisabledDates);
      },
      getTimeTable() {
        let dayString = this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2); // Must be 2023-01-03 instead of 2023-1-3
        let j = this.existingSchedule.findIndex((ds) => ds.includes(dayString));
        this.timeTable = [];
        let timeArray = [];
        let day = this.date.getDay();

        if (j != -1) {
          timeArray = this.existingSchedule[j][1];
        } else {
          // No existing schedule, but a valid day for booking.
          if (1 <= day && day <= 4) {
            timeArray = [['', '08:30'], ['19:00', '']];
          }
          if (day == 5) {
            timeArray = [['', '08:30'], ['17:30', '']];
          }
          if (day == 6) {
            timeArray = [['', '09:00'], ['17:00', '']];
          }
        }

        for (let k = 0; k < timeArray.length - 1; k++) {
          let end = new Date(dayString + 'T' + timeArray[k][1]);
          let start = new Date(dayString + 'T' + timeArray[k + 1][0]);
          let morningEnd = new Date(dayString + 'T' + '12:00');
          let eveningStart = new Date(dayString + 'T' + '17:30');
          let validPeriod = (start - end) / 60000;
          let sets = Math.floor(validPeriod / 30) - Math.round(this.sessionType / 60);

          if (validPeriod >= this.sessionType) {
            if (this.verifyPartOfDay(dayString, end, start)) {
              if (sets >= 1) {
                for (let l = 1; l <= sets; l++) {
                  // No need to care the case end-start cross three parts of day. Because end is adding up.
                  if ((this.partOfDay.includes('morning') && (morningEnd - end > 0)) || (this.partOfDay.includes('afternoon') && ((end - morningEnd >= 0 && eveningStart - end > 0))) || (this.partOfDay.includes('evening') && (end - eveningStart >= 0))) {
                    this.timeTable.push(end.getHours() + ':' + ('0' + end.getMinutes()).slice(-2));
                  }
                  end.setMinutes(end.getMinutes() + 30);
                }
              }
            }
          }
        }

        if (this.timeTable.length == 0) {
          this.timeTable = null;
        }
      },
      verifyPartOfDay(dayString, end, start) {
        let morningEnd = new Date(dayString + 'T' + '12:00');
        let eveningStart = new Date(dayString + 'T' + '17:30');

        return ((this.partOfDay.includes('morning') && (end < morningEnd || start <= morningEnd)) || (this.partOfDay.includes('afternoon') && (((morningEnd <= end && end < eveningStart) || (morningEnd < start && start <= eveningStart)) || (morningEnd - end > 0 && start - eveningStart > 0))) || (this.partOfDay.includes('evening') && (eveningStart <= end || eveningStart <= start)));
      },
      async addBookingToCalendar() {
        // Todo: Send a verification code to client email instead of phone
        // Pop up a window to type in the code & Connect to Google calendar
        let calendarId= '639c8e16c9261c1969fa84928ea833ed96c213744e9eb2e64c49d4d242da55d7@group.calendar.google.com';
        let timeZone = "America/Vancouver";
        const data = ref(null);
        const error = ref(null);
        const addBookingEventUrl = "https://www.googleapis.com/calendar/v3/calendars/" + calendarId + "/events?access_token=" + this.calendarToken;
        let startPST = this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2) + "T" + ('0' + this.timeSelection).slice(-5) + ":00-08:00"; // Must be 2023-01-03T09:30:00-08:00 instead of 2023-1-3;
        let endPST = this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2) + "T";

        if (this.sessionType == '60') {
          endPST += (((Number(this.timeSelection.split(":")[0]) + 1).toString()).padStart(2, '0') + this.timeSelection.slice(-3)) + ":00-08:00";
        }
        if (this.sessionType == '90') {
          if (this.timeSelection.slice(-2) == "30") {
            endPST += (((Number(this.timeSelection.split(":")[0]) + 2).toString()).padStart(2, '0') + this.timeSelection.slice(-3)) + ":00-08:00";
          }
          if (this.timeSelection.slice(-2) == "00") {
            endPST += ((Number(this.timeSelection.split(":")[0]) + 1).toString()).padStart(2, '0') + ":30:00-08:00";
          }
        }

        const options = {
          summary: "Client: " + this.clientType + " / " + this.sessionType + "-min / " + this.phone + " / " + this.email, // title of booking event
          start: {"dateTime": startPST, "timeZone": timeZone },
          end: { "dateTime": endPST, "timeZone": timeZone },
          // start: { "dateTime": "2023-02-23T09:30:00-08:00", "timeZone": "America/Vancouver" },
        };

        await fetch(addBookingEventUrl, { method: 'POST', body: JSON.stringify(options) })
          .then((res) => res.json())
          .then((json) => (data.value = json))
          .catch((err) => (error.value = err));

        if (data.value) {
          // Result 1 Success
          console.log("Data responded: ");
          console.log(data.value);

          data.value.etag
          data.value.id
          data.value.created
          data.value.status

          // EmailJS (or send a phone message) to client with confirmation info and a cancel link
          if (data.value.status == "confirmed") {

          }

          // EmailJS (or send a phone message) to therapist as a reminder


        } else {
          // Result 2 Failed
          console.log("No event data responded: " + error.value);
        }

        // No matter success or failed, store it to DB for records for adminstrator tarcking the history
        // Add admin login for the management

      },
      onSubmit() {
        if (!this.bookingForm) return
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)

        this.$watch('recaptchaV3', () => { // Trigger this watch to update recaptchaV3 value immediately via the emits.
          // Binding the valid inputs, recaptchaV2 to recaptchaV3 via the Submit button
          if (this.clientType && this.phone && this.email && this.recaptchaV2 && this.recaptchaV3) {
            console.log('Submit')
            // Add the booking into Google canlendar
            this.addBookingToCalendar()
          } else {
            console.log('Incomplete. Try again!'); // Due to V2 or V3 missing
          }
        })
      },
      onVerify: function (response) {
        this.recaptchaV2 = true;
        console.log('Verified by recaptchaV2: ' + response); // response code
        // this.$refs.recaptcha.execute();
      },
      onExpired: function () {
        this.recaptchaV2 = false;
        console.log('Expired');
      },
      // resetRecaptcha() {
      //   this.$refs.recaptcha.reset() // Direct call reset method
      // },

      required(v) {
        return !!v || 'Field is required'
      },
      isCanadaBCNumber(v) {
        return v.substr(0, 3).match(/^(2(3(6)*|5(0)*)*|6(0(4)*)*|7(7(8)*)*)$/) && !v.substr(0, 3).match(/777/) || 'Must be Canadian number in BC' // 777 is an exception in the regex above
        // return v.substr(0, 3).match(/^(2|23|236|25|250|6|60|604|7|77|778)$/) || 'Must be in Canada BC'
      },
      isTenDigitNumber(v) {
        return ((v.length == 10) && !v.match(/\D/)) || 'Must be 10-digit number'
      },
      isValidEmail(v) {
        return v.match(/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i) || 'Must be a valid e-mail'
      },
    },
    watch: {
      sessionType() {
        this.fetchGoogleData();
      },
      partOfDay() {
        this.fetchGoogleData();
      },
      date() {
        this.fetchGoogleData();
      },
    },
  };
</script>

<style>
.v-list-item .v-img__img--contain {
      object-fit: fill;
}
</style>
