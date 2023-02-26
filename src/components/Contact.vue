<template>
    <v-app>
      <div class="py-10" />
      <v-container class="fill-height align-center">
        <v-row>
          <v-col><v-card ><v-img src="src/assets/img/image12.jpg" aspect-ratio="1"></v-img></v-card><br /><v-card-subtitle class="text-h7" align="center">Kind</v-card-subtitle></v-col>
          <v-col><v-card><v-img src="src/assets/img/sa05.jpg" aspect-ratio="1"></v-img></v-card><br /><v-card-subtitle class="text-h7" align="center">Patient</v-card-subtitle></v-col>
          <v-col><v-card><v-img src="src/assets/img/image3.jpg" aspect-ratio="01"></v-img></v-card><br /><v-card-subtitle class="text-h7" align="center">Love</v-card-subtitle></v-col>
        </v-row>
        <div class="py-12" />
        <v-row>
          <v-col>
            <div>
              <v-tile class="text-h6">
                Clinic Availability
              </v-tile>
              <div class="py-1" />
              <div>
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-calendar" size="default" color="blue" start />Monday to Thursday
                  </v-col>
                  <v-col>
                    <span style="color:#2196F3; filter: brightness(85%);">8:30 am - 7:00 pm</span>
                  </v-col>
                </v-row>
              </div>
              <div>
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-calendar" size="default" color="blue" start />Friday
                  </v-col>
                  <v-col>
                    <span style="color:#2196F3; filter: brightness(85%);">8:30 am - 5:30 pm</span>
                  </v-col>
                </v-row>
              </div>
              <div>
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-calendar" size="default" color="blue" start />Saturday
                  </v-col>
                  <v-col>
                    <span style="color:#2196F3; filter: brightness(85%);">9:00 am - 5:00 pm</span>
                  </v-col>
                </v-row>
              </div>
              <div>
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-calendar" size="default" color="rgba(217,48,37,1.00)" start />
                    <span style="color:rgba(217,48,37,1.00);">Sunday</span>
                  </v-col>
                  <v-col>
                    <span style="font-weight:400;color:rgba(217,48,37,1.00);">Closed</span>
                  </v-col>
                </v-row>
              </div>
            </div>
            <div class="py-7" />
            <div>
              <v-tile class="text-h6">
                Phone
              </v-tile>
              <v-list>
              <ul>
                <li>
                  <a href="tel:+1.778.680.0685" style="text-decoration: none; color:darkgreen"><v-icon icon="mdi-phone" size="default" color="green" start />+1 (250) 871 - 8899
                  </a>
                </li>
              </ul>
              </v-list>
            </div>
            <div class="py-10" />
            <!-- <v-row>
              <div>
                <v-btn color="primary" href="https://next.vuetifyjs.com/introduction/why-vuetify/#feature-guides" min-width="228"
                  rel="noopener noreferrer" size="x-large" target="_blank" variant="flat">
                  <v-icon icon="mdi-speedometer" size="default" start />
                  Book Online
                </v-btn>
              </div>
            </v-row> -->
          </v-col>
          <v-col>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2581.218825372587!2d-124.99849438457963!3d49.68785187937745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5488140aac521a05%3A0xb4df04e1ec24c6a8!2sSerenity%20Acupuncture(Hsiu-chen%20Lin)!5e0!3m2!1sen!2sca!4v1669714043657!5m2!1sen!2sca"
              width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </v-col>
        </v-row>
        <div class="py-12" />
      </v-container>
    </v-app>
</template>

<script setup>
  //
</script>