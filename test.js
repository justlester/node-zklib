const ZKLib = require('./zklib')
const test = async () => {


    let zkInstance = new ZKLib('192.168.10.250', 4370, 10000, 4000);
    try {
        // Create socket to machine 
        await zkInstance.createSocket()


        // Get general info like logCapacity, user counts, logs count
        // It's really useful to check the status of device 
        console.log(await zkInstance.getInfo());

        zkInstance.getRealTimeLogs((data) => {
            // do something when some checkin 
            console.log(data)
        });


        const users = await zkInstance.getUsers();
        console.log(users.data);

        const attendences = await zkInstance.getAttendances((percent, total) => {
            console.log(`${((percent / total) * 100).toFixed(2)}%`);
        });

        const today = new Date();
        const todayDate = today.toISOString().split("T")[0];

        console.log({ todayDate });

        const retrieved_logs = attendences.data
            .filter((log) => {
                const recordDate = log.recordTime.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
                return recordDate === todayDate && log.deviceUserId === '5141'
            });

        retrieved_logs.sort((a, b) => b.recordTime - a.recordTime);

        console.log(retrieved_logs.slice(0, 3));
        console.log(`and ${retrieved_logs.length - 3} records`);

    } catch (e) {
        console.error(e?.err || JSON.stringify(e));
    }


}

test()