/* eslint-disable prettier/prettier */
const getNameOfTypeTask= (res) => {

    var _dataCell1 = [];
    return _dataCell1;
}

const getNameSubType = (res) => {
     var dataTYPE = [
            {
                "ID": "1",
                "group_id": "1",
                "name": "ขอความช่วยเหลือ",
                "creation_date": "2021-10-18T00:00:00.000Z",
                "status": 1,
                "last_update": "2021-10-18T00:00:00.000Z"
            },
            {
                "ID": "2",
                "group_id": "1",
                "name": "ปัญหาความเดือดร้อน",
                "creation_date": "2021-10-18T00:00:00.000Z",
                "status": 1,
                "last_update": "2021-10-18T00:00:00.000Z"
            },
            {
                "ID": "3",
                "group_id": "1",
                "name": "ปัญหาที่ดิน",
                "creation_date": "2021-10-18T00:00:00.000Z",
                "status": 1,
                "last_update": "2021-10-18T00:00:00.000Z"
            },
            {
                "ID": "4",
                "group_id": "2",
                "name": "ขอคำปรึกษา",
                "creation_date": "2021-10-18T00:00:00.000Z",
                "status": 1,
                "last_update": "2021-10-18T00:00:00.000Z"
            },
            {
                "ID": "5",
                "group_id": "2",
                "name": "ขอความเป็นธรรม",
                "creation_date": "2021-10-18T00:00:00.000Z",
                "status": 1,
                "last_update": "2021-10-18T00:00:00.000Z"
            },
            {
                "ID": "6",
                "group_id": "2",
                "name": "ข้อเสนอแนะ",
                "creation_date": "2021-10-18T00:00:00.000Z",
                "status": 1,
                "last_update": "2021-10-18T00:00:00.000Z"
            },
            {
                "ID": "7",
                "group_id": "2",
                "name": "อื่นๆ",
                "creation_date": "2021-10-18T00:00:00.000Z",
                "status": 1,
                "last_update": "2021-10-18T00:00:00.000Z"
            },
            {
                "ID": "8",
                "group_id": "1",
                "name": "กล่าวโทษเจ้าหน้าที่รัฐ",
                "creation_date": "2021-10-18T00:00:00.000Z",
                "status": 1,
                "last_update": "2021-10-18T00:00:00.000Z"
            },
            {
                "ID": "9",
                "group_id": "1",
                "name": "แจ้งเบาะแสการกระทำผิด",
                "creation_date": "2021-10-18T00:00:00.000Z",
                "status": 1,
                "last_update": "2021-10-18T00:00:00.000Z"
            }
        ]
    return dataTYPE.filter(resT => resT.ID == res)[0].name
}

export {
    getNameOfTypeTask,
    getNameSubType
}