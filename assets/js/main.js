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
		["texto", "Texto"],
		["video", "Audio e video"],
		["asistente", "Asistente"],
		["automatizacion", "Automatización"],
		["programacion", "Programación"],
		["divertido", "Divertido"],
		["api", "API"],
		["investigacion", "Investigación"],
		["arquitectura", "Inmobiliaria/Arquitectura"],
		["productividad", "Productividad"],
		["finanzas", "Finanzas"],
		["datos", "Análisis de Datos"],
		["legal", "Legal y copywriting"],
		["gym", "Gym"],
		["educacion", "Educación"]
	];

    // Informacion webs
    // POS 0 CATEGORIA, POS 1 NOMBRE, POS 2 DESCRIPCION, POS 3 LINK WEB
    const arrayLinks = [
        ["programacion", "V0.dev", "Genera interfaces web mediante lenguaje humano", "https://www.v0.dev"],
        ["programacion", "Python tutor", "Ver comportamiento de código línea a línea", "https://pythontutor.com/"],
        ["productividad", "Make workflows", "Crear workflows gratis no code", "https://eu2.make.com/"],
        ["programacion", "Mixo", "Da unha idea e crea a web, logo etc.", "https://mixo.io/"],
        ["imagen", "Microsoft Designer", "Genera carteles, imagenes etc e pódense rediseñar", "https://designer.microsoft.com/"],
        ["video imagen texto", "Endless", "Convertir imagenes, texto, videos etc.", "https://endless.io/"],
        ["programacion", "UINiverse", "Biblioteca de diseños para webs", "https://uiverse.io/"],
        ["", "Hugging face", "Página multiherramienta", "https://huggingface.co/"],
		["programacion", "Neumorphism", "Biblioteca y personalizador de diseños para web", "https://neumorphism.io/"],
		["imagen", "Freepik pikaso", "Generador de imágenes con ia. (Marcar AI-promp)", "https://freepik.com/pikaso/"],
		["imagen", "Perchance", "Generador de imágenes con ia.", "https://perchance.org/welcome/"],
		["imagen", "Meshy", "Crear modelos 3D con lenguaje humano", "https://meshy.ai/"],
		["programacion", "Get Lazy", "Crear programas web con lenguaje humano", "https://getlazy.ai/"],
		["video", "Jitter video", "Crea animaciones", "https://jitter.video/"],
		["imagen", "Recraft", "Crea sets de iconos", "https://www.recraft.ai/"]
    ];

	generarFiltros(arrayFiltros);
    generarLinks(arrayLinks);

})()
