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

function getTestBookCount() {
    var Dia_chi_Dich_vu = "http://localhost:3000/gettestbookcount";
    var Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.open("GET", Dia_chi_Dich_vu, false);
    Xu_ly_HTTP.send("");
    var Chuoi_XML = Xu_ly_HTTP.responseText;

    return Chuoi_XML;
}

function getTestBook(id) {
    var Dia_chi_Dich_vu = "http://localhost:3000/gettestbook?id=" + id;
    var Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.open("GET", Dia_chi_Dich_vu, false);
    Xu_ly_HTTP.send("");
    var Chuoi_XML = Xu_ly_HTTP.responseText;

    return Chuoi_XML;
}

function loadTestBook(id) {
    var XMLString = getTestBook(id);
    var quesList = JSON.parse(XMLString);
    document.getElementById("title-h2").innerHTML = "Bộ đề số " + id;
    document.getElementById("title-sub").innerHTML = "Bạn có 40 phút để làm bài";
    document.getElementById("main-content").innerHTML = parseQues(quesList);
}

function genTestBookList(n) {
    var text = '<table class="col-sm-12 col-md-12"><tr style="height: 120px;">';
    var j = 0;
    for (var i = 0; i < n; i++) {
        text += '<td class="col-sm-3 col-md-3"><button type="button" class="btn btn-default" style="width: 100%; height: 100px; font-size: 20px" onclick="loadTestBook(' + (i + 1) + ')">' + (i + 1) + '</button></td>';
        j++;
        if (j == 4) {
            text += '</tr>';
            if (i < n - 1) {
                text += '<tr style="height: 120px;">';
            }
            j = 0;
        } else if (i == n - 1) {
            text += '</tr>';
        }
    }
    text += '</table>';
    return text;
}

/*//Xu ly the hien
function readList(xml) {
    var list = xml.getElementsByTagName("Part");
    var quesList = [];
    var part5 = [];
    var part6 = [];
    var part7 = [];
    var part;
    for (var i = 0; i < list[1].getElementsByTagName("Question").length; i++) {
        part = 5;
        var root = list[1].getElementsByTagName("Question")[i];
        var id = root.getAttribute("id");
        var nd = root.getAttribute("content");
        var choice = root.getElementsByTagName("Choices");
        var ndA = choice.getElementsByTagName("A").innerHTML;
        var ndB = choice.getElementsByTagName("B").innerHTML;
        var ndC = choice.getElementsByTagName("C").innerHTML;
        var ndD = choice.getElementsByTagName("D").innerHTML;
        part5.push(new CauHoi(id, part, nd, ndA, ndB, ndC, ndD, "", ""));
    }

    for (var pos = 2; pos < 4; pos++) {
        for (var i = 0; i < list[pos].getElementsByTagName("Question").length; i++) {
            part = pos + 4;
            var root = list[1].getElementsByTagName("Question")[i];
            var paragraph = root.getAttribute("paragraph");
            var img = root.getAttribute("image");
            var listQues = [];
            var choice = root.getElementsByTagName("Choices");
            for (var j = 0; j < choice.length; j++) {
                var id = choice[j].getAttribute("id");
                var ndA = choice[j].getElementsByTagName("A").innerHTML;
                var ndB = choice[j].getElementsByTagName("B").innerHTML;
                var ndC = choice[j].getElementsByTagName("C").innerHTML;
                var ndD = choice[j].getElementsByTagName("D").innerHTML;
                if (part == 7) {
                    var nd = choice[j].getAttribute("question");
                    listQues.push(new CauHoi(id, part, nd, ndA, ndB, ndC, ndD));
                } else {
                    listQues.push(new CauHoi(id, part, "", ndA, ndB, ndC, ndD));
                }
            }
            if (part == 7) {
                part7.push(paragraph, img, listQues);
            } else {
                part6.push(paragraph, img, listQues);
            }
        }
    }
    quesList.push(part5, part6, part7);
    return quesList;
}*/

