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
	
	function generarFiltros(arrayFiltros) {
        const divPadre = document.getElementById('filters');

        for (let i = 0; i < arrayFiltros.length; i++) {
            const contenedor = document.createElement('li');
            contenedor.setAttribute('data-filter', "." + arrayFiltros[i][0]);
			contenedor.textContent = arrayFiltros[i][1];

            divPadre.appendChild(contenedor);
        }
    }

    function generarLinks(arrayLinks) {
        const divPadre = document.getElementById('list_container');

        for (let i = 0; i < arrayLinks.length; i++) {
            const contenedor = document.createElement('div');
            contenedor.className = "card categorias-item " + arrayLinks[i][0];

            const nombre = document.createElement('span');
            nombre.className = "card_title";
            nombre.textContent = arrayLinks[i][1];

            const descripcion = document.createElement('p');
            descripcion.className = "card__subtitle";
            descripcion.textContent = arrayLinks[i][2];

            const links = document.createElement('a');
            links.className = "button";
            links.textContent = "IR";
            links.setAttribute('target', '_blank');
            links.href = arrayLinks[i][3];

            contenedor.appendChild(nombre);
            contenedor.appendChild(descripcion);
            contenedor.appendChild(links);

            divPadre.appendChild(contenedor);
        }
    }

	// Informacion filtro de categoria
	// POS 0 CATEGORIA, POS 1 NOMBRE
	const arrayFiltros = [
		["redes", "Redes Sociais, Marketing, SEO"],
		["imagen", "Fotos e arte"],
		["textovoz", "Texto a voz"],
        ["voztexto", "Voz a texto"],
        ["textovideo", "Texto a video"],
        ["buscador", "Buscador"],
		["multimedia", "Multimedia"],
		["asistente", "Asistente"],
		["automatizacion", "Automatización"],
		["programacion", "Programación"],
		["divertido", "Divertido"],
		["api", "API"],
		["arquitectura", "Inmobiliaria/Arquitectura"],
		["productividad", "Productividad"],
		["finanzas", "Finanzas"],
		["datos", "Análisis de Datos"],
		["legal", "Legal y copywriting"],
		["gym", "Gym"]
	];

    // Informacion webs
    // POS 0 CATEGORIA, POS 1 NOMBRE, POS 2 DESCRIPCION, POS 3 LINK WEB
    const arrayLinks = [
        ["programacion",                "V0.dev",               "Genera interfaces web mediante lenguaje humano", "https://www.v0.dev"],
        ["programacion",                "Python tutor",         "Ver comportamiento de código línea a línea", "https://pythontutor.com/"],
        ["productividad",               "Make workflows",       "Crear workflows gratis no code", "https://eu2.make.com/"],
        ["programacion",                "Mixo",                 "Da unha idea e crea a web, logo etc.", "https://mixo.io/"],
        ["imagen",                      "Microsoft Designer",   "Genera carteles, imagenes etc e pódense rediseñar", "https://designer.microsoft.com/"],
        ["multimedia imagen textovoz",  "Endless",              "Convertir imagenes, texto, videos etc.", "https://endless.io/"],
        ["programacion",                "UINiverse",            "Biblioteca de diseños para webs", "https://uiverse.io/"],
		["programacion",                "Neumorphism",          "Biblioteca y personalizador de diseños para web", "https://neumorphism.io/"],
		["imagen",                      "Freepik pikaso",       "Generador de imágenes con ia. (Marcar AI-promp)", "https://freepik.com/pikaso/"],
		["imagen",                      "Perchance",            "Generador de imágenes con ia.", "https://perchance.org/welcome/"],
		["imagen",                      "Meshy",                "Crear modelos 3D con lenguaje humano", "https://meshy.ai/"],
		["programacion",                "Get Lazy",             "Crear programas web con lenguaje humano", "https://getlazy.ai/"],
		["multimedia",                  "Jitter video",         "Crea animaciones", "https://jitter.video/"],
		["imagen",                      "Recraft",              "Crea sets de iconos", "https://www.recraft.ai/"],
        ["textovoz",                    "TTS Maker",            "Texto a voz", "https://ttsmaker.com/"],
        ["textovoz",                    "Uberduck",             "Texto a voz", "https://www.uberduck.ai/"],
        ["voztexto",                    "Adobe Podcast",        "Grabación y edición de audio impulsado por IA, todo en la web.", "https://podcast.adobe.com/"],
        ["productividad",               "GPTionary",            "Diccionario de sinónimos", "https://gptionary.com/"],
        ["productividad",               "Chat gpt writer",      "extensión gratuita de Chrome que utiliza ChatGPT para resumir artículos en la web.", "https://chatgptwriter.ai/"],
        ["voztexto buscador",           "Fathom.fm",            "Obtenga recomendaciones sorprendentes, comparta sus clips favoritos, busque dentro de podcasts, lea transcripciones, navegue por episodios usando capítulos y mucho más. ¡Es una forma completamente nueva de experimentar los podcasts!", "https://hello.fathom.fm/"],
        ["voztexto productividad",      "Neurospell",           "NeuroSpell es un autocorrector ortográfico y gramatical basado en Deep Learning. Disponible en más de 30 idiomas. Incluye dictáfono (voz a texto) para todos los idiomas. Puede ser entrenado para vocabulario y frases específicas en el dominio, y correcciones de errores específicas. Otras características incluyen - Optimización de carga humana en el circuito. Mejora/enriquecimiento del flujo de texto. Ayuda de escritura. Corrección de RPA. Enriquecimiento de entradas de flujo de trabajo del cliente. Mejora de voz a texto. Corrección de errores de OCR.", "https://neurospell.com/"],
        ["voztexto",                    "Steno",                "Tus podcasts favoritos, transcritos en su totalidad Descubre, consulta y lee mientras los escuchas.", "https://www.steno.ai/"],
        ["textovoz buscador",           "Ask my book",          "Ask My Book es un experimento de IA creado por Sahil Lavingia, el fundador de Gumroad, para hacer que su libro sea más accesible. Puedes usar Ask My Book para hacer una pregunta y obtener una respuesta en su voz.", "https://askmybook.com"],
        ["textovideo",                  "Genmo AI",             "Genmo ofrece generación de videos fantásticos con IA. También puedes ver videos generados por la comunidad.", "https://www.genmo.ai/"],
        ["productividad",               "GPT Sheets",           "Similar a ChatGPT, pero en Google Sheets. Obtén ayuda con la inspiración, categorización, traducción, corrección, resumen con la función GPT.", "https://workspace.google.com/marketplace/app/gpt_for_sheets/677318054654"],
        ["redes",                       "ECommerce Prompt Gen.", "Recetas listas para usar de ChatGPT creadas por ingenieros rápidos para ayudarlo a configurar su tienda y campañas de marketing rápidamente", "https://www.ecommerceprompts.com/"],
        ["redes",                       "ProductBot",           "ProductBot es un recomendador y experto en productos de IA que ayuda a los usuarios a tomar decisiones de compra. Los usuarios pueden especificar sus necesidades y la herramienta sugerirá productos relacionados.", "https://www.getproduct.help/"],
        ["imagen",                      "Tattoos AI",           "Diseña tu tatuajecon IA", "https://www.tattoosai.com/"],
        ["productividad",               "Wisdolia",             "Una extensión de Chrome que usa IA para generar tarjetas didácticas (con preguntas y respuestas) para cualquier artículo/PDF para que puedas arraigar mejor lo que lees.", "https://jungleai.com/es/"],
        ["productividad",               "Tutor AI",             "Tutor AI es una plataforma de aprendizaje impulsada por IA. Puedes ingresar cualquier tema y te proporcionará varias opciones que puedes usar para aprender sobre ese tema.", "https://tutorai.me/"],
        ["productividad",               "Transvribe",           "Transvribe está diseñado para hacer que el aprendizaje en YouTube sea 10 veces más productivo. Utiliza incrustaciones de IA para permitir a los usuarios buscar cualquier video y también permite a los usuarios pegar una URL de YouTube para realizar su primera búsqueda.", "https://www.transvribe.com/"],
        ["productividad",               "Teach Anything",       "Encuentra rápidamente respuestas a preguntas sobre cualquier tema. Tienes que escribir tus preguntas, elegir un idioma y el nivel de dificultad. Después de eso, obtendrás la respuesta.", "https://www.teach-anything.com/"],
        ["productividad buscador",      "PaperBrain",           "Una plataforma para que pueda acceder y comprender los trabajos de investigación. Con resúmenes en papel y enlaces directos en pdf, nunca más tendrá que luchar con descargas tediosas. Construido con un asistente GPT para ayudarlo todo el tiempo.", "https://www.paperbrain.org/"],
        ["productividad",               "Grammar GPT",          "Una inteligencia artificial puede corregir los errores gramaticales de un texto de manera gratuita.", "https://www.grammar-gpt.com"],
        ["productividad",               "GPTZero",              "GPTZero es un simple detector de contenido de IA que puede clasificar textos humanos y generados por IA junto con contenido mixto. La herramienta ha aparecido en CNBC, CNN y más.", "https://gptzero.me/"],
        ["productividad",               "Doctrina AI",          "diseñado para ayudar a los estudiantes y niños a estudiar mejor y adaptarse a los nuevos desafíos del aprendizaje remoto y en línea.", "https://www.doctrina.ai/"],
        ["productividad",               "VenturusAI",           "herramienta para evaluar ideas de negocios y le brinda retroalimentación y análisis integral sobre cómo hacerlo exitoso", "https://venturusai.com/"],
        ["productividad",               "Namy AI",              "herramienta simple para generar algunas ideas de nombres de dominio para su negocio o marca. ", "https://namy.ai/"],
        ["productividad",               "Naming Magic",         "Deje que GPT-3 haga una lluvia de ideas sobre los nombres de su empresa o producto y encuentre los nombres de dominio disponibles.", "https://www.namingmagic.com/"],
        ["productividad",               "NameWizard AI",        "Namewizard le permite crear un nombre generado por IA para su idea/proyecto/inicio.", "https://namewizard.ai/"],
        ["productividad",               "Magic Form",           "Capacite a su propio vendedor de IA en menos de 3 minutos para generar confianza y aumentar las conversiones de su sitio en un 20 % a través de conversaciones en tiempo real.", "https://www.magicform.ai/"],
        ["mutimedia",                   "Songr.ai",             "Hacer canciones", "https://www.songr.ai/"],
        ["mutimedia",                   "Suno",                 "Hacer canciones", "https://suno.com/"],
        ["productividad",               "Rephraser AI",         "Reformule el texto usando AI,", "https://ahrefs.com/writing-tools/paraphrasing-tool"],
        ["productividad redes",         "Optimo",               "programa de marketing gratuito impulsado por IA que simplifica y acelera el proceso de marketing", "https://askoptimo.com/"],
        ["productividad redes",         "Harpa.ai",             "HARPA AI es una extensión de Chrome y una plataforma NoCode RPA impulsada por IA que ahorra tiempo y dinero al automatizar tareas en la web para usted.Proporciona respuestas de IA a consultas de búsqueda, resume páginas web, extrae datos estructurales, rastrea precios de productos y disponibilidad de stock, monitorea artículos y legislaciones, detecta cambios en la competencia.HARPA AI utiliza un motor de IA híbrido construido sobre ChatGPT y su propio aprendizaje automático para realizar estas tareas de automatización web", "https://harpa.ai/"],
        ["productividad",               "Finding Words",        "Creador de obituarios de IA por Empathy. Crear un tributo significativo a su ser querido puede ser una tarea difícil y emotiva. Con Finding Words de Empathy, simplemente puede responder una serie de preguntas y nuestra IA redactará un obituario en su honor.", "https://www.empathy.com/"],
        ["productividad redes imagen",  "Cowriter",             "generar publicaciones creativas en blogs, ensayos, titulares, imágenes o cualquier otro contenido en minutos, todo optimizado especialmente para el marketing y el uso creativo.", "https://cowriter.org/login"],
        ["productividad redes imagen",  "Jounce AI",            "redacción de textos publicitarios y el material gráfico", "https://www.jounce.ai/"],
        ["productividad redes imagen multimedia textovoz", "Hugging face", "Página multiherramienta", "https://huggingface.co/"],
        ["productividad redes imagen multimedia voztexto", "Lecture", "Transform your PDFs, PowerPoints, YouTube videos, lectures, textbook, and class notes into trusted study tools.", "https://lecture.new"],
        ["productividad redes imagen multimedia textovoz", "TinyWow", "Herramientas de utilidad impulsadas por IA para hacer su vida más fácil. Las herramientas más comunes incluyen PDF, video, imagen, escritura AI y herramientas de conversión.", "https://tinywow.com/"],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""]
    ];

	generarFiltros(arrayFiltros);
    generarLinks(arrayLinks);

})()
