const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });
const { sequelize, Employee } = require('./models')
const migrationhelper = require('./migrationhelper')

// Ny kolumn

// UPDATE one !

// async/await



async function listAll(){
    const employees = await Employee.findAll()
    for(const emp of employees){
        console.log("************************")
        console.log("ID:", emp.id)
        console.log("Name:", emp.name)
    }

}

async function createNew(){
    console.log("** NEW ** ")
    const name = await rl.question('Name:')
    const salary = await rl.question('Hourly salary::')

    await Employee.create({name:name, 
        birthDate:'1972-08-03',
        employedAt:'2008-05-28',
        hourlySalary:   parseInt(salary)})

}



async function main(){
    await migrationhelper.migrate()

    // update employees set name='Lunch' where id=1
    //select * from Employees where id=1
    const theEmployee = await Employee.findOne({
        where: { id:1 }
      })

      theEmployee.name = 'Lunch' //
      await theEmployee.save()


    while(true){    
        console.log('1. Lista alla employees')
        console.log('2. Skapa employee')
        console.log('3. Uppdatera employee')
        console.log('4. Ta bort employee')
        console.log('9. Avsluta')

        const sel = await rl.question('Val:');  
        if(sel == '1'){
            await listAll()
        }
        if(sel == '2'){
            await createNew()
        }
        if(sel == '3'){
            updateOne()
        }
        if(sel == '4'){
            deleteOne()
        }
        if(sel == '9'){
            break
        }
    
    }
}

(async()=> {
    main()
})()