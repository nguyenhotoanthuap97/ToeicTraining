function getPart(i) {
    var Dia_chi_Dich_vu = "http://localhost:3000/getquestionpart?id="+ i;
    var Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.open("GET", Dia_chi_Dich_vu, false);
    Xu_ly_HTTP.send("");
    var Chuoi_XML = Xu_ly_HTTP.responseText;

    return Chuoi_XML;
}
function getAnswer(i) {
    var Dia_chi_Dich_vu = "http://localhost:3000/getanswersheetpart?id="+ i;
    var Xu_ly_HTTP = new XMLHttpRequest();
    Xu_ly_HTTP.open("GET", Dia_chi_Dich_vu, false);
    Xu_ly_HTTP.send("");
    var Chuoi_XML = Xu_ly_HTTP.responseText;

    return Chuoi_XML;
}

function parseQuestion(list, i, part) {
    var text = '';
    if(part ===5){
        text += '<div id = "' + i + '" class = "Quiz_header"></div> <div class = "Quiz_question" ><div class = "Quiz_question_text" ><p >' + i + '.' + list[i].CauHoi.noidung + '</p> </div> <ul class = "Quiz_questionList"><li class = "Quiz_questionListItem" data - pos = "0"><label><input class = "Quiz_questionInput" type = "radio" name = "' + list[i].CauHoi.id + '" value = "A" > A.' + list[i].CauHoi.ndA + '</label></li><li class = "Quiz_questionListItem" data - pos = "1" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list[i].CauHoi.id + '" value = "B" > B.' + list[i].CauHoi.ndB + '</label></li><li class = "Quiz_questionListItem" data - pos = "2" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list[i].CauHoi.id + '" value = "C" > C.' + list[i].CauHoi.ndC + ' </label></li><li class = "Quiz_questionListItem" data - pos = "3" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list[i].CauHoi.id + '" value = "D" > D.' + list[i].CauHoi.ndA + ' </label></li></ul > <div><label for="result" class="resultlabel">Đáp án</label><div name="result" id="result">'+ ansList[i].ans +'</div></div></div>';
    }
    if(part === 6 || part === 7){
        text += '<div name="' + list[i].paragraph + '"> <img src="' + list[i].img + '" alt=""></div> ';
    
        for (var j = 0; j < list[i].listQues.length; j++) {
            text += '<div id = "' + i + '" class = "Quiz_header"></div> <div class = "Quiz_question"><div class = "Quiz_question_text" ><p >' + i + '.' + list[i].listQues[j].CauHoi.noidung + '</p> </div> <ul class = "Quiz_questionList"><li class = "Quiz_questionListItem" data - pos = "0"><label><input class = "Quiz_questionInput" type = "radio" name = "' + list[i].listQues[j].CauHoi.id + '" value = "A" > A.' + list[i].listQues[j].CauHoi.ndA + '</label></li><li class = "Quiz_questionListItem" data - pos = "1" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list[i].listQues[j].CauHoi.id + '" value = "B" > B.' + list[i].listQues[j].CauHoi.ndB + '</label></li><li class = "Quiz_questionListItem" data - pos = "2" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list[i].listQues[j].CauHoi.id + '" value = "C" > C.' + list[i].listQues[j].CauHoi.ndC + ' </label></li><li class = "Quiz_questionListItem" data - pos = "3" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list[i].listQues[j].CauHoi.id + '" value = "D" > D.' + list[i].listQues[j].CauHoi.ndD + ' </label></li></ul > <div><label for="result" class="resultlabel">Đáp án</label><div name="result" id="result">'+ ansList[i].listAns[j] +'</div></div></div>';
        }
    }
    return text;
}
function loadCauHoi(obj){
    var text = document.getElementById('question');
    var value = obj.value;
    if (value === 5){
        list = getPart(5);
        ansList = getAnswer(5);
        for(var i = 0; i < list.length; i++){
            text.innerHTML = '<option value="' + i + '">Câu hỏi '+ i + '</option>';
        }
        temp = parseQuestion(list, 1, 5);
        document.getElementById('listQuestion').innerHTML = temp;
    }
    else if (value === 6 || value === 7){
        list = getPart(value);    
        ansList = getAnswer(value);    
        for(var i = 0; i < list.length; i++){
            text.innerHTML = '<option value="' + i + '">Câu hỏi '+ i + '</option>';
        }
        temp = parseQuestion(list, 1, value);
        document.getElementById('listQuestion').innerHTML = temp;
    }
    
    text.value = "1";
}
function loadND(){
    var text = document.getElementById('listQuestion');
    var part = document.getElementById('part').value;
    var id = document.getElementById('question').value;
    if (part === 5){
        list = getPart(5);
        temp = parseQuestion(list, id, 5);
        document.getElementById('listQuestion').innerHTML = temp;
    }
    else if (part === 6 || part === 7){
        list = getPart(part);
        temp = parseQuestion(list, id, part);
        document.getElementById('listQuestion').innerHTML = temp;
    }
}