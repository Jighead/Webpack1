import $ from 'jquery'; 

class ContentReader {

     static renderContent(filename) {

        if (filename) {
            $.get('../src/content/' + filename, function(data) {
                //console.log(data);
                $('div.content').append(data);
            }).fail(function(error) {
                console.log(error);
            });
        } else {
            console.log("No file name given! Please pass in a file name.")
        }
    }
}

export default ContentReader;