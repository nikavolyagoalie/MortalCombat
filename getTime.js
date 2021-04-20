//устанавливаем время(c учетом нуля впепеди если вдруг меньше 10 значение)
export const getTime = () => {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    // Hour
    const HH = ("0" + hours).slice(-2);
    // Minutes
    const mm = ("0" + minutes).slice(-2);
    // Seconds
    const ss = ("0" + seconds).slice(-2);

    return `${HH} : ${mm} : ${ss}`;
}