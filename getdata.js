var request = require('request');
var cheerio = require('cheerio');
let formData = "USER=0009&DELIMITER=%5Ct&SUBST_STR=G%3AGraduate&SUBST_STR=U%3AUndergraduate&SUBST_STR=L%3ALab&SUBST_STR=D%3ADiscussion&SUBST_STR=S%3ASeminar&SUBST_STR=I%3AIndependent+Study&SUBST_STR=GRD%3AA-E&SUBST_STR=SUS%3ASatisfactory%2FUnsatisfactory&SUBST_STR=GLU%3ALoad+Credit+or+Unsatisfactory&SUBST_STR=GRU%3AResearch+Credit+or+Unsatisfactory&HEADING_FONT_FACE=Arial&HEADING_FONT_SIZE=3&HEADING_FONT_COLOR=black&RESULTS_PAGE_TITLE=&RESULTS_PAGE_BGCOLOR=%23F0F0F0&RESULTS_PAGE_HEADING=&RESULTS_PAGE_FONT_FACE=Arial&RESULTS_PAGE_FONT_SIZE=2&RESULTS_PAGE_FONT_COLOR=black&NO_MATCHES_MESSAGE=Sorry%2C+no+courses+were+found+that+match+your+criteria.&NO_PRINT=3&NO_PRINT=4&NO_PRINT=6&NO_PRINT=7&NO_PRINT=8&GREATER_THAN_EQ=26&NO_PRINT=26&Level=&College_or_School=&Department_or_Program=computer+science&Course_Subject=&Course_Number=&Class_Number=&Course_Title=&Days=&Instructor=&Grading=&Course_Info=&Meeting_Info=&Comments=&Credit_Range=&Component_is_blank_if_lecture=&Topic_if_applicable=&Seats_remaining_as_of_last_update=&Session=&IT_Commons_Course=&Fully_Online_Course=&General_Education_Course=&Honors_College_Course=&Writing_Intensive_Course=&Oral_Discourse_Course=&Information_Literacy_Course=&Special_Restriction=";
request.post({
    url: 'https://www.albany.edu/cgi-bin/general-search/search.pl',
    body: formData,
  }, function(error, response, body){


    const $ = cheerio.load(body);
    /*
    $('B').each(function() {
      var text = $(this).before().text();
      console.log(text);
    })
*/

    $('HR').each(function(){

      var text = $(this).contents().filter(function(){
        return this.nodeType
      })
    })
    console.log(lol);
});
