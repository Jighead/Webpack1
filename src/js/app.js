import '../css/main.scss';
import $ from 'jquery'; // see the bootstrap loader in webpack.config it's pulled in there using file-loader.
import '../about.html';
import { RandomGenerator } from './random-generator';

// vanilla js version (left overs)
// const outputParagraph = document.querySelector('#outputParagraph');

// const outputRandomInt = () => {
//     outputParagraph.textContent = RandomGenerator.randomInteger();
// };

// const outputRandomRange = () => {
//     outputParagraph.textContent = RandomGenerator.randomRange(1, 500);
// };

// const buttonRndInt = document.querySelector('#randomInt');
// const buttonRndRange = document.querySelector('#randomRange');

// buttonRndInt.addEventListener('click', outputRandomInt);
// buttonRndRange.addEventListener('click', outputRandomRange);

const output = $('#output');

const outputRandomInt = () => {
    output.text(RandomGenerator.randomInteger());
};

const outputRandomRange = () => {
    output.text(RandomGenerator.randomRange(1, 500))
};
$('#randomInt').css('color','black');

$('#randomInt').click(outputRandomInt);
$('#randomRange').click(outputRandomRange);

