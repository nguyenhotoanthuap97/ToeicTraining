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
function getQuestion() {
    var Dia_chi_Dich_vu = "http://localhost:3000/getquestionpart?id=5";
    var Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.open("GET", Dia_chi_Dich_vu, false);
    Xu_ly_HTTP.send("");
    var Chuoi_XML = Xu_ly_HTTP.responseText;

    return Chuoi_XML;
}

function parseQuestion(list) {
    var text = '<div > <p> Part 5 </p></div >';
    i = Math.floor(Math.random()*((list.length - 1) + 1));
    text += '<div id = "' + count + '" class = "Quiz_header"></div> <div class = "Quiz_question" onclick = "check(' + count + ')" ><div class = "Quiz_question_text" ><p >' + count + '.' + list.part5[i].CauHoi.noidung + '</p> </div> <ul class = "Quiz_questionList"><li class = "Quiz_questionListItem" data - pos = "0"><label><input class = "Quiz_questionInput" type = "radio" name = "' + list.part5[i].CauHoi.id + '" value = "A" > A.' + list.part5[i].CauHoi.ndA + '</label></li><li class = "Quiz_questionListItem" data - pos = "1" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list.part5[i].CauHoi.id + '" value = "B" > B.' + list.part5[i].CauHoi.ndB + '</label></li><li class = "Quiz_questionListItem" data - pos = "2" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list.part5[i].CauHoi.id + '" value = "C" > C.' + list.part5[i].CauHoi.ndC + ' </label></li><li class = "Quiz_questionListItem" data - pos = "3" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list.part5[i].CauHoi.id + '" value = "D" > D.' + list.part5[i].CauHoi.ndA + ' </label></li></ul > </div>';
    return text;
}
