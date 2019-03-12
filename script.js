const STATE = {};   

let doc = new jsPDF();

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

let questions1 = [questions[0], questions[1], questions[2]];
let questions2 = questions[3];
let questions3 = questions[4];
let questions4 = [questions[5], questions[6]];
let questions5 = [questions[7], questions[8]];
let submitButton;
let i = 1;
let k = 1;
let forwardArrow = document.querySelector('.forward');
let backArrow = document.querySelector('.arrows.back');
// let backArrowButton = document.querySelector('.arrow-button.back');
// let forwardArrowButton = document.querySelector('.arrow-button.forward');
// console.log(backArrowButton)
// let questionText = document.getElementById('question-text');

// document.getElementById('question-number-text').innerText = `Question ${i} of ${questions.length}`;  
// questionText.innerText = questions[i-1];

// first 3 questions
questions1.forEach(question => {
    let questionText = `<p class="question-text">${question}</p><input id="answer-input" type="text">`;
    document.querySelector('#survey').insertAdjacentHTML('beforeend', `${questionText}`);
});

forwardArrow.addEventListener('click', () => {
    let radioBoxes;
    
    let inputs = document.querySelectorAll('input');

    let questionTexts = document.querySelectorAll('.question-text');

    let radioAnswer = document.querySelectorAll('input[type="radio"]');

    // if (i === 1) {
    //     for (let ii = 0; ii < questionTexts.length; ii++) {
    //         if (inputs[ii].value !== undefined) {
    //             STATE[questionTexts[ii].textContent] = inputs[ii].value;
    //         }
    //     }
    // }

    if (i === 4) {
        // for (let ii = 0; ii < questionTexts.length; ii++) {
        //     if (inputs[ii].value !== undefined) {
        //         STATE[questionTexts[ii].textContent] = inputs[ii].value;
        //     }
        // }
        forwardArrow.style.visibility = 'hidden'; 
        let submitButton = document.createElement('input');
        submitButton.type = 'submit';
        submitButton.value = 'Submit';
        submitButton.id = 'submit-button';
        document.querySelector('body').appendChild(submitButton);
        submitButton.addEventListener('click', () => {

            questionTexts = document.querySelectorAll('.question-text');
            inputs = document.querySelectorAll('input');
                for (let ii = 0; ii < questionTexts.length; ii++) {
                    if (inputs[ii].value !== undefined) {
                        STATE[questionTexts[ii].textContent] = inputs[ii].value;
                    }
                }

            let b = 0;
            let currentLine = 20;
            while (b < questions.length) {
                // go over every element in STATE
                Object.keys(STATE).forEach(key => {
                    if (Array.isArray(questions[b])) {
                        if (questions[b][0] === key) {
                            doc.setFontType('bold');
                            doc.text(`${key}`, 20, currentLine);
                            currentLine += 10;
                            doc.setFontType('normal');
                            doc.text(`${STATE[key]}`, 20, currentLine);
                            currentLine += 10;
                            b++;
                        }
                    } else if (questions[b] === key) {
                        doc.setFontType('bold');
                        doc.text(`${key}`, 20, currentLine);
                        currentLine += 10;
                        if (key === 'What is your company’s logo?' && STATE[key] !== '') {
                            doc.addImage(STATE[key], 20, currentLine, 50, 50);
                            currentLine += 65;
                        } else {
                            doc.setFontType('normal');
                            doc.text(`${STATE[key]}`, 20, currentLine);
                            currentLine += 10;
                        }
                        b++;
                    } else if (STATE[key] === '') {
                        b++;
                    } 
                });
            }
            doc.output('dataurlnewwindow');
        });
    } 
    backArrow.style.visibility = 'visible';
    i++;
    
    // if it's a group, only show the first here
    if (i === 2) {
        for (let ii = 0; ii < questionTexts.length; ii++) {
            if (inputs[ii].value !== undefined) {
                STATE[questionTexts[ii].textContent] = inputs[ii].value;
            }
        }
        for (let j = 1; j < questions2.length; j++) {
            if (radioBoxes !== undefined) {
                radioBoxes += `<div class="input-div"><input type="radio" name="${questions2}" id="${questions2[j]}" value="${questions2[j]}"><label for="${questions2[j]}"> ${questions2[j]}</label></div><br>`
            } else {
                radioBoxes = `<div class="input-div"><input type="radio" name="${questions2}" id="${questions2[j]}" value="${questions2[j]}"><label for="${questions2[j]}"> ${questions2[j]}</label></div><br>`
            }   
        }
        document.querySelector('#survey').innerHTML = '';
        document.getElementById('percentage').innerText = '33%';
        questionText = `<p class="question-text">${questions2[0]}</p><div id="radio-div">${radioBoxes}</div>`;
        document.querySelector('#survey').insertAdjacentHTML('beforeend', `${questionText}`);
        let inputDivs = document.querySelectorAll('.input-div');
        inputDivs.forEach(inputDiv => {
            // add checks by clicking on the parent div
            inputDiv.addEventListener('click', () => {
                inputDiv.children[0].checked = 'true';
            });
        });
    } else if (i === 3) {
        radioAnswer.forEach(answer => {
            if (answer.checked) {
                STATE[questions2[0]] = answer.value;
            } else {
                STATE[questions2[0]] = '';
            }
        });
        for (let j = 1; j < questions3.length; j++) {
            if (radioBoxes !== undefined) {
                radioBoxes += `<div class="input-div"><input type="radio" name="${questions3}" id="${questions3[j]}" value="${questions3[j]}"><label for="${questions3[j]}"> ${questions3[j]}</label></div><br>`
            } else {
                radioBoxes = `<div class="input-div"><input type="radio" name="${questions3}" id="${questions3[j]}" value="${questions3[j]}"><label for="${questions3[j]}"> ${questions3[j]}</label></div><br>`
            }   
        }
        document.querySelector('#survey').innerHTML = '';
        document.getElementById('percentage').innerText = '44%';
        questionText = `<p class="question-text">${questions3[0]}</p><div id="radio-div">${radioBoxes}</div>`;
        // console.log(questions3[0])
        document.querySelector('#survey').insertAdjacentHTML('beforeend', `${questionText}`);
    } else if (i === 4) {
        radioAnswer.forEach(answer => {
            if (answer.checked) {
                STATE[questions3[0]] = answer.value;
            } else {
                STATE[questions3[0]] = '';
            }        
        });
        document.getElementById('percentage').innerText = '56%';
        document.querySelector('#survey').innerHTML = '';
        questions4.forEach(question => {
            let questionText;
            if (question === 'What is your company’s logo?') {
                questionText = `<p class="question-text">${question}</p><input style="margin-bottom: 20px;" id="file-upload" value="fileupload" type="file">`;
            } else {
                questionText = `<p class="question-text">${question}</p><input id="answer-input" type="text">`;
            }
            document.querySelector('#survey').insertAdjacentHTML('beforeend', `${questionText}`);
        });
    } else {
        for (let ii = 0; ii < questionTexts.length; ii++) {
            if (inputs[ii].value !== undefined) {
                STATE[questionTexts[ii].textContent] = inputs[ii].value;
            }
            if (inputs[ii].files !== null) {
                if (inputs[ii].files.length > 0) {
                    console.log(inputs[ii].files.length)
                    let file = inputs[ii].files[0];
                    let reader = new FileReader(file);
                    reader.readAsDataURL(file);
                    reader.onload = (e) => {
                        STATE[questionTexts[ii].textContent] = e.target.result;
                    };
                }  
            }
        }
        document.getElementById('percentage').innerText = '78%';
        document.querySelector('#survey').innerHTML = '';
        questions5.forEach(question => {
            let questionText = `<p class="question-text">${question}</p><input id="answer-input" type="text">`;
            document.querySelector('#survey').insertAdjacentHTML('beforeend', `${questionText}`);
        });
    }
    let inputDivs = document.querySelectorAll('.input-div');
    inputDivs.forEach(inputDiv => {
        // add checks by clicking on the parent div
        inputDiv.addEventListener('click', () => {
            inputDiv.children[0].checked = 'true';
        });
    });
});

