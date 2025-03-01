function toggleReplyBox(commentId) {
    let replyBox = document.getElementById("reply-box-" + commentId);
    if (replyBox.style.display === "none" || replyBox.style.display === "") {
        replyBox.style.display = "block";
    } else {
        replyBox.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    fetch('sidebar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebar').innerHTML = data;
    })
    .catch(error => console.error('Error loading sidebar:', error));
});