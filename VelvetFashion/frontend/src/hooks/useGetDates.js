function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
        ["вс", "пн", "вт", "ср", "чт", "пт", "сб"][dayOfWeek];
}

function getMonthByNum(month){
    return ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь",	"Ноябрь", "Декабрь"][month - 1]
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}


export function useGetDates(){
    const currentDate = new Date();
    let dd = currentDate.getDate();
    const yyyy = currentDate.getFullYear();

    let mm = (currentDate.getMonth() + 1);

    const dict = [];

    for (let monthCount = 0; monthCount < 3; monthCount++){

        let days = daysInMonth(mm, Number(yyyy));

        for (let i = Number(dd); i <= days; i++){
            dict.push({"day": getDayOfWeek(mm + '-' + i + '-' + yyyy), "date": i, "month": getMonthByNum(mm)});
        }

        mm = (mm + 1) % 12;
        if (mm == 0){
            mm++;
        }

        dd = 1;
    }

    return dict;
}