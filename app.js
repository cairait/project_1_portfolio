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
           const $div = $('<div>')
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















