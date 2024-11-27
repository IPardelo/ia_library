(function () {

    "use strict";

    const select = (el, all = false) => {
        el = el.trim()
            if (all) {
                return [...document.querySelectorAll(el)]
            } else {
                return document.querySelector(el)
            }
    }

    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
            if (selectEl) {
                if (all) {
                    selectEl.forEach(e => e.addEventListener(type, listener))
                } else {
                    selectEl.addEventListener(type, listener)
                }
            }
    }

    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    let navbarlinks = select('#navbar .scrollto', true)
        const navbarlinksActive = () => {
        let position = window.scrollY + 200
            navbarlinks.forEach(navbarlink => {
                if (!navbarlink.hash)
                    return
                    let section = select(navbarlink.hash)
                        if (!section)
                            return
                            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                                navbarlink.classList.add('active')
                            } else {
                                navbarlink.classList.remove('active')
                            }
            })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    const scrollto = (el) => {
        let header = select('#header')
            let offset = header.offsetHeight

            let elementPos = select(el).offsetTop
            window.scrollTo({
                top: elementPos - offset,
                behavior: 'smooth'
            })
    }

    let selectHeader = select('#header')
        if (selectHeader) {
            const headerScrolled = () => {
                if (window.scrollY > 100) {
                    selectHeader.classList.add('header-scrolled')
                } else {
                    selectHeader.classList.remove('header-scrolled')
                }
            }
            window.addEventListener('load', headerScrolled)
            onscroll(document, headerScrolled)
        }

        let backtotop = select('.back-to-top')
        if (backtotop) {
            const toggleBacktotop = () => {
                if (window.scrollY > 100) {
                    backtotop.classList.add('active')
                } else {
                    backtotop.classList.remove('active')
                }
            }
            window.addEventListener('load', toggleBacktotop)
            onscroll(document, toggleBacktotop)
        }

        on('click', '.mobile-nav-toggle', function (e) {
            select('#navbar').classList.toggle('navbar-mobile')
            this.classList.toggle('bi-list')
            this.classList.toggle('bi-x')
        })

        on('click', '.navbar .dropdown > a', function (e) {
            if (select('#navbar').classList.contains('navbar-mobile')) {
                e.preventDefault()
                this.nextElementSibling.classList.toggle('dropdown-active')
            }
        }, true)

        on('click', '.scrollto', function (e) {
            if (select(this.hash)) {
                e.preventDefault()

                let navbar = select('#navbar')
                    if (navbar.classList.contains('navbar-mobile')) {
                        navbar.classList.remove('navbar-mobile')
                        let navbarToggle = select('.mobile-nav-toggle')
                            navbarToggle.classList.toggle('bi-list')
                            navbarToggle.classList.toggle('bi-x')
                    }
                    scrollto(this.hash)
            }
        }, true)

        window.addEventListener('load', () => {
            if (window.location.hash) {
                if (select(window.location.hash)) {
                    scrollto(window.location.hash)
                }
            }
        });

    let preloader = select('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove()
        });
    }

    window.addEventListener('load', () => {
        let categoriasContainer = select('#list.categorias');
        if (categoriasContainer) {
            let categoriasIsotope = new Isotope(categoriasContainer, {
                itemSelector: '.categorias-item'
            });

            let categoriasFilters = select('#filters li', true);

            on('click', '#filters li', function (e) {
                e.preventDefault();
                categoriasFilters.forEach(function (el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                categoriasIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
                document.getElementById("list").scrollIntoView({
                    behavior: 'smooth'
                });
            }, true);
        }

    });
	
	function generarFiltros(arrayFiltros, idioma) {
        const divPadre = document.getElementById('filters');

        // Filtro especial 'Todo'
        const contenedor = document.createElement('li');
        contenedor.className = "filter-active";
        contenedor.setAttribute('data-filter', "*");
        contenedor.textContent = idiomaDecoder(idioma, 'filtro.todo');
        divPadre.appendChild(contenedor);

        // Resto de filtros
        for (let i = 0; i < arrayFiltros.length; i++) {
            const contenedor = document.createElement('li');
            contenedor.setAttribute('data-filter', "." + arrayFiltros[i][0]);
			contenedor.textContent = arrayFiltros[i][idiomaDecoder(idioma, 'filtro.posicion')];

            divPadre.appendChild(contenedor);
        }
    }

    function generarLinks(arrayLinks, idioma) {
        const divPadre = document.getElementById('list_container');

        // Lista de webs
        for (let i = 0; i < arrayLinks.length; i++) {
            const contenedor = document.createElement('div');
            contenedor.className = "card categorias-item " + arrayLinks[i][0];

            const nombre = document.createElement('span');
            nombre.className = "card_title";
            nombre.textContent = arrayLinks[i][1];

            const descripcion = document.createElement('p');
            descripcion.className = "card__subtitle";
            descripcion.textContent = arrayLinks[i][idiomaDecoder(idioma, 'webs.descripcion.posicion')];

            const links = document.createElement('a');
            links.className = "button";
            links.textContent = idiomaDecoder(idioma, 'webs.ir');
            links.setAttribute('target', '_blank');
            links.href = arrayLinks[i][2];

            contenedor.appendChild(nombre);
            contenedor.appendChild(descripcion);
            contenedor.appendChild(links);

            divPadre.appendChild(contenedor);
        }
    }

	// Informacion filtro de categoria
	// POS 0 CATEGORIA, POS 1 NOMBRE ES, POS 2 NOMBRE GAL, POS 3 NOMBRE ENG
	const arrayFiltros = [
		["redes",           "Redes Sociales, Marketing, SEO",   "Redes Sociais, Marketing, SEO",    "Social Networks, Marketing, SEO"],
		["imagen",          "Fotos y arte",                     "Fotos e arte",                     "Photos and art"],
		["textovoz",        "Texto a voz",                      "Texto a voz",                      "Text to voice"],
        ["voztexto",        "Voz a texto",                      "Voz a texto",                      "Voice to text"],
        ["textovideo",      "Texto a video", 				    "Texto a video", 					"Text to video"],
        ["buscador",        "Buscador", 						"Buscador", 						"Serch"],
		["multimedia",      "Multimedia", 						"Multimedia", 						"Multimedia"],
		["asistente",       "Asistente",						"Asistente",						"Assistant"],
		["automatizacion",  "Automatización", 					"Automatización", 					"Automation"],
		["programacion",    "Programación", 					"Programación", 					"Programming"],
		["divertido",       "Divertido", 						"Divertido", 						"Funny"],
		["arquitectura",    "Inmobiliaria/Arquitectura", 		"Inmobiliaria/Arquitectura", 		"Architecture"],
		["productividad",   "Productividad", 					"Productividad", 					"Productivity"],
		["datos",           "Análisis de Datos", 				"Análisis de Datos", 				"Data Analysis"],
		["gym",             "Gym y salud", 						"Gym e saúde", 						"Gym and health"]
	];

    // Informacion webs
    // POS 0 CATEGORIA, POS 1 NOMBRE, POS 2 LINK WEB, POS 3 DESCRIPCION ES, POS 4 DESCRIPCION GAL, POS 5 DESCRIPCION ENG
    const arrayLinks = [
        ["programacion",                                    "V0.dev",                   "https://www.v0.dev",                       "Genera interfaces web mediante lenguaje humano", "", ""],
        ["programacion",                                    "Python tutor",             "https://pythontutor.com/",                 "Ver comportamiento de código línea a línea", "", ""],
        ["productividad",                                   "Make workflows",           "https://eu2.make.com/",                    "Crear workflows gratis no code", "", ""],
        ["programacion",                                    "Mixo",                     "https://mixo.io/",                         "Da unha idea e crea a web, logo etc."],
        ["imagen",                                          "Microsoft Designer",       "https://designer.microsoft.com/",          "Genera carteles, imagenes etc e pódense rediseñar",  "", ""],
        ["multimedia imagen textovoz",                      "Endless",                  "https://endless.io/",                      "Convertir imagenes, texto, videos etc.", "", ""],
        ["programacion",                                    "UINiverse",                "https://uiverse.io/",                      "Biblioteca de diseños para webs", "", ""],
		["programacion",                                    "Neumorphism",              "https://neumorphism.io/",                  "Biblioteca y personalizador de diseños para web", "", ""],
		["imagen",                                          "Freepik pikaso",           "https://freepik.com/pikaso/",              "Generador de imágenes con ia. (Marcar AI-promp)", "", ""],
		["imagen",                                          "Perchance",                "https://perchance.org/welcome/",           "Generador de imágenes con ia.", "", ""],
		["imagen",                                          "Meshy",                    "https://meshy.ai/",                        "Crear modelos 3D con lenguaje humano", "", ""],
		["programacion",                                    "Get Lazy",                 "https://getlazy.ai/",                      "Crear programas web con lenguaje humano", "", ""],
		["multimedia",                                      "Jitter video",             "https://jitter.video/",                    "Crea animaciones", "", ""],
		["imagen",                                          "Recraft",                  "https://www.recraft.ai/",                  "Crea sets de iconos", "", ""],
        ["textovoz",                                        "TTS Maker",                "https://ttsmaker.com/",                    "Texto a voz", "", ""],
        ["textovoz",                                        "Uberduck",                 "https://www.uberduck.ai/",                 "Texto a voz", "", ""],
        ["voztexto",                                        "Adobe Podcast",            "https://podcast.adobe.com/",               "Grabación y edición de audio impulsado por IA, todo en la web.", "", ""],
        ["productividad",                                   "GPTionary",                "https://gptionary.com/",                   "Diccionario de sinónimos",  "", ""],
        ["productividad",                                   "Chat gpt writer",          "https://chatgptwriter.ai/",                "Extensión gratuita de Chrome que utiliza ChatGPT para resumir artículos en la web.", "", ""],
        ["voztexto buscador",                               "Fathom.fm",                "https://hello.fathom.fm/",                 "Recomendaciones, busque dentro de podcasts, lea transcripciones, navegue por episodios usando capítulos y mucho más. ¡Es una forma completamente nueva de experimentar los podcasts!", "", ""],
        ["voztexto productividad",                          "Neurospell",               "https://neurospell.com/",                  "Autocorrector ortográfico y gramatical basado en Deep Learning. Disponible en más de 30 idiomas. ", "", ""],
        ["voztexto",                                        "Steno",                    "https://www.steno.ai/",                    "Tus podcasts favoritos transcritos en su totalidad. Descubre, consulta y lee mientras los escuchas.", "", ""],
        ["textovoz buscador",                               "Ask my book",              "https://askmybook.com",                    "Experimento de IA creado por Sahil Lavingia, para hacer que su libro sea más accesible. Puedes usar Ask My Book para hacer una pregunta y obtener una respuesta en su voz.", "", ""],
        ["textovideo",                                      "Genmo AI",                 "https://www.genmo.ai/",                    "Genmo ofrece generación de videos fantásticos con IA. También puedes ver videos generados por la comunidad.", "", ""],
        ["productividad",                                   "GPT Sheets",               "https://workspace.google.com/marketplace/app/gpt_for_sheets/677318054654",     "Similar a ChatGPT, pero en Google Sheets. Obtén ayuda con la inspiración, categorización, traducción, corrección, resumen con la función GPT.", "", ""],
        ["redes",                                           "ECommerce Prompt Gen.",    "https://www.ecommerceprompts.com/",        "Recetas listas para usar de ChatGPT creadas por ingenieros rápidos para ayudarlo a configurar su tienda y campañas de marketing rápidamente", "", ""],
        ["redes",                                           "ProductBot",               "https://www.getproduct.help/",             "Recomendador y experto en productos de IA que ayuda a los usuarios a tomar decisiones de compra. Los usuarios pueden especificar sus necesidades y la herramienta sugerirá productos relacionados.", "", ""],
        ["imagen",                                          "Tattoos AI",               "https://www.tattoosai.com/",               "Diseña tu tatuajecon IA", "", ""],
        ["productividad",                                   "Wisdolia",                 "https://jungleai.com/es/",                 "Una extensión de Chrome que usa IA para generar tarjetas didácticas (con preguntas y respuestas) para cualquier artículo/PDF para que puedas arraigar mejor lo que lees.", "", ""],
        ["productividad",                                   "Tutor AI",                 "https://tutorai.me/",                      "Plataforma de aprendizaje impulsada por IA. Puedes ingresar cualquier tema y te proporcionará varias opciones que puedes usar para aprender sobre ese tema.", "", ""],
        ["productividad",                                   "Transvribe",               "https://www.transvribe.com/",              "Diseñado para hacer que el aprendizaje en YouTube sea 10 veces más productivo.", "", ""],
        ["productividad",                                   "Teach Anything",           "https://www.teach-anything.com/",          "Encuentra rápidamente respuestas a preguntas sobre cualquier tema. Tienes que escribir tus preguntas, elegir un idioma y el nivel de dificultad. Después de eso, obtendrás la respuesta.", "", ""],
        ["productividad buscador",                          "PaperBrain",               "https://www.paperbrain.org/",              "Una plataforma para que pueda acceder y comprender los trabajos de investigación. Con resúmenes en papel y enlaces directos en pdf, nunca más tendrá que luchar con descargas tediosas.", "", ""],
        ["productividad",                                   "Grammar GPT",              "https://www.grammar-gpt.com",              "Una inteligencia artificial puede corregir los errores gramaticales de un texto de manera gratuita.", "", ""],
        ["productividad",                                   "GPTZero",                  "https://gptzero.me/",                      "Detector de contenido de IA que puede clasificar textos humanos y generados por IA junto con contenido mixto. La herramienta ha aparecido en CNBC, CNN y más.", "", ""],
        ["productividad",                                   "Doctrina AI",              "https://www.doctrina.ai/",                 "Diseñado para ayudar a los estudiantes y niños a estudiar mejor y adaptarse a los nuevos desafíos del aprendizaje remoto y en línea.", "", ""],
        ["productividad",                                   "VenturusAI",               "https://venturusai.com/",                  "Herramienta para evaluar ideas de negocios y le brinda retroalimentación y análisis integral sobre cómo hacerlo exitoso", "", ""],
        ["productividad",                                   "Namy AI",                  "https://namy.ai/",                         "Herramienta simple para generar algunas ideas de nombres de dominio para su negocio o marca. ", "", ""],
        ["productividad",                                   "Naming Magic",             "https://www.namingmagic.com/",             "Deje que GPT-3 haga una lluvia de ideas sobre los nombres de su empresa o producto y encuentre los nombres de dominio disponibles.", "", ""],
        ["productividad",                                   "NameWizard AI",            "https://namewizard.ai/",                   "Permite crear un nombre generado por IA para su idea/proyecto/inicio.", "", ""],
        ["productividad",                                   "Magic Form",               "https://www.magicform.ai/",                "Capacite a su propio vendedor de IA en menos de 3 minutos para generar confianza y aumentar las conversiones de su sitio en un 20 % a través de conversaciones en tiempo real.", "", ""],
        ["mutimedia",                                       "Songr.ai",                 "https://www.songr.ai/",                    "Hacer canciones",  "", ""],
        ["mutimedia",                                       "Suno",                     "https://suno.com/",                        "Hacer canciones",  "", ""],
        ["productividad",                                   "Rephraser AI",             "https://ahrefs.com/writing-tools/paraphrasing-tool",   "Reformule el texto usando AI,",  "", ""],
        ["productividad redes",                             "Optimo",                   "https://askoptimo.com/",                   "Programa de marketing gratuito impulsado por IA que simplifica y acelera el proceso de marketing", "", ""],
        ["productividad redes",                             "Harpa.ai",                 "https://harpa.ai/",                        "Extensión de Chrome y una plataforma NoCode RPA impulsada por IA que ahorra tiempo y dinero al automatizar tareas en la web para usted.", "", ""],
        ["productividad",                                   "Finding Words",            "https://www.empathy.com/",                 "Creador de obituarios de IA por Empathy. Crear un tributo significativo a su ser querido puede ser una tarea difícil y emotiva. Con Finding Words de Empathy, simplemente puede responder una serie de preguntas y nuestra IA redactará un obituario en su honor.", "", ""],
        ["productividad redes imagen",                      "Cowriter",                 "https://cowriter.org/login",               "Generar publicaciones creativas en blogs, ensayos, titulares, imágenes o cualquier otro contenido en minutos, todo optimizado especialmente para el marketing y el uso creativo.", "", ""],
        ["productividad redes imagen",                      "Jounce AI",                "https://www.jounce.ai/",                   "Redacción de textos publicitarios y el material gráfico", "", ""],
        ["productividad redes imagen multimedia textovoz",  "Hugging face",             "https://huggingface.co/",                  "Página multiherramienta", "", ""],
        ["productividad redes imagen multimedia voztexto",  "Lecture",                  "https://lecture.new",                      "Transform your PDFs, PowerPoints, YouTube videos, lectures, textbook, and class notes into trusted study tools.", "", ""],
        ["productividad redes imagen multimedia textovoz",  "TinyWow",                  "https://tinywow.com/",                     "Herramientas de utilidad impulsadas por IA para hacer su vida más fácil. Las herramientas más comunes incluyen PDF, video, imagen, escritura AI y herramientas de conversión.", "", ""],
        ["programacion",                                    "OSS Insight",              "https://ossinsight.io/explore/",           "Herramienta de consulta impulsada por GPT para la exploración de datos en vivo de GitHub. Simplemente haga su pregunta en lenguaje natural y Data Explore generará SQL, consultará los datos y presentará los resultados visualmente.", "", ""],
        ["programacion",                                    "AI Data Sidekick",         "https://www.airops.com/",                  "Escribe SQL, documentación y más x10 veces más rápido con nuestra colección de potentes recetas. Gratis para individuos y pequeños equipos.", "", ""],
        ["datos",                                           "LAION",                    "https://laion.ai/",                        "Proporciona conjuntos de datos, herramientas y modelos para liberar la investigación del aprendizaje automático.", "", ""],
        ["imagen",                                          "Artsmart.ai",              "https://artsmart.ai/",                     "Generación de imágenes de arte de IA hasta avatares de IA", "", ""],
        ["imagen",                                          "Character AI",             "https://character.ai/",                    "Bots de chat superinteligentes que te escuchan, te entienden y te recuerdan",  "", ""],
        ["imagen",                                          "Caricaturer.io",           "https://www.caricaturer.io/",              "Convertir sus imágenes regulares en caricaturaS", "", ""],
        ["imagen",                                          "Creative Reality Studio",  "https://studio.d-id.com/",                 "Convertirá tu visión en un avatar parlante en cuestión de segundos.", "", ""],
        ["imagen",                                          "Imagetocartoon",           "https://imagetocartoon.com/",              "Creador de avatares que utiliza inteligencia artificial para convertir tus fotos en versiones de dibujos animados. ", "", ""],
        ["imagen",                                          "Kinetix",                  "https://www.kinetix.tech/",                "Crear animaciones en 3D", "", ""],
        ["imagen",                                          "Vidext",                   "https://www.vidext.io/es",                 "Estudio de producción totalmente en línea que transforma textos y documentos en videos atractivos en todos los idiomas", "", ""],
        ["imagen",                                          "Vana Portrait",            "https://portrait.vana.com/",               "Crear autorretratos tuyos en infinitos estilos.", "", ""],
        ["imagen",                                          "Alethea",                  "https://alethea.ai/",                      "Permite la creación de NFT interactivos e inteligentes (iNFT).", "", ""],
        ["imagen",                                          "Luma AI",                  "https://lumalabs.ai/dream-machine",        "Captura en 3D realista. Fotorrealismo, reflejos y detalles inigualables. ¡El futuro de VFX es ahora, para todos!", "", ""],
        ["imagen",                                          "Pixela AI",                "https://pixela.ai/",                       "Texturas de Juegos Generadas por IA. ¡Sube tu textura generada para compartir con la comunidad!", "", ""],
        ["multimedia",                                      "SplashMusic",              "https://www.splashmusic.com/",             "Crear musica", "", ""],
        ["imagen",                                          "Pixelate",                 "https://www.scenario.com/features/pixelate",   "Conversor de arte de imagen a píxelart", "", ""],
        ["divertido",                                       "Booom.ai",                 "https://joinplayroom.com/games/booom/",    "Genere un divertido juego de trivia que pueda jugar en torno a un tema ingresado. Puedes jugar solo o con amigos.", "", ""]
    ];

    // Internacionalizacion general
    // POS 0 ID, POS 1 ES, POS 2 GAL, POS 3 ENG
    const arrayInternacionalizacion = [
        {id: 'filtro.todo',                     es: "Todo",                                 gl: "Todo",                             en: "All"},
        {id: 'filtro.posicion',                 es: 1,                                      gl: 2,                                  en: 3},
        {id: 'webs.descripcion.posicion',       es: 3,                                      gl: 4,                                  en: 5},
        {id: 'webs.ir',                         es: "IR",                                   gl: "IR",                               en: "GO"},
        {id: 'titulo.categoria',                es: "Categorías",                           gl: "Categorías",                       en: "Categories"},
        {id: 'titulo.creditos',                 es: "por IPardelo",                         gl: "por IPardelo",                     en: "by IPardelo"},
        {id: 'piepagina.creditos',              es: "Diseñado por Ismael Castiñeira",       gl: "Deseñado por Ismael Castiñeira",   en: "Designed by Ismael Castiñeira"}
    ];

    // Decodificador de idioma
    function idiomaDecoder(idioma, id) {
        const posicion = arrayInternacionalizacion.findIndex(tarea => tarea.id === id);
        if (idioma == "es") {
            return arrayInternacionalizacion[posicion].es;
        } else if (idioma == "en") {
            return arrayInternacionalizacion[posicion].en;
        } else {
            return arrayInternacionalizacion[posicion].gl;
        }
    }

    // Funcion para cambio de idioma
    function cambioIdioma(idioma) {
        generarFiltros(arrayFiltros, idioma);
        generarLinks(arrayLinks, idioma);
        document.getElementById("title").innerHTML = idiomaDecoder(idioma, 'titulo.categoria');
        document.getElementById("credits").innerHTML = idiomaDecoder(idioma, 'piepagina.creditos');
        document.getElementById("banner").innerHTML = idiomaDecoder(idioma, 'titulo.creditos');
        document.getElementById("bannerHover").innerHTML = idiomaDecoder(idioma, 'titulo.creditos');
    }

    // Listener para os iconos da bandeiras
    const imagenes = document.querySelectorAll('img');
    imagenes.forEach(imagen => {
      imagen.addEventListener('click', () => {
        const padre1 = document.getElementById('filters');
        const padre2 = document.getElementById('list_container');
        while (padre1.firstChild) {
            padre1.removeChild(padre1.firstChild);
        }
        while (padre2.firstChild) {
            padre2.removeChild(padre2.firstChild);
        }
        cambioIdioma(imagen.id.toString());
      });
    });

    // Cando cargue o documento cargamos o idioma
    window.addEventListener('load', function() {
        const idioma = "es";
        cambioIdioma(idioma);
    });

})()
