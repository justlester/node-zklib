const ZKLib = require('./zklib');
const path = require('path');
const fs = require('fs');
const { DateTime } = require("luxon");

const test = async () => {

    const ip_address = '192.168.10.250';

    let zkInstance = new ZKLib(ip_address, 4370, 10000, 4000);
    try {
        // Create socket to machine 
        await zkInstance.createSocket();

        // Enable device for realtime
        await zkInstance.enableDevice();

        // Get general info like logCapacity, user counts, logs count
        // It's really useful to check the status of device 
        console.log(await zkInstance.getInfo());

        

        // const machine_time = await zkInstance.getTime();
        // const formatted_time = DateTime.fromJSDate(machine_time).toFormat('MMM dd, yyyy, h:mm:ss a');
        // const server_time = DateTime.now()
        
        // const formatted_server_time = server_time.toFormat('MMM dd, yyyy, h:mm:ss a');
        
        // console.log('before',{
        //     formatted_time,
        //     server_time: formatted_server_time
        // });

        // await zkInstance.setTime(server_time.toJSDate());

        // setTimeout(async ()=> {
        //     const machine_time2 = await zkInstance.getTime();
        //     const formatted_server_time2 = server_time.toFormat('MMM dd, yyyy, h:mm:ss a');
        //     const formatted_time2 = DateTime.fromJSDate(machine_time2).toFormat('MMM dd, yyyy, h:mm:ss a');
    
        //     console.log('after',{
        //         formatted_time: formatted_time2,
        //         server_time: formatted_server_time2
        //     })
        // },1500);

        // // Get Realtime logs
        // zkInstance.getRealTimeLogs((data) => {
        //     // do something when some checkin 
        //     console.log(data);
        // });

        // Get Users
        // const users = await zkInstance.getUsers();
        // console.log(users.data);

        // Get attendance logs
        // const attendences = await zkInstance.getAttendances((percent, total) => {
        //     console.log(`${((percent / total) * 100).toFixed(2)}%`);
        // });

        // const retrieved_logs = attendences.data
        
        // .filter((log) =>{
        //     const logDate = log.recordTime;
        //     const currentDate = new Date();
        //     currentDate.setHours(23, 59, 59, 999);

        //     return logDate <= currentDate
        // })

        // retrieved_logs.sort((a,b)=> a.recordTime > b.recordTime ? -1 : 1 );

        // let logFileContent = '';

        // logFileContent = logFileContent + `Data from ${ip_address}\n`;
        // logFileContent = logFileContent + `Total logs: ${retrieved_logs.length}\n\n`;

        // retrieved_logs.forEach((log, index) => {
        //     logFileContent = logFileContent + `${index + 1}. ${Object.keys(log).map(x => `${x} = ${log[x]}`).join('; ')}\n`;
        // });

        // const logFilePath = path.join(process.cwd(), 'logs.txt');

        // fs.writeFileSync(logFilePath, logFileContent, { flag: 'w' });

    } catch (e) {
        console.error(e);
        console.error(e?.err || JSON.stringify(e));
    } finally {
        // process.exit(1);
    }
}

test()