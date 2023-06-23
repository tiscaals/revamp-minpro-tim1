import React, { useState } from 'react';

const FAQ = () => {
  const [selectedQuestion1, setSelectedQuestion1] = useState('');
  const [selectedQuestion2, setSelectedQuestion2] = useState('');
  const [selectedQuestion3, setSelectedQuestion3] = useState('');
  const [selectedQuestion4, setSelectedQuestion4] = useState('');

  const handleQuestionSelect1 = (event:any) => {
    setSelectedQuestion1(event.target.value);
  };

  const handleQuestionSelect2 = (event:any) => {
    setSelectedQuestion2(event.target.value);
  };

  const handleQuestionSelect3 = (event:any) => {
    setSelectedQuestion3(event.target.value);
  };

  const handleQuestionSelect4 = (event:any) => {
    setSelectedQuestion4(event.target.value);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Frequently Asked Questions</h2>
      <div className="grid grid-cols-1 ">
        <div className="border border-gray-300 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">
            <select
              value={selectedQuestion1}
              onChange={handleQuestionSelect1}
              className="text-gray-800 w-full"
            >
              <option value="">Select a question</option>
              <option value="question1">Question 1</option>
              <option value="question2">Question 2</option>
              <option value="question3">Question 3</option>
            </select>
          </h3>
          {selectedQuestion1 === 'question1' && (
            <p className="text-gray-600">Answer to question 1</p>
          )}
          {selectedQuestion1 === 'question2' && (
            <p className="text-gray-600">Answer to question 2</p>
          )}
          {selectedQuestion1 === 'question3' && (
            <p className="text-gray-600">Answer to question 3</p>
          )}
        </div>

        <div className="border border-gray-300 p-4 rounded-lg mt-5">
          <h3 className="font-semibold mb-2">
            <select
              value={selectedQuestion2}
              onChange={handleQuestionSelect2}
              className="text-gray-800 w-full"
            >
              <option value="">Select a question</option>
              <option value="question4">Question 4</option>
              <option value="question5">Question 5</option>
              <option value="question6">Question 6</option>
            </select>
          </h3>
          {selectedQuestion2 === 'question4' && (
            <p className="text-gray-600">Answer to question 4</p>
          )}
          {selectedQuestion2 === 'question5' && (
            <p className="text-gray-600">Answer to question 5</p>
          )}
          {selectedQuestion2 === 'question6' && (
            <p className="text-gray-600">Answer to question 6</p>
          )}
        </div>

        <div className="border border-gray-300 p-4 rounded-lg mt-5">
          <h3 className="font-semibold mb-2">
            <select
              value={selectedQuestion3}
              onChange={handleQuestionSelect3}
              className="text-gray-800 w-full"
            >
              <option value="">Select a question</option>
              <option value="question7">Question 7</option>
              <option value="question8">Question 8</option>
              <option value="question9">Question 9</option>
            </select>
          </h3>
          {selectedQuestion3 === 'question7' && (
            <p className="text-gray-600">Answer to question 7</p>
          )}
          {selectedQuestion3 === 'question8' && (
            <p className="text-gray-600">Answer to question 8</p>
          )}
          {selectedQuestion3 === 'question9' && (
            <p className="text-gray-600">Answer to question 9</p>
          )}
        </div>

        <div className="border border-gray-300 p-4 rounded-lg mt-5">
          <h3 className="font-semibold mb-2">
            <select
              value={selectedQuestion4}
              onChange={handleQuestionSelect4}
              className="text-gray-800 w-full"
            >
              <option value="">Select a question</option>
              <option value="question10">Question 10</option>
              <option value="question11">Question 11</option>
              <option value="question12">Question 12</option>
            </select>
          </h3>
          {selectedQuestion4 === 'question10' && (
            <p className="text-gray-600">Answer to question 10</p>
          )}
          {selectedQuestion4 === 'question11' && (
            <p className="text-gray-600">Answer to question 11</p>
          )}
          {selectedQuestion4 === 'question12' && (
            <p className="text-gray-600">Answer to question 12</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
