document.addEventListener("DOMContentLoaded", function() {
    // Cargar la fuente Creepster desde Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Creepster&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const container = document.createElement('div');
    container.style.position = 'fixed'; // Cambiado a 'fixed' para asegurar que ocupe toda la pantalla
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.backgroundImage = 'url("Pantallainicio.png")'; // Fondo de la imagen Pantallainicio.png
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center'; // Centrar la imagen de fondo
    container.style.overflow = 'hidden'; // Asegurar que no haya scroll
    document.body.appendChild(container);

    const startButton = document.createElement('button');
    startButton.textContent = 'Comenzar';
    startButton.style.position = 'absolute';
    startButton.style.top = '50%';
    startButton.style.left = '50%';
    startButton.style.transform = 'translate(-50%, -50%)';
    startButton.style.padding = '20px 40px'; // Ajusta el padding para hacer el botón más grande
    startButton.style.fontSize = '24px'; // Ajusta el tamaño de la fuente del botón
    startButton.style.cursor = 'pointer';
    startButton.style.backgroundColor = '#800080'; // Morado obscuro
    startButton.style.color = 'white'; // Letras blancas
    startButton.style.border = 'none';
    startButton.style.borderRadius = '5px';
    startButton.style.transition = 'background-color 0.3s';
    startButton.style.fontFamily = 'Creepster, sans-serif'; // Aplica la misma fuente de estilo de terror
    startButton.addEventListener('click', function() {
        // Ocultar la pantalla de inicio
        container.style.display = 'none';
        // Cargar y ejecutar el script main.js
        const script = document.createElement('script');
        script.src = 'main.js';
        document.body.appendChild(script);
    });
    container.appendChild(startButton);

    const title = document.createElement('h1');
    title.textContent = 'Daemonópolis';
    title.style.position = 'absolute';
    title.style.top = '20px'; // Ajusta la posición superior
    title.style.left = '20px'; // Ajusta la posición izquierda
    title.style.color = '#8B0000'; // Color vino (DarkRed)
    title.style.fontFamily = 'Creepster, sans-serif'; // Aplica una fuente de estilo de terror
    title.style.fontSize = '72px'; // Tamaño del texto más grande
    container.appendChild(title);
});
