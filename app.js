// console.log()
// const url = 'https://spreadsheets.google.com/feeds/list/1Z86cW-TqdqZK3v4tCn-q-lDeAIlSBadQpbfwSADg4cI/od6/public/values?alt=json'
// //takes our url and get json data from it
// fetch(url)
//     // make sure our response is converted to a json format
//   .then(response => response.json())
//   // take that data and perform following things (lines 10-20ish) on it
//   .then(data => {
//    //   console.log(data)
//    // console.log(data.feed.entry)
//     //tidying up the json formatted data that comes back
//     const projects = data.feed.entry.map(entry => {
//           // you spit that data out as tidier array of objects
//             return {
//                 title: entry.gsx$title.$t,
//                 image: entry.gsx$image.$t,
//                 description: entry.gsx$description.$t,
//                 code: entry.gsx$code.$t,
//                 WebsiteURL: entry.gsx$websiteurl.$t,
//             }
//     })
//     //you use the tidied up projects array and pass it into the app function (aka html generator)
//     app(projects);
//     })
//     // function that generates HTML elements for each of the rows on your google sheet
//   const app = (data) => {
//   //      console.log('app is running!')
//   //      console.log(data)
//         const createProjectElement = (project) => {
//            const $div = $('<div>').attr('class', 'project-list')
//             $div.append($('<h2>').attr('class', 'project-header').text(project.title))
//             $div.append($('<p>').text(project.description))
//             $div.append($('<img>').attr('src', project.image))
//             // $div.append($('<a>').attr('href', project.Code).text("Code "))

//             $div.append($('<a>').attr('href', project.WebsiteURL).text("Website"))


//             return $div
//         }
//         data.forEach( project => {
//             const $projectDiv = createProjectElement(project)
//             $("#allprojects").append($projectDiv)
//         })
//     }


//     $(document).ready(function() {
//       $('.nav').click(function(e) {
        
        
        
//         e.preventDefault();
//       });
//     });

//     $(document).ready(function() {
//       $('.nav').click(function(e) {
        
//         var targetHref = $(this).attr('href');
        
//       $('html, body').animate({
//         scrollTop: $(targetHref).offset().top
//       }, 1000);
        
//         e.preventDefault();
//       });
//     });






    (function() {
      function validEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
      }
    
      function validateHuman(honeypot) {
        if (honeypot) {  //if hidden form filled up
          console.log("Robot Detected!");
          return true;
        } else {
          console.log("Welcome Human!");
        }
      }
    
      // get all data in form and return object
      function getFormData(form) {
        var elements = form.elements;
    
        var fields = Object.keys(elements).filter(function(k) {
              return (elements[k].name !== "honeypot");
        }).map(function(k) {
          if(elements[k].name !== undefined) {
            return elements[k].name;
          // special case for Edge's html collection
          }else if(elements[k].length > 0){
            return elements[k].item(0).name;
          }
        }).filter(function(item, pos, self) {
          return self.indexOf(item) == pos && item;
        });
    
        var formData = {};
        fields.forEach(function(name){
          var element = elements[name];
          
          // singular form elements just have one value
          formData[name] = element.value;
    
          // when our element has multiple items, get their values
          if (element.length) {
            var data = [];
            for (var i = 0; i < element.length; i++) {
              var item = element.item(i);
              if (item.checked || item.selected) {
                data.push(item.value);
              }
            }
            formData[name] = data.join(', ');
          }
        });
    
        // add form-specific values into the data
        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
        formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default
    
        console.log(formData);
        return formData;
      }
    
      function handleFormSubmit(event) {  // handles form submit without any jquery
        event.preventDefault();           // we are submitting via xhr below
        var form = event.target;
        var data = getFormData(form);         // get the values submitted in the form
    
        /* OPTION: Remove this comment to enable SPAM prevention, see README.md
        if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
          return false;
        }
        */
    
        if( data.email && !validEmail(data.email) ) {   // if email is not valid show error
          var invalidEmail = form.querySelector(".email-invalid");
          if (invalidEmail) {
            invalidEmail.style.display = "block";
            return false;
          }
        } else {
          disableAllButtons(form);
          var url = form.action;
          var xhr = new XMLHttpRequest();
          xhr.open('POST', url);
          // xhr.withCredentials = true;
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhr.onreadystatechange = function() {
              console.log(xhr.status, xhr.statusText);
              console.log(xhr.responseText);
              var formElements = form.querySelector(".form-elements")
              if (formElements) {
                formElements.style.display = "none"; // hide form
              }
              var thankYouMessage = form.querySelector(".thankyou_message");
              if (thankYouMessage) {
                thankYouMessage.style.display = "block";
              }
              return;
          };
          // url encode form data for sending as post data
          var encoded = Object.keys(data).map(function(k) {
              return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
          }).join('&');
          xhr.send(encoded);
        }
      }
      
      function loaded() {
        //console.log("Contact form submission handler loaded successfully.");
        // bind to the submit event of our form
        var forms = document.querySelectorAll("form.gform");
        for (var i = 0; i < forms.length; i++) {
          forms[i].addEventListener("submit", handleFormSubmit, false);
        }
      };
      document.addEventListener("DOMContentLoaded", loaded, false);
    
      function disableAllButtons(form) {
        var buttons = form.querySelectorAll("button");
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].disabled = true;
        }
      }
    })();
    


    function myFunction() {
      var x = document.getElementById("myLinks");
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
    }















    // Hide carousel if there are no projects