function parseQues(list) {
    var count = 1;
    var text = `<div class="row" style="margin-right: 30px; margin-left: 20px;">
                    <div class="Quiz_reviewDiv" style="">
                        <div class="Quiz_reviewQuestion">
                            <ol style="margin-top: 0px !important">`
    for (var i = 1; i <= 40; i++) {
        text += '<li>' + '<a href="#' + i + '">' + i + '</a></li>';
    }
    text += `           </ol>
                            <div style="top: 5px;"></div>
                        </div>
                        <div class="Quiz_reviewLabel">
                            <ol>
                                <li>
                                    <span class="Quiz_reviewColor" style="background-color: #6CA54C;"></span>
                                    <span class="Quiz_reviewText">Answered</span>
                                </li>
                                <li>
                                    <span class="Quiz_reviewColor" style="background-color: #FFB800;"></span>
                                    <span class="Quiz_reviewText">Review</span>
                                </li>
                            </ol>
                            <div style="clear: both;"></div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>`;
    text += '<div > <h3> Part 5 </h3></div >';
    for (var i = 0; i < list.part5.length; i++) {
        text += '<div id = "' + count + '" class = "Quiz_header"></div> <div class = "Quiz_question" onclick = "check(' + count + ')" ><div class = "Quiz_question_text" ><p >' + count + '.' + list.part5[i].noidung + '</p> </div> <ul class = "Quiz_questionList"><li class = "Quiz_questionListItem" data - pos = "0"><label><input class = "Quiz_questionInput" type = "radio" name = "' + list.part5[i].id + '" value = "A" > A.' + list.part5[i].ndA + '</label></li><li class = "Quiz_questionListItem" data - pos = "1" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list.part5[i].id + '" value = "B" > B.' + list.part5[i].ndB + '</label></li><li class = "Quiz_questionListItem" data - pos = "2" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list.part5[i].d + '" value = "C" > C.' + list.part5[i].ndC + ' </label></li><li class = "Quiz_questionListItem" data - pos = "3" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list.part5[i].id + '" value = "D" > D.' + list.part5[i].ndA + ' </label></li></ul > </div>';
        count++;
    }
    text += '<div> <h3> Part 6 </h3></div >';
    for (var i = 0; i < list.part6.listQues.length; i++) {
        text += '<div> <h4>Bài đọc ' + list.part6.paragraph + '</h4></div >';
        text += '<div name="' + list.part6.paragraph + '"> <img src="http://localhost:3001/getimage?name=' + list.part6.img.substring(8, 21) + '" alt="" width="800px"></div> ';

        for (var j = 0; j < list.part6.listQues.length; j++) {
            text += '<div id = "' + count + '" class = "Quiz_header"></div> <div class = "Quiz_question" onclick = "check(' + count + ')" ><div class = "Quiz_question_text" ><p >' + count + '.' + list.part6.listQues[j].noidung + '</p> </div> <ul class = "Quiz_questionList"><li class = "Quiz_questionListItem" data - pos = "0"><label><input class = "Quiz_questionInput" type = "radio" name = "' + list.part6.listQues[j].id + '" value = "A" > A.' + list.part6.listQues[j].ndA + '</label></li><li class = "Quiz_questionListItem" data - pos = "1" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list.part6.listQues[j].id + '" value = "B" > B.' + list.part6.listQues[j].ndB + '</label></li><li class = "Quiz_questionListItem" data - pos = "2" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list.part6.listQues[j].id + '" value = "C" > C.' + list.part6.listQues[j].ndC + ' </label></li><li class = "Quiz_questionListItem" data - pos = "3" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list.part6.listQues[j].id + '" value = "D" > D.' + list.part6.listQues[j].ndA + ' </label></li></ul > </div>';
            count++;
        }
    }

    text += '<div> <h3> Part 7 </h3></div >';
    for (var i = 0; i < list.part7.listQues.length; i++) {
        text += '<div> <h4>Bài đọc ' + list.part7.paragraph + '</h4></div >';
        text += '<div name="' + list.part7.paragraph + '"> <img src="http://localhost:3001/getimage?name=' + list.part7.img.substring(8, 21) + '" alt="" width="800px"></div> ';

        for (var j = 0; j < list.part6.listQues.length; j++) {
            text += '<div id = "' + count + '" class = "Quiz_header"></div> <div class = "Quiz_question" onclick = "check(' + count + ')" ><div class = "Quiz_question_text" ><p >' + count + '.' + list.part7.listQues[j].noidung + '</p> </div> <ul class = "Quiz_questionList"><li class = "Quiz_questionListItem" data - pos = "0"><label><input class = "Quiz_questionInput" type = "radio" name = "' + list.part7.listQues[j].id + '" value = "A" > A.' + list.part7.listQues[j].ndA + '</label></li><li class = "Quiz_questionListItem" data - pos = "1" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list.part7.listQues[j].id + '" value = "B" > B.' + list.part7.listQues[j].ndB + '</label></li><li class = "Quiz_questionListItem" data - pos = "2" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list.part7.listQues[j].id + '" value = "C" > C.' + list.part7.listQues[j].ndC + ' </label></li><li class = "Quiz_questionListItem" data - pos = "3" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list.part7.listQues[j].id + '" value = "D" > D.' + list.part7.listQues[j].ndA + ' </label></li></ul > </div>';
            count++;
        }
    }
    return text;
}

//Xu ly luu tru
function readData() {
    var Dia_chi_Dich_vu = "http://localhost:3000/Doc_Du_lieu";
    var Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.open("GET", Dia_chi_Dich_vu, false);
    Xu_ly_HTTP.send("");
    var Chuoi_XML = Xu_ly_HTTP.responseText;
    var Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml")
        .documentElement;
    var Danh_sach_Tivi = Du_lieu.getElementsByTagName("Text_book")[0];
    return Danh_sach_Tivi;
}

function login() {
    var usn = getElementById("usn")
}

function CauHoi(id, part, noidung, ndA, ndB, ndC, ndD) {
    this.id = id;
    this.noidung = noidung;
    this.part = part;
    this.ndA = ndA;
    this.ndB = ndB;
    this.ndC = ndC;
    this.ndD = ndD;
}

function DapAn(id, part, da, paragraph) {
    this.id = id;
    this.part = part;
    this.da = da;
    this.paragraph = paragraph;
}