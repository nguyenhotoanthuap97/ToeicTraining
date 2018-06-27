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

//Xu ly the hien
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
}

function parseQues(list) {
    var count = 1;
    var text = '<div > <p> Part 5 </p></div >';
    for(var i = 0; i < list.part5.length; i++){
        text+='<div id = "' + count + '" class = "Quiz_header"></div> <div class = "Quiz_question" onclick = "check(' + count + ')" ><div class = "Quiz_question_text" ><p >'+ count +'.'+ list.part5[i].CauHoi.noidung + '</p> </div> <ul class = "Quiz_questionList"><li class = "Quiz_questionListItem" data - pos = "0"><label><input class = "Quiz_questionInput" type = "radio" name = "' +list.part5[i].CauHoi.id+'" value = "A" > A.'+list.part5[i].CauHoi.ndA+'</label></li><li class = "Quiz_questionListItem" data - pos = "1" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list.part5[i].CauHoi.id +'" value = "B" > B.'+ list.part5[i].CauHoi.ndB +'</label></li><li class = "Quiz_questionListItem" data - pos = "2" ><label><input class = "Quiz_questionInput" type = "radio" name = "'+ list.part5[i].CauHoi.id+ '" value = "C" > C.'+ list.part5[i].CauHoi.ndC +' </label></li><li class = "Quiz_questionListItem" data - pos = "3" ><label><input class = "Quiz_questionInput" type = "radio" name = "'+ list.part5[i].CauHoi.id +'" value = "D" > D.'+ list.part5[i].CauHoi.ndA +' </label></li></ul > </div>';
        count++;
    }    
    text += '<div> <p> Part 6 </p></div >';
    for(var i = 0; i < list.part6.length; i++){
        text += '<div name="'+ list.part6[i].paragraph +'"> <img src="' + list.part6[i].img + '" alt=""></div> ';

        for(var j = 0; j < list.part6[i].listQues.length; j++){
            text+='<div id = "' + count + '" class = "Quiz_header"></div> <div class = "Quiz_question" onclick = "check(' + count + ')" ><div class = "Quiz_question_text" ><p >'+ count +'.'+ list.part6[i].listQues[j].CauHoi.noidung + '</p> </div> <ul class = "Quiz_questionList"><li class = "Quiz_questionListItem" data - pos = "0"><label><input class = "Quiz_questionInput" type = "radio" name = "' +list.part6[i].listQues[j].CauHoi.id+'" value = "A" > A.'+list.part6[i].listQues[j].CauHoi.ndA+'</label></li><li class = "Quiz_questionListItem" data - pos = "1" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list.part6[i].listQues[j].CauHoi.id +'" value = "B" > B.'+ list.part6[i].listQues[j].CauHoi.ndB +'</label></li><li class = "Quiz_questionListItem" data - pos = "2" ><label><input class = "Quiz_questionInput" type = "radio" name = "'+ list.part6[i].listQues[j].CauHoi.id+ '" value = "C" > C.'+ list.part6[i].listQues[j].CauHoi.ndC +' </label></li><li class = "Quiz_questionListItem" data - pos = "3" ><label><input class = "Quiz_questionInput" type = "radio" name = "'+ list.part6[i].listQues[j].CauHoi.id +'" value = "D" > D.'+ list.part6[i].listQues[j].CauHoi.ndA +' </label></li></ul > </div>';
            count++;
        }
    }

    text += '<div > <p> Part 7 </p></div >';
    for(var i = 0; i < list.part6.length; i++){
        text += '<div name="'+ list.part7[i].paragraph +'"> <img src="' + list.part7[i].img + '" alt=""></div> ';

        for(var j = 0; j < list.part6[i].listQues.length; j++){
            text+='<div id = "' + count + '" class = "Quiz_header"></div> <div class = "Quiz_question" onclick = "check(' + count + ')" ><div class = "Quiz_question_text" ><p >'+ count +'.'+ list.part7[i].listQues[j].CauHoi.noidung + '</p> </div> <ul class = "Quiz_questionList"><li class = "Quiz_questionListItem" data - pos = "0"><label><input class = "Quiz_questionInput" type = "radio" name = "' +list.part7[i].listQues[j].CauHoi.id+'" value = "A" > A.'+list.part7[i].listQues[j].CauHoi.ndA+'</label></li><li class = "Quiz_questionListItem" data - pos = "1" ><label><input class = "Quiz_questionInput" type = "radio" name = "' + list.part7[i].listQues[j].CauHoi.id +'" value = "B" > B.'+ list.part7[i].listQues[j].CauHoi.ndB +'</label></li><li class = "Quiz_questionListItem" data - pos = "2" ><label><input class = "Quiz_questionInput" type = "radio" name = "'+ list.part7[i].listQues[j].CauHoi.id+ '" value = "C" > C.'+ list.part7[i].listQues[j].CauHoi.ndC +' </label></li><li class = "Quiz_questionListItem" data - pos = "3" ><label><input class = "Quiz_questionInput" type = "radio" name = "'+ list.part7[i].listQues[j].CauHoi.id +'" value = "D" > D.'+ list.part7[i].listQues[j].CauHoi.ndA +' </label></li></ul > </div>';
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



    