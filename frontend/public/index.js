function toggleReplyBox(commentId) {
    let replyBox = document.getElementById("reply-box-" + commentId);
    if (replyBox.style.display === "none" || replyBox.style.display === "") {
        replyBox.style.display = "block";
    } else {
        replyBox.style.display = "none";
    }
}