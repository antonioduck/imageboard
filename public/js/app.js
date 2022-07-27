import * as Vue from "./vue.js";

console.log("hello from app!");

const app = Vue.createApp({
    data() {
        return {
            images: [],
            message: "Please upload a file",
            status: "",
        };
    },
    methods: {
        onFormSubmit(e) {
            console.log("form trying to submit!");
            // do some validation!

            const form = e.currentTarget;
            const fileInput = form.querySelector("input[type=file]");
            console.log(fileInput.files);

            if (fileInput.files.length < 1) {
                alert("You must add a file!");
                return;
            }

            // really submit the form!
            const formData = new FormData(form);
            fetch("/image", {
                method: "post",
                body: formData,
            })
                .then((result) => result.json())
                .then((serverData) => {
                    console.log(serverData);
                    // update the view!
                    // by changing the value of data: message.
                    // this.message = serverData.message;
                    // if there is an image, add it to the list in data!
                    this.images.push(serverData.file);
                    this.status = serverData.status;
                })
                .catch((err) => {
                    this.status = err.status;
                });
        },
    },
    mounted() {
        console.log("The vue app is ready to go!");
        fetch("/images")
            .then((answer) => answer.json())
            .then((images) => {
                console.log("here I am console loging the image data ", images);
                // Vue understands 'this.cities' to refer to
                // the DATA's property named 'cities'.
                this.images = images;
            });
    },
});
app.mount("#main");
