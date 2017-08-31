import $ from 'jquery'; 

class ContentReader {

     static renderContent(filename) {
        const isProd = process.env.NODE_ENV === 'production'
        if (filename) {
             $.get(' content/'+ filename, function(data) {
                 //console.log(data);
                $('div.content').append(data);
            }).fail(function(error) {
                console.log(error);
            });

            // this works too if you prefer
            // $.ajax({
            //     url: "content/" + filename,
            //     type: "GET",
            //     crossDomain: true,
            //     success: function (data) {
            //         //console.log(data);
            //         $('div.content').append(data);
            //     },
            //     error: function (xhr, status) {
            //        console.log(xhr.getAllResponseHeaders());
            //     }
            // });

        } else {
            console.log("No file name given! Please pass in a file name.")
        }
    }

}

export default ContentReader;