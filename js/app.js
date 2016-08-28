var StudentsPerPage = 5;
var PageCount = 0;
var CurrentPage = 1;
var studentList = null;
var studentListSearchFiltered = null;
var studentListMaster = null;


studentListMaster = $('.student-list').children();
studentList = studentListMaster;


console.log(studentList.length);

//Loop through the Student list and filter based on paging
var studentListChildrenFiltered = function(PerPage,CurPage){
    CurrentPage = CurPage;//set global
    
    
    if(studentList.length > 0){
        studentList.each(function(index,li){

            //search functinailty here? if input has value?
            var studentListItem = $(li);        
            var pageIndexStart = PerPage*CurPage-PerPage;
            var pageIndexEnd = PerPage*CurPage;       

            if(index >= pageIndexStart && index < pageIndexEnd){           
               // studentListItem.show();
                studentListItem.fadeIn(1000);
                //console.log(index + ' ' + pageIndexStart + '-' + pageIndexEnd);        
            }else{           
                studentListItem.hide();       
            }

        });  
        paginationCreation();
        $('.student-notfound').hide();
        $(".pagination").show();
    }else{
        $('.student-notfound').show();
        $(".pagination").hide();
    }
    
    
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
studentSearch.append($('<input>').on('keyup',function(){ DataSearch(this);}).attr({placeholder:'Search for students...',id:'inputSearch'}));
var inputSearch = $('#inputSearch');
var searchButton = $('<button>').text('Search');

function DataSearch(inputField){
    var inputData = $(inputField).val();
    
    if(inputData !== ''){
    //search student list master
    studentListSearchFiltered = studentListMaster.find("h3:contains('"+ $(inputField).val().toLowerCase() + "'),span:contains('"+ $(inputField).val().toLowerCase() + "')").parent().parent().show();
    
    
    //update list to display filtered results
    studentList.hide();
    studentList = studentListSearchFiltered;
    studentListChildrenFiltered(StudentsPerPage,1);
        
    }else{
        //input field was cleared out, reset to master list
        studentList = studentListMaster;
        studentListChildrenFiltered(StudentsPerPage,1);
        
    }
    
    
}


studentSearch.append(searchButton.on('click',function(){
    var inputSearch = $('#inputSearch');
    DataSearch(inputSearch);
    
}))

$('.page-header').after($("<div>No students found.</div>").addClass('student-notfound').hide())
$('.page-header').append(studentSearch);



//display students paginated list on first run
studentListChildrenFiltered(StudentsPerPage,1);


