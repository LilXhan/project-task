
//POGRAMA TAREAS

const readline = require('node:readline')
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });
/* Tarea: valor booleano(si esta hecho o no) y descripcion

let tarea = {
  done: false;
  description: 'Lavar Platos'
};

*/

let taskList = [];

function addTask(taskList, taskDescription) {
  taskList.push({ done: false, description: taskDescription });
};

function printTaskList(taskList) {
  // [ ] sacar la basura
  // [x] lavar platos
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].done) {
      //tarea realizada
      console.log(i + 1 + '.', '[x] ' + taskList[i].description)
    } else {
      //tarea no realizada
      console.log(i + 1 + '.', '[ ] ' + taskList[i].description)
    }
  }
}

// Primer modo: lectura tareas necesarias o a cumlir
function modeOne(taskList) {
  rl.question('Introduce las tareas a realizar (fin si terminas): ', function (taskDesc) {
    switch (taskDesc) {
      case 'fin':
        console.log('Ya no se introduciran mas tareas');
        modeTwo(taskList);
        break;
      case 'exit':
        rl.close();
        break;
      default:
        addTask(taskList, taskDesc);
        console.log('La lista de tareas actual es:');
        printTaskList(taskList);
        modeOne(taskList);
    }
  });
}

function markTask(taskList, index) {
  if (index >= 0 && index < taskList.length) {
    taskList[index].done = true
  } else {
    console.log('Invalid Task Number')
  }
}

function checkOldDown(taskList) {
  for (let task of taskList) {
    if (!task.done) return false;
  }
  return true;
}

function modeTwo(taskList) {
  printTaskList(taskList)
  rl.question('Que tarea has realizado? ( 1 - n ) ', function (taskNumber) {
    switch (taskNumber) {
      case 'fin':
      case 'exit':
        console.log('Bye')
        rl.close();
        break;
      default:
        markTask(taskList, taskNumber - 1);
        //Comprobar si estan todas hechas y cerrar el pograma
        if (checkOldDown(taskList)) {
          console.log('Muy bien has completado todas las tareas')
          rl.close()
        } else {
          modeTwo(taskList);
        }
        break;
    }
  })
}


modeOne(taskList)

// Segundo modo: Marcar las tareas realizadas


