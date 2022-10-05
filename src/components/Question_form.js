import React, { useState, useEffect } from 'react'

import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ShortTextIcon from '@material-ui/icons/ShortText';
import SubjectIcon from '@material-ui/icons/Subject';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { BsTrash } from 'react-icons/bs';
import { IconButton, MenuItem, Typography } from '@material-ui/core';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import TextFieldIcon from '@material-ui/icons/TextFields';
import { BsFileText } from 'react-icons/bs';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import { FcRightUp } from 'react-icons/fc';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import "./Question_form.css"
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function Question_form() {

  const [questions, setQuestions] = useState(
    [{
      questionText: "Capital of India?",
      questionType: "radio",
      options: [
        { optionText: "Mumbai" },
        { optionText: "Delhi" },
        { optionText: "Pune" }
      ],
      open: true,
      required: false
    }]
  )

  function changeQuestion(text, i) {
    var newQuestion = [...questions];
    newQuestion[i].questionText = text;
    setQuestions(newQuestion);
    console.log(newQuestion)
  }
  function changeOptionValue(text, i, j) {
    var optionsQuestion = [...questions];
    optionsQuestion[i].options[j].optionText = text;
    setQuestions(optionsQuestion);
    console.log(optionsQuestion);
  }
  function addQuestionType(i, type) {
    let qs = [...questions];
    console.log(type)
    qs[i].questionType = type;
    setQuestions(qs);
  }
  function removeOption(i, j) {
    var RemoveOptionQuestion = [...questions];
    if (RemoveOptionQuestion[i].options.length > 1) {
      RemoveOptionQuestion[i].options.splice(j, 1);
      setQuestions(RemoveOptionQuestion)
      console.log(i + "__" + j);
    }
  }
  function addOption(i) {
    var optionofQuestion = [...questions];
    if (optionofQuestion[i].options.length < 5) {
      optionofQuestion[i].options.push({ optionText: "Option" + (optionofQuestion[i].options.length + 1) })
    } else {
      console.log("max 5 options")
    }
    setQuestions(optionofQuestion)
  }
  function copyQuestion(i) {
    expandCloseAll()
    let qs = [...questions]
    var newQuestion = qs[i]

    setQuestions([...questions, newQuestion])
  }
  function deleteQuestion(i) {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs)
  }
  function requiredQuestion(i) {
    var reqQuestion = [...questions];
    reqQuestion[i].required = !reqQuestion[i].required
    console.log(reqQuestion[i].required + " " + i);
    setQuestions(reqQuestion)
  }
  function addMoreQuestionField() {
    expandCloseAll();
    setQuestions([...questions,
    {
      questionText: "Question", questionType: "radio", options: [{ optionText: "option 1" }], open: true, required: false
    }]
    );
  }


  function onDragEnd(result){
    if(!result.destination){
        return;
    }
              var itemgg = [...questions];
              const itemF = reorder(
              itemgg,
              result.source.index,
              result.destination.index
              );
              setQuestions(itemF);
 }
 const reorder = (list, startIndex, endIndex)=>{
    const result= Array.from(list);
              const [removed] = result.splice(startIndex, 1);
              result.splice(endIndex, 0, removed);
              return result;
 };


  

  function expandCloseAll() {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      qs[j].open = false;
    }
    setQuestions(qs);
  }
  function handleExpand(i) {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      if (i == j) {
        qs[i].open = true;
      }
      qs[i].open = false;
    }
    setQuestions(qs);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  function questionsUI() {
    return questions.map((ques, i) => (
      <Draggable key={i} draggableId={i + 'id'} index={i}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            <div>
              <div style={{ marginBottom: "0px" }}>
                <div style={{ width: '100%', marginBottom: '0px' }}>
                  <DragIndicatorIcon style={{
                    transform: "rotate(-90deg)", color: "#DAE0E2",
                    position: "relative", left: "300px"
                  }} fontSize="small" />
                </div>
              </div>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps}
                      ref={provided.innerRef}>
                      {questionsUI()}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>


              <div>
                <Accordion expanded={questions[i].open} onChange={() => { handleExpand(i) }} className={questions[i].open ? 'add border' : ""}>

                  <AccordionSummary aria-controls='panel1a-content'
                    id="panel1a-header" elevation={1} style={{ width: '100%' }}>
                    {questions[i].open ? (

                      <div className="savedquestions">

                        <Typography style={{ fontSize: "15px", fontWeight: "400", letterSpacing: '.1px', lineHeight: '24px', paddingBottom: "8px" }}>
                          {i + 1}. {questions[i].questionText}
                        </Typography>

                        {ques.options.map((op, j) => (

                          <div key={j}>
                            <div style={{ display: 'flex' }}>
                              <FormControlLabel style={{ marginLeft: "5px", marginBottom: "5px" }} disabled control={<input type={ques.questionType}
                                color="primary" style={{ marginRight: '3px', }} required={ques.type} />} label={
                                  <Typography style={{
                                    fontFamily: 'Roboto, Arial, sans-serif',
                                    fontSize: '13px',
                                    fontWeight: '400',
                                    letterSpacing: '.2px',
                                    lineHeight: '20px',
                                    color: '#202124'
                                  }}>
                                    {ques.options[j].optionText}
                                  </Typography>
                                } />

                            </div>
                          </div>
                        ))}
                      </div>
                    ) : ''}
                  </AccordionSummary>
                  {questions[i].open ? (

                    <div className="question_boxes">
                      <AccordionDetails className="add_question">
                        <div className="add_question_top">
                          <input type="text" className='question' placeholder='Question' value={ques.questionText} onChange={(e) => { changeQuestion(e.target.value, i) }}></input>
                          <CropOriginalIcon style={{ color: "#5f6368" }} />
                          <Select className='select' style={{ color: '#5f6368', fontSize: "13px" }}>
                            <MenuItem id="text" value="Text" onClick={() => { addQuestionType(i, "text") }}><SubjectIcon style={{ marginRight: '10px' }} /> Paragraph</MenuItem>
                            <MenuItem id="checkbox" value="Checkbox" onClick={() => { addQuestionType(i, "checkbox") }}><CheckBoxIcon style={{ marginRight: "10px", color: '#70757a' }} checked /> Checkboxes </MenuItem>
                            <MenuItem id="radio" value="Radio" onClick={() => { addQuestionType(i, "radio") }}><Radio style={{ marginRight: "10px", color: "#70757a" }} checked />Multiple Choice</MenuItem>
                          </Select>
                        </div>

                        {ques.options.map((op, j) => (
                          <div className="add_question_body" key={j}>
                            {
                              (ques.questionType !== "text") ?
                                <input type={ques.questionType} style={{ marginRight: "10px" }} /> :
                                <ShortTextIcon style={{ marginRight: "10px" }} />
                            }
                            <div>
                              <input type="text" className='text_input' placeholder="option" value={ques.options[j].optionText} onChange={(e) => { changeOptionValue(e.target.value, i, j) }}></input>
                            </div>
                            <CropOriginalIcon style={{ color: "#5f6368" }} />
                            <IconButton aria-label="delete">
                              <CloseIcon onClick={() => { removeOption(i, j) }} />
                            </IconButton>
                          </div>
                        ))}
                        {ques.options.length < 5 ? (
                          <div className='add_question_body'>
                            <FormControlLabel disabled control={
                              (ques.questionType !== "text") ?
                                <input type={ques.questionType} color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }}
                                  style={{ marginRight: "10px", marginLeft: "10px" }} disabled /> :
                                <ShortTextIcon style={{ marginRight: "10px" }} />
                            } label={
                              <div>
                                <input type="text" className='text_input' style={{ fontSize: "13px", width: "60px" }} placeholder="Add other"></input>
                                <Button size="small" onClick={() => { addOption(i) }} style={{ textTransform: 'none', color: "#4285f4", fontSize: "13px", fontWeight: "600" }}>Add Option</Button>
                              </div>
                            } />
                          </div>
                        ) : ""}

                        <div className='add_footer'>
                          <div className='add_question_bottom_left'>
                            <Button size="small" style={{ textTransform: 'none', color: "#4285f4", fontSize: "13px", fontWeight: "600" }}>
                              <FcRightUp style={{ border: "2px solid #4285f4", padding: "2px", marginRight: "8px" }} />Answer Key</Button>
                          </div>

                          <div className='add_question_bottom'>
                            <IconButton aria-label="copy" onClick={() => { copyQuestion(i) }}>
                              <FilterNoneIcon />
                            </IconButton>

                            <IconButton aria-label="delete" onClick={() => { deleteQuestion(i) }}>
                              <BsTrash />
                            </IconButton>
                            <span style={{ color: "#5f6368", fontSize: "13px" }}>Required</span><Switch name="checkedA" color="primary" onClick={() => { requiredQuestion(i) }} checked={false} />
                            <IconButton>
                              <MoreVertIcon />
                            </IconButton>
                          </div>
                        </div>

                      </AccordionDetails>

                      <div className='question_edit'>
                        <AddCircleOutlineIcon onClick={addMoreQuestionField} className='edit' />
                        <OndemandVideoIcon className='edit' />
                        <CropOriginalIcon className='edit' />
                        <TextFieldIcon className='edit' />
                      </div>
                    </div>
                  ) : " "}
                </Accordion>
              </div>

            </div>
          </div>

        )}
      </Draggable>
    ))
  }

  return (
    <div>
      <div className="question_form">
        <br></br>
        <div className="section">
          <div className="question_title_section">
            <div className="question_form_top">
              <input type="text" className="question_form_top_name" style={{ color: "black" }} placeholder="Untitled document"></input>
              <input type="text" className="question_form_top_desc" placeholder="Form Description"></input>
            </div>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps}
                  ref={provided.innerRef}>
                  {questionsUI()}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  )
}

export default Question_form