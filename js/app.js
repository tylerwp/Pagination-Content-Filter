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

/**
* Loop through the Student list and filters based on paging
*
* @param {number} PerPage - Results per page.
* @param {number} CurPage - The current page the results should display.
* @param {bool} fade - .Condition if the results should use fadeIn effect.
*/
var studentListChildrenFiltered = function(PerPage,CurPage,fade){
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
               //fade in results only if event from paging 
                if(fade){
                    studentListItem.fadeIn(1000); 
                }else{
                    studentListItem.show(); 
                }                
                 
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
    
};

/**
* Create Pagination at bottom of student list
*/
var paginationCreation = function(){
    
    var page = $('.page');
    var pagination = $("<div>").addClass('pagination');
    var PagiUL = $("<ul>");  

    //Don't display pagination if number of students <= StudentsPerPage
    if(studentList.length <= StudentsPerPage){
        //remove pagination
        $(".pagination").remove();
    }else{
        //create paging elements based on number of students and page size
        for(var i=0;i<studentList.length/StudentsPerPage;i++){
            //add active class if current page, then add click function for the rest.
            if(i == CurrentPage-1){
                var PagiLIcp = $("<li>");
                var PagiLinkcp = $('<a href="#">');
                PagiLinkcp.text(i+1);
                PagiUL.append(PagiLIcp.append(PagiLinkcp.addClass("active")));            
            }else{
                var PagiLI = $("<li>");
                var PagiLink = $('<a href="#">');
                PagiLink.text(i+1);
                //Add click event to anchor tags
                PagiUL.append(PagiLI.append(PagiLink.on("click",function(){
                        //use clicked link's text as page value to update view
                        var thePage = $(this);             
                        //call function when clicked                
                        studentListChildrenFiltered(StudentsPerPage,thePage.text(),true);
                })));
            }
        
        }
        //remove pagination if exists
        $(".pagination").remove();
        //add updated paging
        pagination.append(PagiUL);    
        page.append(pagination);
    }


};


//Add search fields to DOM with button click and keyup events
var studentSearch = $("<div>").addClass('student-search');

//Keyup event can cause errors if typing to fast. possible fix by delaying events
//Disable keyup functionality until fixed.
studentSearch.append($('<input>').on('keyup',function(){   
        DataSearch(this);    
    }).attr({placeholder:'Search for students...',id:'inputSearch'}));

var searchButton = $('<button>').text('Search');


/**
* Searching student list
*
* @param {Object.<string>} inputField - Search entered in #inputSearch.
*/
function DataSearch(inputField){
    var inputData = $(inputField).val();
    ClearLists();//clear lists
    if(inputData !== ''){
    //search student list master     
    studentListSearchFiltered = studentListMaster.find("h3:contains('"+ $(inputField).val().toLowerCase() + "'),span:contains('"+ $(inputField).val().toLowerCase() + "')").parent().parent().show();
    
    
    //update list to display filtered results
   // studentList.hide();
    studentList = studentListSearchFiltered;
    studentListChildrenFiltered(StudentsPerPage,1,false);
        
    }else{
        //input field was empty, reset to master list
        studentList = studentListMaster;
        studentListChildrenFiltered(StudentsPerPage,1,false);
        
    }
    
    
}

//call search function on button click
studentSearch.append(searchButton.on('click',function(){
    var inputSearch = $('#inputSearch');
    DataSearch(inputSearch);
    
}));
//add not found elements to page
$('.page-header').after($("<div>No students found.</div>").addClass('student-notfound').hide());
$('.page-header').append(studentSearch);


//display students paginated list on first run
studentListChildrenFiltered(StudentsPerPage,1,true);

/**
* Hide all list objects in preparation for new results.
*/
function ClearLists(){
    studentList.each(function(index,li){ 
            var studentListItem = $(li); 
               //hide elements that are not on current page
                studentListItem.hide(); 
        });  
     studentListMaster.each(function(index,li){ 
            var studentListItem = $(li); 
               //hide elements that are not on current page
                studentListItem.hide(); 
        });  
}


