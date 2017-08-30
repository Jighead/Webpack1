import '../css/main.scss';
import '../css/about.scss';
//import '../css/about.scss';
import $ from 'jquery';
import { Navbar } from '../components/navbar';
import  ContentReader from '../components/contentreader';

$(document).ready(function () {
    $('#root').append(Navbar.render); 
    // You probably want to delete this. It's just an annoying example.
    $('.nav').on('click', 'li a', function(){
        alert('Link click works!');
    });  

 ContentReader.renderContent('about.html');
    
});
