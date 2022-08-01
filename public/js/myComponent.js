import component4comments from "./component4comments.js";

const myComponent = {
    data() {
        return {
            image: {},
            ImgCreationDate: [],
        };
    },
    components: {
        "comment-component": component4comments,
    },
    props: ["id"],
    mounted() {
        console.log("our first component mounted");
        console.log("props: ", this.sayGreeting);
        // console.log("the new image data is :", this.images);
        console.log("the new id is :", this.id);

        fetch(`/images/${this.id}`)
            .then((answer) => answer.json())
            .then((images) => {
                console.log(
                    "here I am console loging the whole image data ",
                    images
                );
                // Vue understands 'this.cities' to refer to
                // the DATA's property named 'cities'.
                this.image = images;

                // console.log("the new image data is :", this.image);

                // console.log(
                //     "the image data I wanna modify is",
                //     this.image.created_at
                // );
                let OldData = this.image.created_at;
                let NewCreatedAt = OldData.slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("-");
                console.log("the data I will actually use are ", NewCreatedAt);

                this.ImgCreationDate = NewCreatedAt;
            });
    },

    methods: {
        ShowId: function () {
            this.id = id;
            console.log("The id given from click is ", this.id);
        },
        changeName: function () {
            this.name = "Buckwheat";
        },
        closeModalInComponent: function () {
            // console.log("closeModal fn in component is running");
            console.log("about to emit an event from the component!");
            // here we need to tell the parent to do something for us please!!!!
            this.$emit("close");
        },
    },

    template: `
    <div class="overlay">
        
        <div class='component'> 
        
        <h3  class=myX @click='closeModalInComponent'>X</h3>

         <div class="modalComponent">
         
         <p> < </p>

         <p> <img v-bind:src="image.url" v-bind:alt="image.title" width="400"
          height="300" class="image2"  ></p>

            <p> > </p>


          </div>
          
           <p>Title:{{image.title}}</p>
           <p>Description:{{image.description}}</p>
           <p>Uploaded by:{{image.username}}</p>
           <p>And created at:{{ImgCreationDate}}</p>
          
          <comment-component :IdOfComment="this.id"></comment-component>
        </div>
        
        </div>
    `,
};

export default myComponent;
