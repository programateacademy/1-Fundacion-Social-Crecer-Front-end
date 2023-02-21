export const titleCase = (text) => {
    const separeText = text.split(' ');
    const arr = []
    if(text === '') return ''
    separeText.forEach(element => arr.push(element[0].toUpperCase() + element.substring(1).toLowerCase()));
    
    return arr.join(' '); 
}
export const isAdult = (age) => {
    if(age < 0){return null}

    return age >= 18 ? true : false;     
}

export const SampleTest = () => {
  return (
    <div>SampleTest</div>
  )
}