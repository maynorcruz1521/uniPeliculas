const peli = document.querySelector(".container");
const moreder = document.querySelector(".mostrarder");
const moreizq = document.querySelector(".mostrarizq");
let contador = 1;

const cargarPeliculas = async (urls) => {
  try {
    const respuesta = await fetch(urls);

    // Si la respuesta es correcta
    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      let peliculas = "";
      datos.results.forEach((pelicula) => {
        console.log(pelicula);
        peliculas += `
					<div class="pelicula">
					  <a href="uniseries2.html?id=${pelicula.id}"> 
            	<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"  ></a>
					</div>
				`;
      });
      peli.innerHTML = peliculas;
    } else if (respuesta.status === 401) {
      console.log("Pusiste la llave mal");
    } else if (respuesta.status === 404) {
      console.log("La pelicula que buscas no existe");
    } else {
      console.log("Hubo un error y no sabemos que paso");
    }
  } catch (error) {
    console.log(error);
  }
};

cargarPeliculas(`
https://api.themoviedb.org/3/tv/popular?api_key=192e0b9821564f26f52949758ea3c473&language=en-US&page=${contador}`);

moreder.addEventListener("click", () => {
  contador++;
  let url = `
https://api.themoviedb.org/3/tv/popular?api_key=192e0b9821564f26f52949758ea3c473&language=en-US&page=${contador}`;
  cargarPeliculas(url);
  console.log(contador);
});

moreizq.addEventListener("click", () => {
  if (contador > 1) {
    console.log(contador);
    contador--;
    let url = `
https://api.themoviedb.org/3/tv/popular?api_key=192e0b9821564f26f52949758ea3c473&language=en-US&page=${contador}`;
    cargarPeliculas(url);
  }
});
