import * as Vue from "./vue.js";
import myComponent from "./myComponent.js";

console.log("hello from app!");

const app = Vue.createApp({
    data() {
        return {
            id: false,
            images: [],
            message: "Please upload a file",
            status: "",
            checkForValue: 10,
            lowestTableId: "",
            checkForId: null,
            MyButton: 10,
        };
    },
    components: {
        // we 'register' our component in here
        // left hand side - name of component of how you'll be rendering it
        // right hand side - actual component itself (the one you've imported)
        "my-component": myComponent,
    },
    methods: {
        getMoreImages() {
            let ImageArray = [];
            this.images.forEach((image) => ImageArray.push(image.id));

            let lowestScreenedId = Math.min(...ImageArray);
            // console.log("lowest id that we see is:", lowestScreenedId);

            fetch(`/more-images/${lowestScreenedId}`)
                .then((res) => res.json())

                .then((extraImages) => {
                    extraImages.forEach((image) => this.images.push(image));
                    this.lowestTableId = extraImages[0].lowestTableId;

                    // console.log("extraImages: ", extraImages);
                    // console.log(
                    //     "extraImages[0].lowestTableId",
                    //     extraImages[0].lowestTableId
                    // );
                    // console.log("our new created array is : ", this.images);

                    console.log(
                        "here is the lowestTableId: ",
                        this.lowestTableId
                    );
                    console.log(
                        "this.images[this.images.length - 1].id: ",
                        this.images[this.images.length - 1].id
                    );
                    if (
                        this.images[this.images.length - 1].id ===
                        this.lowestTableId
                    ) {
                        this.MyButton = 0;
                    }
                })
                .catch((err) => {
                    this.status = err.status;
                });
        },

        closeModalInApp() {
            console.log("close fn in the parent is running!");
            this.id = null;
        },
        showId(id) {
            this.id = id;
            // console.log("show title running and the id is ==> ", id);
        },
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
                    this.images.unshift(serverData.file);
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
                // console.log("here I am console loging the image data ", images);
                // Vue understands 'this.cities' to refer to
                // the DATA's property named 'cities'.
                this.images = images;
            });
    },
});
app.mount("#main");
