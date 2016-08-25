var StudentsPerPage = 10;
var PageCount = 0;
var CurrentPage = 1;

var studentList = $('.student-list').children();
studentList.hide();

//this will loop through the list
var studentListChildren = function(){
    studentList.each(function(index,li){
        console.log(index);
    });    
}

console.log(studentList.length);

//Loop through the Student list and filter based on paging
var studentListChildrenFiltered = function(PerPage,CurPage){
    CurrentPage = CurPage;
    studentList.each(function(index,li){
        
        var studentListItem = $(li);
        var pageIndexStart = PerPage*CurPage-PerPage;
        var pageIndexEnd = PerPage*CurPage;
        
        if(index >= pageIndexStart && index < pageIndexEnd){
            studentListItem.show();
            console.log(index + ' ' + pageIndexStart + '-' + pageIndexEnd);
        }else{
            studentListItem.hide();
        }
        
    });    
    paginationCreation();
}

var paginationCreation = function(){
    var page = $('.page');
    var pagination = $("<div>").addClass('pagination');
    var PagiUL = $("<ul>");
    var PagiLI = $("<li>");
   // console.log(studentList.length/StudentsPerPage);

    for(i=0;i<studentList.length/StudentsPerPage;i++){
        if(i == CurrentPage-1){
            PagiUL.append($("<li>").append($("<a>").text(i+1).addClass("active")));
        }else{
            var PagiLI = $("<li>");
            var PagiLink = $("<a>");
            PagiLink.text(i+1);
           // PagiLink.on("click",clicktest());
            PagiUL.append(PagiLI.append(PagiLink.on("click",function(){
                 console.log(this);
               })));
        }
       // console.log(i);
    }
    pagination.append(PagiUL);
    //page.replaceAll(".pagination");
    page.append(pagination);
}


