// Ensure questions_data exists before proceeding
if (typeof questions_data !== "undefined" && Array.isArray(questions_data)) {
    console.log("✅ Found questions_data, processing...");

    questions_data.forEach((question, index) => {
        console.log(`\n🔹 Processing Question ID: ${question.ques_id}, Type: ${question.questions_type}`);

        // Get all correct answers
        let correctAnswers = question.all_options.filter(option => option.is_true === 1);
        
        if (correctAnswers.length === 0) {
            console.warn(`⚠ No correct answers found for Question ${question.ques_id}`);
            return;
        }

        // Select the correct answers in the HTML
        correctAnswers.forEach(answer => {
            let inputElement = document.querySelector(`input[value="${answer.answer_id}"]`);
            if (inputElement) {
                inputElement.checked = true;
                console.log(`✔ Selected Answer ID: ${answer.answer_id} for Question ${question.ques_id}`);
            } else {
                console.warn(`⚠ Input element not found for Answer ID: ${answer.answer_id}`);
            }
        });

        // Handle submission for Single choice questions
        if (question.questions_type === "Single") {
            let submitButton = document.querySelector(`.submit_quiz_step1`);
            if (submitButton) {
                setTimeout(() => {
                    submitButton.click();
                    console.log(`✅ Submitted answer for Question ${question.ques_id}`);
                }, 1000); // Adding a delay to prevent issues
            } else {
                console.warn(`⚠ Submit button not found for Question ${question.ques_id}`);
            }
        }

        // Handle submission for Multiple choice questions (if needed)
        if (question.questions_type === "Multiple") {
            let multipleSubmitButton = document.querySelector(`.submit_quiz_step1`);
            if (multipleSubmitButton) {
                setTimeout(() => {
                    multipleSubmitButton.click();
                    console.log(`✅ Submitted multiple-choice answer for Question ${question.ques_id}`);
                }, 1500); // Slightly longer delay for multiple selection
            } else {
                console.warn(`⚠ Submit button not found for Multiple Choice Question ${question.ques_id}`);
            }
        }
    });

    // After all questions are processed, click the final buttons in sequence
    setTimeout(() => {
        // Click View Result button
        const viewResultBtn = document.querySelector('.submit_quiz_btn.quizz_btn');
        if (viewResultBtn) {
            viewResultBtn.click();
            console.log('✅ Clicked "View Result" button');
            
            // After 2 seconds, click Continue button
            setTimeout(() => {
                const continueBtn = document.querySelector('.start_quiz_btn.take_btn');
                if (continueBtn) {
                    continueBtn.click();
                    console.log('✅ Clicked "Continue" button');
                    
                    // After 3 seconds, click Process My Result button
                    setTimeout(() => {
                        const processResultBtn = document.querySelector('.retake_quiz_btn.retake_btn');
                        if (processResultBtn) {
                            processResultBtn.click();
                            console.log('✅ Clicked "Process My Result & Close" button');
                        } else {
                            console.warn('⚠ "Process My Result & Close" button not found');
                        }
                    }, 3000);
                } else {
                    console.warn('⚠ "Continue" button not found');
                }
            }, 2000);
        } else {
            console.warn('⚠ "View Result" button not found');
        }
    }, 2000); // Wait 2 seconds after all questions are processed
} else {
    console.error("❌ Error: questions_data not found or not in the expected format.");
}
