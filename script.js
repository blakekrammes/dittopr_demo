const questions = [
    'When was your company founded?', 
    'How much funding have you raised?', 
    'What messaging do you currently have in place?',
    // for arrays, 1st question is main, following questions are secondary
    ['What are your communications needs?', 'Media Relations', 'Content Development', 'Messaging', 'Social/Digital Marketing', 'Crisis'],
    ['What publication types are important to your company?', 'Mainstream', 'Trade', 'Local', 'National'],
    'Who are your spokespeople?',
    'What is your company’s logo?',
    'What type of news coverage have you received in the past?',
    'What keeps you up at night?' 
];

let i = 1;

document.getElementById('question-text').innerText = `Question ${i} of ${questions.length}`;


// questions.forEach((question, index) => {

    
//     document.getElementById('question').innerHTML(`<p>${question}</p>`);



// });