const request = require('superagent');
//const url = 'https://www.jaldhara.in/api/data/v1/form/read';
const fs = require('fs');
const inputFile = './forms_data.json';
let data = [];
let allPromises = [];
const request_params = [
  {
    "subType": "textbook",
    "action": "create"
  },
  {
    "subType": "textbook",
    "action": "save"
  },
  {
    "subType": "textbook",
    "action": "review"
  },
  {
    "subType": "course",
    "action": "create"
  },
  {
    "subType": "course",
    "action": "save"
  },
  {
    "subType": "course",
    "action": "review"
  },
  {
    "subType": "resource",
    "action": "create"
  },
  {
    "subType": "resource",
    "action": "save"
  },
  {
    "subType": "resource",
    "action": "review"
  },
  {
    "subType": "collection",
    "action": "create"
  },
  {
    "subType": "collection",
    "action": "save"
  },
  {
    "subType": "collection",
    "action": "review"
  },
  {
    "subType": "lessonplan",
    "action": "create"
  },
  {
    "subType": "lessonplan",
    "action": "save"
  },
  {
    "subType": "lessonplan",
    "action": "review"
  },
  // {
  //   "subType": "questions",
  //   "action": "question-meta-save"
  // }
]


fs.readFile(inputFile, 'utf-8',(err, data)=> {
  let forms = JSON.parse(data);
  let count = 0
  request_params.forEach((param) => {
    forms.forEach((form) => {
      if (param.subType === form.result.form.subType && param.action === form.result.form.action){
        let promise = new Promise ((resolve, reject) => {
          request
          .post("xyc")
          .send({
       	  "request": {
           		"type": "content",
           		"subType": form.result.form.subType,
           		"action": form.result.form.action,
           		"framework": "ARGHYAM_T1",
           		"rootOrgId": "0124872605121085443",
              "data":  form.result.form.data
           	}
           })
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxODljZWJlMDNkOWY0NWE1ODY0ZjllMTk4ZmFiYWE0YiJ9.ULpg0kz8_LkBv4M1D_PB3YYv6e4WAyQhaXRJ_nOp6gU')
           .end((err, res) => {
             if (err) reject(err);
             resolve(res.body);
           })
        })
        allPromises.push(promise);
       }
      })
    })
  })

Promise.all(allPromises);
