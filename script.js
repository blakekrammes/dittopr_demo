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
// let forwardArrow = document.querySelector('.forward');
// let backArrow = document.querySelector('.back');
// let questionText = document.getElementById('question-text');

// document.getElementById('question-number-text').innerText = `Question ${i} of ${questions.length}`;  
// questionText.innerText = questions[i-1];


// forwardArrow.addEventListener('click', () => {
//     backArrow.style.visibility = 'visible';
//     if (i === questions.length - 1) forwardArrow.style.visibility = 'hidden';
//     i++;
//     if (Array.isArray(questions[i-1])) {
//         // if it's a group, only show the first here
//         questionText.innerText = questions[i-1][0];
//     } else {
//         questionText.innerText = questions[i-1];
//     }
//     document.getElementById('question-number-text').innerText = `Question ${i} of ${questions.length}`;
// });

// backArrow.addEventListener('click', () => {
//     backArrow.style.visibility = 'visible';
//     if (i === 2) backArrow.style.visibility = 'hidden';
//     else if (i === questions.length) forwardArrow.style.visibility = 'visible';
//     i--;
//     if (Array.isArray(questions[i-1])) {
//         // if it's a group, only show the first here
//         questionText.innerText = questions[i-1][0];
//     } else {
//         questionText.innerText = questions[i-1];
//     }
//     document.getElementById('question-number-text').innerText = `Question ${i} of ${questions.length}`;
// });


questions.forEach((question, index) => {
    let questionText = question;
    let radioBoxes;
    if (Array.isArray(questions[i-1])) {
        // if it's a group, only show the first here
        for (let j = 1; j < questions[i-1].length; j++) {
            if (radioBoxes !== undefined) {
                radioBoxes += `<div class="input-div"><input type="radio" name="${questions[i-1]}" id="${questions[i-1][j]}" value="${questions[i-1][j]}"><label for="${questions[i-1][j]}"> ${questions[i-1][j]}</label></div><br>`
            } else {
                radioBoxes = `<div class="input-div"><input type="radio" name="${questions[i-1]}" id="${questions[i-1][j]}" value="${questions[i-1][j]}"><label for="${questions[i-1][j]}"> ${questions[i-1][j]}</label></div><br>`
            }   
        }
        questionText = `<p id="question-text">${questions[i-1][0]}</p><div id="radio-div">${radioBoxes}</div>`;
        // reset radio boxes
        radioBoxes = undefined;
    } else if (questions[i-1] === 'What is your company’s logo?') {
        questionText = `<p id="question-text">${questions[i-1]}</p><input id="file-upload" value="fileupload" type="file">`;
    } else {
        if (index === 0) {
            questionText = `<p id="question-text">${questions[i-1]}</p><input id="answer-input" type="text" autofocus>`;
        } else {
            questionText = `<p id="question-text">${questions[i-1]}</p><input id="answer-input" type="text">`;
        }
        
    }
    document.querySelector('#survey').insertAdjacentHTML('beforeend', `<div id="question-container"><div id="question">${questionText}</div></div>`);
    i = index + 2;
});

document.querySelector('#survey').insertAdjacentHTML('beforeend', `<input id="submit-button" type="submit" value="Submit">`);

let inputDivs = document.querySelectorAll('.input-div');

inputDivs.forEach(inputDiv => {
    // add checks by clicking on the parent div
    inputDiv.addEventListener('click', () => {
        inputDiv.children[0].checked = 'true';
    });
});
