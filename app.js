console.log()
const url = 'https://spreadsheets.google.com/feeds/list/1Z86cW-TqdqZK3v4tCn-q-lDeAIlSBadQpbfwSADg4cI/od6/public/values?alt=json'
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data.feed.entry)
        const projects = data.feed.entry.map( entry => {
            return {
                title: entry.gsx$title.$t,
                image: entry.gsx$image.$t,
                description: entry.gsx$description.$t,
                url: entry.gsx$url.$t
            }
        })
        console.log(projects); app(projects);
    })
    const app = (data) => {
        console.log('app is running!')
        console.log(data)
        const createProjectElement = (project) => {
           // const $div = $('<div>')
            $div.append($('<h2>').text(project.title))
            $div.append($('<p>').text(project.description))
            $div.append($('<img>').attr('src', project.image))
            $div.append($('<a>').attr('href', project.url))
            // return $div
        }
        data.forEach( project => {
            const $projectDiv = createProjectElement(project)
            $('body').append($projectDiv)
        })
    }
