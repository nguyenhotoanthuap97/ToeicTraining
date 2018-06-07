function check(n) {
    var string = 'question_' + n;
    var a = document.getElementsByName(string);
    for (var i = 0; i < a.length; i++) {
        if (a[i].checked === true) {
            var pos = document.getElementsByClassName("Quiz_reviewQuestion")[0].getElementsByTagName("li");
            pos[n - 1].style.backgroundColor = 'rgb(108, 165, 76)';
        }
    }
}