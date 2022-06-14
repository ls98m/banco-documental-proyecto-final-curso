const getProfesores = async () => {
    let res = await fetch('/getProfesores');
    if(res.ok){
      let profesores = await res.json();
      return profesores.data;
    } else {
     return false;
    };
}

export {getProfesores}