backArrow.addEventListener('click', () => {
    let radioBoxes;
    if (i === 2) backArrow.style.visibility = 'hidden';
    else if (i === 5) forwardArrow.style.visibility = 'visible';
    i--;
    
    if (i === 1) {
        document.querySelector('#survey').innerHTML = '';
        document.getElementById('percentage').innerText = '0%';
        questions1.forEach(question => {
            let questionText = `<p class="question-text">${question}</p><input id="answer-input" type="text">`;
            document.querySelector('#survey').insertAdjacentHTML('beforeend', `${questionText}`);
        });
    }
    // if it's a group, only show the first here
    else if (i === 2) {
        for (let j = 1; j < questions2.length; j++) {
            if (radioBoxes !== undefined) {
                radioBoxes += `<div class="input-div"><input type="radio" name="${questions2}" id="${questions2[j]}" value="${questions2[j]}"><label for="${questions2[j]}"> ${questions2[j]}</label></div><br>`
            } else {
                radioBoxes = `<div class="input-div"><input type="radio" name="${questions2}" id="${questions2[j]}" value="${questions2[j]}"><label for="${questions2[j]}"> ${questions2[j]}</label></div><br>`
            }   
        }
        document.getElementById('percentage').innerText = '33%';
        document.querySelector('#survey').innerHTML = '';
        questionText = `<p class="question-text">${questions2[0]}</p><div id="radio-div">${radioBoxes}</div>`;
        // console.log(questions2[0])
        document.querySelector('#survey').insertAdjacentHTML('beforeend', `${questionText}`);
        let inputDivs = document.querySelectorAll('.input-div');
        inputDivs.forEach(inputDiv => {
            // add checks by clicking on the parent div
            inputDiv.addEventListener('click', () => {
                inputDiv.children[0].checked = 'true';
            });
        });
    } else if (i === 3) {
        for (let j = 1; j < questions3.length; j++) {
            if (radioBoxes !== undefined) {
                radioBoxes += `<div class="input-div"><input type="radio" name="${questions3}" id="${questions3[j]}" value="${questions3[j]}"><label for="${questions3[j]}"> ${questions3[j]}</label></div><br>`
            } else {
                radioBoxes = `<div class="input-div"><input type="radio" name="${questions3}" id="${questions3[j]}" value="${questions3[j]}"><label for="${questions3[j]}"> ${questions3[j]}</label></div><br>`
            }   
        }
        document.getElementById('percentage').innerText = '44%';
        document.querySelector('#survey').innerHTML = '';
        questionText = `<p class="question-text">${questions3[0]}</p><div id="radio-div">${radioBoxes}</div>`;
        document.querySelector('#survey').insertAdjacentHTML('beforeend', `${questionText}`);
    } else if (i === 4) {
        document.getElementById('submit-button').parentNode.removeChild(document.getElementById('submit-button'));
        document.getElementById('percentage').innerText = '56%';
        document.querySelector('#survey').innerHTML = '';
        questions4.forEach(question => {
            let questionText;
            if (question === 'What is your company’s logo?') {
                questionText = `<p class="question-text">${question}</p><input style="margin-bottom: 20px;" id="file-upload" value="fileupload" type="file">`;
            } else {
                questionText = `<p class="question-text">${question}</p><input id="answer-input" type="text">`;
            }
            document.querySelector('#survey').insertAdjacentHTML('beforeend', `${questionText}`);
        });
    } else {
        document.getElementById('percentage').innerText = '78%';
        document.querySelector('#survey').innerHTML = '';
        questions5.forEach(question => {
            let questionText = `<p class="question-text">${question}</p><input id="answer-input" type="text">`;
            document.querySelector('#survey').insertAdjacentHTML('beforeend', `${questionText}`);
        });
    }
    let inputDivs = document.querySelectorAll('.input-div');
    inputDivs.forEach(inputDiv => {
        // add checks by clicking on the parent div
        inputDiv.addEventListener('click', () => {
            inputDiv.children[0].checked = 'true';
        });
    });
});

