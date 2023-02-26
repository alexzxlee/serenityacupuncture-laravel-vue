<template>
    <v-app>
        <v-img src="src/assets/img/image16.jpg" cover class="text-white">
            <v-container class="fill-height">
                <v-responsive class="d-flex align-center text-center fill-height">
                    <div class="py-14" />
                    <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
                    <br />
                    <h2 class="text-h2 font-weight-thin">Serenity Acupuncture</h2>
                    <div class="py-7" />
                    <v-row>
                        <v-img src="src/assets/img/jing8.png" height="150px" width="150px"></v-img>
                    </v-row>
                    <div class="py-14" />
                    <!-- <v-row class="d-flex align-center justify-center">
                        <v-col cols="auto">
                            <v-btn color="primary"
                                min-width="228"
                                rel="noopener noreferrer" size="x-large" target="_blank" variant="flat" @click.stop="bookingDialog = !bookingDialog" @click="fetchGoogleData">
                                <v-icon icon="mdi-speedometer" size="large" start />
                                Book Online
                            </v-btn>
                        </v-col>
                    </v-row> -->
                    <br /><br /><br />
                </v-responsive>
            </v-container>
        </v-img>
        <div class="py-10" />

        <v-container class="align-center text-center fill-height">
            <h4 class="text-h4">What We Stand For</h4>
            <div class="py-5" />
            <v-row>
                <v-col class="pa-10">
                    <v-img src="src/assets/img/image8.jpg"></v-img>
                </v-col>
                <v-col class="pa-10" align-self="center">
                    <v-title class="text-h6">
                        Our Vision
                    </v-title>
                    <div class="py-2" />
                    <v-text>
                        <div>
                            To become the preferred Acupuncture Therapy Clinic in Vancouver Island and surrounding areas. Our primary objective is to ensure you feel better after each treatment and you live a healthier, happier life as a result. The relationship will be built on trust, mutual respect, and collaboration.
                        </div>
                    </v-text>
                </v-col>
            </v-row>
            <div class="py-7" />
            <v-divider></v-divider>
            <div class="py-7" />
            <v-row>
                <v-col class="pa-10" align-self="center">
                    <v-title class="text-h6">
                        Our Mision
                    </v-title>
                    <div class="py-2" />
                    <v-text>
                        <div>
                            To provide outstanding treatments of an ancient healing technique to our patients, who seek pain relief and to increase their personal well-being. Healing involved many factors, somehow the terms of "healer" became so popular now. We all are healers to each others, as far as if we keep good intentions.
                        </div>
                    </v-text>
                </v-col>
                <v-col class="pa-10">
                    <v-img src="src/assets/img/image7.jpg"></v-img>
                </v-col>
            </v-row>
            <div class="py-7" />
            <v-divider></v-divider>
            <div class="py-7" />
            <v-row>
                <v-col class="pa-10">
                    <v-img src="src/assets/img/image13.jpg"></v-img>
                </v-col>
                <v-col class="pa-10" align-self="center">
                    <v-title class="text-h6">
                        Our Values
                    </v-title>
                    <div class="py-2" />
                    <v-text>
                        <div>
                            Canada is a multicultural society where we get to experience and understand other people’s values, but also our differences, which makes us a stronger, united and progressive society. Thus, we actively recognize professional and individual diversity at both organizational and patient levels.
                        </div>
                    </v-text>
                </v-col>
            </v-row>
            <div class="py-7" />
        </v-container>
    </v-app>
</template>

<script>
//   export default {
//     props: {
//         bookingForm: Boolean,
//         fetchGoogleData: { type: Function },
//     },
//     emits: ['responsebookingForm'],
//     mounted() {
//         this.fetchGoogleData(); 
//     },
//     method: {
//         fetchGoogleData() {
//             this.fetchGoogleData();
//             emit('responsebookingForm', true)
//         }
//     },
// }
</script>
