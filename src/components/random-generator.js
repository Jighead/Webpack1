
import $ from 'jquery'; 
export class RandomGenerator {
    static randomInteger() {
        return Math.ceil(Math.random() * 100);
    }

    static randomRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
   // you can create render functions like this one or can you place this in the index.html... your call.

    static render() {
        return `

    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8 col-sm-offset-2">
                <h1>I've been injected into the DOM via a render function... </h1>
                <div>
                    <img class="img-responsive" src="img/webpack-logo.png" alt="Webpack">
                </div>
                <button id="randomInt">A random Integer</button>
                <button id="randomRange">A random Integer in a Range</button>
                <p id="gen-output">BrowserSync Rocks!</p>

            </div>
        </div>
    </div>

        `;
    }
}