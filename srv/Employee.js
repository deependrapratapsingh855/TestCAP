const cds = require('@sap/cds');
let oInput,tx;
module.exports = cds.service.impl(function (){
    //Employee
    this.on("CrNynAetTbHNHqn3", async(req)=>{
        try{
            let result, returnObj;
            payload = req.data;
            oInput = JSON.parse(payload.XkXwXp4nCf5azs0U); 
            const aEmployee = oInput.Employees;
            tx = cds.transaction(req); 

            for(let i=0;i<aEmployee;i++){
                result = await tx.run(`CALL "CreateEmployee"(?,?)`,[aEmployee[i].ID,aEmployee[i].NAME]);
                console.log(result);
            }
            

            returnObj = {
                "Success":"Employee is added successfully."
            };

            return JSON.stringify(returnObj);
        }
        catch(error){
            if (tx) {
                await tx.rollback();
            }
            return req.error({
                code: 500, 
                message: error.toString() 
            });

        }
    })

})