$(document).ready(function() {
  if ($('#projects-container').children().length = 0) {
      $('#carousel-container').css('display', 'none');
  }; 
});
// Projects JSON (Create array of objects for projects using Google Sheets API)
const projURL = 'https://spreadsheets.google.com/feeds/list/1Z86cW-TqdqZK3v4tCn-q-lDeAIlSBadQpbfwSADg4cI/od6/public/values?alt=json';
fetch(projURL)
  .then(response => response.json())
  .then(data => {
      // console.log(`data:`, data)
      console.log(data.feed.entry)
      const projects = data.feed.entry.map(entry => {
          return {
              title: entry.gsx$title.$t,
              image: entry.gsx$image.$t,
              description: entry.gsx$description.$t,
              code: entry.gsx$code.$t,
              WebsiteURL: entry.gsx$websiteurl.$t,
          }
      })
      createProjectElements(projects)
  })
// Function to look through projects array of objects and add projects to HTML
const createProjectElements = (projects) => {    
  for (i = 0; i < projects.length; i++) {
      // Create one div per project
      const $projElement = $('<div>').attr('class', 'project-element');
      const $img = $('<img>').attr('src', projects[i].image);
      $projElement.append($img);
      // Create one card per project to place in same div
      const $projCard = $('<div>').attr('class', 'project-card');
      $projCard.append($('<h4>').text(projects[i].title));
      $projCard.append($('<p>').text(projects[i].description));
      const $projLink = $('<a>').attr('href', projects[i].code).attr('target', '_blank');
      $projLink.text('Source Code');
      $projCard.append($projLink);
      const $projURL = $('<a>').attr('href', projects[i].WebsiteURL).attr('target', '_blank');
      $projURL.text('Website URL');
      $projCard.append($projURL)
      $projElement.append($projCard);
      $('#projects-container').append($projElement);
  }
  // Invoke carousel functionality
  carouselGo();
}
// Previous & Next buttons for Carousel
// Based on Corgi Carousel Tutorial for GA SEIR Avocado Toast
function carouselGo() {
  let indexCounter = 0;
  let maxIndex = $('#projects-container').children().length - 1;
  $('#next').on('click', () => {
      $('#projects-container').children().eq(indexCounter).css('display','none');
      if (indexCounter < maxIndex) {
          indexCounter++;
      } else { 
          indexCounter = 0;
      }
      $('#projects-container').children().eq(indexCounter).css('display','block');
  });
  $('#previous').on('click', () => {
      $('#projects-container').children().eq(indexCounter).css('display','none');
      if (indexCounter > 0) {
          indexCounter--;
      } else {
          indexCounter = maxIndex;
      }
      $('#projects-container').children().eq(indexCounter).css('display','block');
  });
};