var StudentsPerPage = 5;
var PageCount = 0;
var CurrentPage = 1;

//temp 
var studentSearchedList;

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
        
        //search functinailty here? if input has value?
        
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

//Create Pagination at bottom of student list
var paginationCreation = function(){
    
    var page = $('.page');
    var pagination = $("<div>").addClass('pagination');
    var PagiUL = $("<ul>");  

    for(i=0;i<studentList.length/StudentsPerPage;i++){
        if(i == CurrentPage-1){
            var PagiLI = $("<li>");
            var PagiLink = $('<a href="#">');
            PagiLink.text(i+1);
            PagiUL.append(PagiLI.append(PagiLink.addClass("active")));
            
        }else{
            var PagiLI = $("<li>");
            var PagiLink = $('<a href="#">');
            PagiLink.text(i+1);
            //Add list items and click event to anchor tags
            PagiUL.append(PagiLI.append(PagiLink.on("click",function(){
                    //use clicked link's text as page value to update view
                    var thePage = this;                             
                    studentListChildrenFiltered(StudentsPerPage,thePage.innerText);
               })));
        }
       
    }
    //remove pagination if exists
    $(".pagination").remove();//find better way to update pagination?
    pagination.append(PagiUL);    
    page.append(pagination);
}

////////////////////////////////////////////////////////////////
//Add search fields to element with class of page-header
////////////////////////////////////////////////////////////////

var studentSearch = $("<div>").addClass('student-search');
studentSearch.append($('<input>').attr({placeholder:'Search for students...',id:'inputSearch'}));
var searchButton = $('<button>').text('Search');
studentSearch.append(searchButton.on('click',function(){
    //Student Search
    console.log($('#inputSearch').val());
    
    //returns h3 array?
    //studentSearchedList = studentList.find("h3:contains(" + $('#inputSearch').val() + ")");
    
   // studentSearchedList = studentList.filter($('#inputSearch').val());
    
    //console.log($(studentSearchedList));
    
   
    
    
    studentList.each(function(index,li){
        var PerPage = 5;
        var CurPage = 0;
        var studentListItem = $(li);
        var pageIndexStart = PerPage*CurPage-PerPage;
        var pageIndexEnd = PerPage*CurPage;
        
       $(li).filter(function(){
           
         //  console.log($(this).filter($('#inputSearch').val()));
           
           
       });
        
        if(index >= pageIndexStart && index < pageIndexEnd){
            studentListItem.show();
            console.log(index + ' ' + pageIndexStart + '-' + pageIndexEnd);
        }else{
            studentListItem.hide();
        }
        
    });    
    
    
   
    
}))
$('.page-header').append(studentSearch);

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

//display students paginated list
studentListChildrenFiltered(StudentsPerPage,1);


