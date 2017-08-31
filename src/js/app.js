
import '../css/main.scss';
import $ from 'jquery'; // see the bootstrap loader in webpack.config it's pulled in there using file-loader.
import { Navbar } from '../components/navbar';
import { RandomGenerator } from '../components/random-generator';

$('#randomInt').css('color','black');

const el = {
    output : "#gen-output",
}

$(document).ready(function () {
    $('#root').append(Navbar.render);
    $('#root').append(RandomGenerator.render);

    $('.nav').on('click', 'li a', function(){
        alert('Link click works!');
    });

    $('#randomInt').on('click', function(){
        $(el.output).text(RandomGenerator.randomInteger());
    });

    $('#randomRange').on('click', function(){
        $(el.output).text(RandomGenerator.randomRange(1000,2000));
    });
});















//