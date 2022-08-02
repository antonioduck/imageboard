// To Do...
console.log("hello from weather.js");

// You might need to import Vue if you're using your own local version of the library!

const app = Vue.createApp({
  // Data to be used in the app. Special property!
  data() {
    return {
      // Leave these here EMPTY because we will use them later
      //   cities: [],
      //   guest: "",
      images: [],
    };
  },
  // Methods you can call from inside the HTML via Vue!
  methods: {
    getClassForTemp: function (temp) {
      if (temp >= 35) {
        return "hot";
      }
      if (temp <= 10) {
        return "cold";
      }
    },
    styleText: (text) => text.toUpperCase(),
    highlight: (e) => {
      console.log("Time to highlight!");
      e.currentTarget.classList.add("highlighted");
    },
    unhighlight: (e) => {
      e.currentTarget.classList.remove("highlighted");
    },
  },
 
  mounted() {
    console.log("The vue app is ready to go!");
    fetch("/images")
      .then((answer) => answer.json())
      .then((ImagesData) => {
        console.log("here I am console loging the image data ", ImagesData);
      
        // the DATA's property named 'cities'.
        this.images = ImagesData;
      });
  },
});
app.mount("#main");
