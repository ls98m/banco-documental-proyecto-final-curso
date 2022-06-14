async function getAlumnos() {
    const response = await fetch('/getAlumnos');
    if (response.ok) {
      const info = await response.json();
      const alumnos = info.data
      return alumnos;
    }
  }

  export {getAlumnos}