export default function getSecondsAndMinutes(time:number){
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;

    return `${minutes} دقیقه و ${seconds} ثانیه`
}