// questions.forEach((question, index) => {
//     let questionText = question;
//     let radioBoxes;
//     if (Array.isArray(questions[i-1])) {
//         // if it's a group, only show the first here
        // for (let j = 1; j < questions[i-1].length; j++) {
        //     if (radioBoxes !== undefined) {
        //         radioBoxes += `<div class="input-div"><input type="radio" name="${questions[i-1]}" id="${questions[i-1][j]}" value="${questions[i-1][j]}"><label for="${questions[i-1][j]}"> ${questions[i-1][j]}</label></div><br>`
        //     } else {
        //         radioBoxes = `<div class="input-div"><input type="radio" name="${questions[i-1]}" id="${questions[i-1][j]}" value="${questions[i-1][j]}"><label for="${questions[i-1][j]}"> ${questions[i-1][j]}</label></div><br>`
        //     }   
        // }
//         questionText = `<p id="question-text">${questions[i-1][0]}</p><div id="radio-div">${radioBoxes}</div>`;
//         // reset radio boxes
//         radioBoxes = undefined;
//     } else if (questions[i-1] === 'What is your company’s logo?') {
//         questionText = `<p id="question-text">${questions[i-1]}</p><input id="file-upload" value="fileupload" type="file">`;
//     } else {
//         if (index === 0) {
//             questionText = `<p id="question-text">${questions[i-1]}</p><input id="answer-input" type="text">`;
//         } else {
//             questionText = `<p id="question-text">${questions[i-1]}</p><input id="answer-input" type="text">`;
//         }
        
//     }
//     document.querySelector('#survey').insertAdjacentHTML('beforeend', `<div id="question-container"><div id="question">${questionText}</div></div>`);
//     i = index + 2;
// });

// document.querySelector('#survey').insertAdjacentHTML('beforeend', `<input id="submit-button" type="submit" value="Submit">`);