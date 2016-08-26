var StudentsPerPage = 5;
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
    CurrentPage = CurPage;//set global
    
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
    
   // console.log(studentList.length/StudentsPerPage);

    for(i=0;i<studentList.length/StudentsPerPage;i++){
        if(i == CurrentPage-1){
            var PagiLI = $("<li>");
            var PagiLink = $("<a>");//need to add href="#"
            PagiLink.text(i+1);
            PagiUL.append(PagiLI.append(PagiLink.addClass("active")));
            
        }else{
            var PagiLI = $("<li>");
            var PagiLink = $("<a>");//need to add href="#"
            PagiLink.text(i+1);
           // PagiLink.on("click",clicktest());
            PagiUL.append(PagiLI.append(PagiLink.on("click",function(){
                var thePage = this; 
                //console.log(thePage.innerText);                
                studentListChildrenFiltered(StudentsPerPage,thePage.innerText);
               })));
        }
       // console.log(i);
    }
    //remove pagination if exists
    $(".pagination").remove();//find better way to update pagination?
    pagination.append(PagiUL);
    //page.replaceAll(".pagination");
    page.append(pagination);
}

studentListChildrenFiltered(StudentsPerPage,1);


