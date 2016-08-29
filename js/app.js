var StudentsPerPage = 10;
var CurrentPage = 1;
var studentListMaster;
var studentList;
var studentListSearchFiltered;

//get student list data
studentListMaster = $('.student-list').children();
//copy master list to studentList for manipulation 
studentList = studentListMaster;

console.log(studentList.length);

//Loop through the Student list and filter based on paging
var studentListChildrenFiltered = function(PerPage,CurPage){
    CurrentPage = CurPage;//set global
    
    //check if list has data
    if(studentList.length > 0){
        //loop through current list
        studentList.each(function(index,li){            
            
            var studentListItem = $(li);        
            var pageIndexStart = PerPage*CurPage-PerPage;
            var pageIndexEnd = PerPage*CurPage;       
            //display list based on current page
            if(index >= pageIndexStart && index < pageIndexEnd){           
               //fade in results
                studentListItem.fadeIn(1000);                       
            }else{ 
               //hide elements that are not on current page
                studentListItem.hide();       
            }
        });  
        //create and show paging
        paginationCreation();        
        $(".pagination").show();
        $('.student-notfound').hide();//hide not found element if displayed
    }else{
        //list has no data, hide paging and show "Not Found" element
        $('.student-notfound').show();
        $(".pagination").hide();
    }
    
}

//Create Pagination at bottom of student list
var paginationCreation = function(){
    
    var page = $('.page');
    var pagination = $("<div>").addClass('pagination');
    var PagiUL = $("<ul>");  

    //create paging elements based on number of students and page size
    for(i=0;i<studentList.length/StudentsPerPage;i++){
        //add active class if current page, then add click function for the rest.
        if(i == CurrentPage-1){
            var PagiLI = $("<li>");
            var PagiLink = $('<a href="#">');
            PagiLink.text(i+1);
            PagiUL.append(PagiLI.append(PagiLink.addClass("active")));            
        }else{
            var PagiLI = $("<li>");
            var PagiLink = $('<a href="#">');
            PagiLink.text(i+1);
            //Add click event to anchor tags
            PagiUL.append(PagiLI.append(PagiLink.on("click",function(){
                    //use clicked link's text as page value to update view
                    //call function when clicked
                    studentListChildrenFiltered(StudentsPerPage,thePage.innerText);
               })));
        }
       
    }
    //remove pagination if exists
    $(".pagination").remove();
    //add updated paging
    pagination.append(PagiUL);    
    page.append(pagination);
}


//Add search fields to DOM with button click and keyup events

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
        //input field was empty, reset to master list
        studentList = studentListMaster;
        studentListChildrenFiltered(StudentsPerPage,1);
        
    }
    
    
}

//call search function on button click
studentSearch.append(searchButton.on('click',function(){
    var inputSearch = $('#inputSearch');
    DataSearch(inputSearch);
    
}))
//add not found elements to page
$('.page-header').after($("<div>No students found.</div>").addClass('student-notfound').hide())
$('.page-header').append(studentSearch);



//display students paginated list on first run
studentListChildrenFiltered(StudentsPerPage,1);


