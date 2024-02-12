const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000 // "Radiofrekvens"

//var bodyParser = require('body-parser')
app.use(express.json())
app.use(cors())



const { sequelize, Employee } = require('./models')
const migrationhelper = require('./migrationhelper')

// Ny kolumn

// UPDATE one !

// async/await -> MÅNDAG 
// app.delete('/api/employees/:anvId',async (req,res)=>{
//     const uuid = req.params.uuid
//     try {
//       const user = await Employee.findOne({ where: { userId:uuid } })
  
//       await user.destroy()
  



app.get('/api/employees',async (req,res)=>{
    const employees = await Employee.findAll()
    let result = employees.map(p=>({
        id: p.id,
        name: p.name
    }))
     res.json(result)
});


app.get('/api/employees/:anvId',async (req,res)=>{
    console.log(req.params.anvId)
    const theEmployee = await Employee.findOne({
        where: { id:req.params.anvId }
      })

    if(theEmployee == undefined){
        res.status(404).send('Finns inte')
    }
    res.json(theEmployee)
});




// async function listAll(){
//     const employees = await Employee.findAll()
//     for(const emp of employees){
//         console.log("************************")
//         console.log("ID:", emp.id)
//         console.log("Name:", emp.name)
//     }

// }

async function createNew(){
    console.log("** NEW ** ")
    const name = await rl.question('Name:')
    const salary = await rl.question('Hourly salary::')

    await Employee.create({name:name, 
        birthDate:'1972-08-03',
        employedAt:'2008-05-28',
        hourlySalary:   parseInt(salary)})

}



// async function main(){
//     await migrationhelper.migrate()

//     // update employees set name='Stefan', phone='0760-111111' where id=1
//     //select * from Employees where id=1
//     const theEmployee = await Employee.findOne({
//         where: { id:1 }
//       })

//       theEmployee.name = 'Stefan' //
//       theEmployee.phone = '0760-1112233' //
//       await theEmployee.save()


//     while(true){    
//         console.log('1. Lista alla employees')
//         console.log('2. Skapa employee')
//         console.log('3. Uppdatera employee')
//         console.log('4. Ta bort employee')
//         console.log('9. Avsluta')

//         const sel = await rl.question('Val:');  
//         if(sel == '1'){
//             await listAll()
//         }
//         if(sel == '2'){
//             await createNew()
//         }
//         if(sel == '3'){
//             updateOne()
//         }
//         if(sel == '4'){
//             deleteOne()
//         }
//         if(sel == '9'){
//             break
//         }
    
//     }
// }

app.listen(port, async () => {
    await migrationhelper.migrate()
    console.log(`Example app listening2 on port ${port}`)
})