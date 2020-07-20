console.log()
const url = 'https://spreadsheets.google.com/feeds/list/1Z86cW-TqdqZK3v4tCn-q-lDeAIlSBadQpbfwSADg4cI/od6/public/values?alt=json'
//takes our url and get json data from it
fetch(url)
    // make sure our response is converted to a json format
  .then(response => response.json())
  // take that data and perform following things (lines 10-20ish) on it
  .then(data => {
      console.log(data)
    console.log(data.feed.entry)
    //tidying up the json formatted data that comes back
    const projects = data.feed.entry.map(entry => {
          // you spit that data out as tidier array of objects
            return {
                title: entry.gsx$title.$t,
                image: entry.gsx$image.$t,
                description: entry.gsx$description.$t,
                url: entry.gsx$url.$t
            }
    })
    //you use the tidied up projects array and pass it into the app function (aka html generator)
    app(projects);
    })
    // function that generates HTML elements for each of the rows on your google sheet
  const app = (data) => {
        console.log('app is running!')
        console.log(data)
        const createProjectElement = (project) => {
           const $div = $('<div>').attr('class', 'project-list')
            $div.append($('<h2>').attr('class', 'project-header').text(project.title))
            $div.append($('<p>').text(project.description))
            $div.append($('<img>').attr('src', project.image))
            $div.append($('<a>').attr('href', project.url))
            return $div
        }
        data.forEach( project => {
            const $projectDiv = createProjectElement(project)
            $("#allprojects").append($projectDiv)
        })
    }


    $(document).ready(function() {
      $('.nav').click(function(e) {
        
        
        
        e.preventDefault();
      });
    });

    $(document).ready(function() {
      $('.nav').click(function(e) {
        
        var targetHref = $(this).attr('href');
        
      $('html, body').animate({
        scrollTop: $(targetHref).offset().top
      }, 1000);
        
        e.preventDefault();
      });
    });






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
        console.log("Contact form submission handler loaded successfully.");
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
    








