const component4comments = {
    data() {
        return {
            comments: [],
            username: "",
            comment: "",
        };
    },
    props: ["IdOfComment"],
    mounted() {
        console.log("the index of comment props: ", this.IdOfComment);
        fetch(`/comments/${this.IdOfComment}`)
            .then((result) => result.json())
            .then((ArrayofComments) => {
                console.log("get comments results", ArrayofComments);

                this.comments = ArrayofComments;
            });
    },
    methods: {
        cleanMyDate(MyDate) {
            return MyDate.slice(0, 10).split("-").reverse().join("-");
        },

        DuringCommentSubmit() {
            fetch("/comment", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: this.username,
                    comment: this.comment,
                    id: this.IdOfComment,
                }),
            })
                .then((result) => result.json())
                .then((MyData) => {
                    console.log("here are the comments ", MyData.newComment);

                    this.username = "";
                    this.comment = "";

                    // comment should be displayed in the comment list immediately
                    this.comments.unshift(MyData.newComment);
                });
        },
    },

    template: `
        <div class="comment">
        <h3> You can add Your comment here </h3>
        
        <div class="formOfComments">
         <div class="FieldOfComments">
            <input type="text" v-model.trim="username" name="username" id="username" placeholder=" username" />
            <input type="textarea" v-model.trim="comment" name="comment" id="comment" placeholder=" comment" />
            </div></br>
            <input type="submit" value="Submit comment" class="comment-submit-btn" @click="DuringCommentSubmit" /></div>
            <h4> Other Comments : </h4>
            <div class="CommentSection" v-for="comment in comments">
            
                <p>{{comment.comment}}</p>
                <p >Posted by {{comment.username}} on {{cleanMyDate(comment.created_at)}}</p>
                </div>
        </div>
    `,
};
export default component4comments;
