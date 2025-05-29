// Encapsulamento para evitar poluição global
(() => {
  const container = document.querySelector('.container');
  const qrCodeBtn = document.querySelector('#qr-form button');
  const qrCodeInput = document.querySelector('#qr-form input');
  const qrCodeImg = document.querySelector('#qr-code img');
  const suggestionsContainer = document.querySelector('#suggestions-container');

  const QR_CODE_API = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data='; 

  // ***** IMPORTANTE: SUBSTITUA 'SUA_CHAVE_AQUI' PELA SUA CHAVE DE API REAL DA PEXELS *****
  const PEXELS_API_KEY = '6slbwONFx9VWKo9UkqpyOTRROUhVX7chJdLYni5okwybsIfpkW2maoY8'; 
  const PEXELS_API_URL = 'https://api.pexels.com/v1/search';

  // Lista de 100 sugestões de viagens pelo mundo
  const travelSuggestions = [
    { text: "Visite a majestosa **Torre Eiffel em Paris, França**!", search: "Eiffel Tower Paris landmark" },
    { text: "Explore a antiga cidade de **Roma e o Coliseu, Itália**.", search: "Colosseum Rome landmark" },
    { text: "Admire a beleza mística do **Taj Mahal em Agra, Índia**.", search: "Taj Mahal Agra landmark" },
    { text: "Perca-se nas ruas vibrantes de **Tóquio, Japão**.", search: "Tokyo city tourism" },
    { text: "Descubra a grandiosidade da **Grande Muralha da China**.", search: "Great Wall of China landmark" },
    { text: "Aventure-se na incrível vida selvagem da **Serengeti, Tanzânia**.", search: "Serengeti National Park wildlife" },
    { text: "Encante-se com a arquitetura e canais de **Veneza, Itália**.", search: "Venice canals tourism" },
    { text: "Explore as pirâmides de **Gizé no Egito**.", search: "Pyramids of Giza Egypt landmark" },
    { text: "Maravilhe-se com a energia de **Nova York, EUA** e a Estátua da Liberdade.", search: "Statue of Liberty New York City" },
    { text: "Relaxe nas praias paradisíacas de **Bali, Indonésia**.", search: "Bali beach tourism" },
    { text: "Conheça as ruínas de **Machu Picchu no Peru**.", search: "Machu Picchu Peru landmark" },
    { text: "Explore a vibrante cultura de **Barcelona, Espanha** e a Sagrada Família.", search: "Sagrada Familia Barcelona" },
    { text: "Descubra a beleza natural da **Grande Barreira de Coral, Austrália**.", search: "Great Barrier Reef Australia nature" },
    { text: "Passeie pela histórica cidade de **Praga, República Tcheca**.", search: "Prague old town tourism" },
    { text: "Vivencie a magia da **Disney World em Orlando, EUA**.", search: "Disney World Orlando theme park" },
    { text: "Explore a beleza arquitetônica de **Istambul, Turquia** e a Hagia Sophia.", search: "Hagia Sophia Istanbul" },
    { text: "Aventure-se nos fiordes deslumbrantes da **Noruega**.", search: "Norway fjords nature" },
    { text: "Descubra os templos antigos de **Siem Reap e Angkor Wat, Camboja**.", search: "Angkor Wat Cambodia temples" },
    { text: "Relaxe nas ilhas vulcânicas de **Santorini, Grécia**.", search: "Santorini Greece tourism" },
    { text: "Visite o icônico **Cristo Redentor no Rio de Janeiro, Brasil**.", search: "Christ the Redeemer Rio de Janeiro" },
    { text: "Perca-se na grandiosidade do **Grand Canyon, EUA**.", search: "Grand Canyon Arizona nature" },
    { text: "Caminhe pela histórica **Acrópole em Atenas, Grécia**.", search: "Acropolis Athens landmark" },
    { text: "Explore os mercados e mesquitas de **Marrakech, Marrocos**.", search: "Marrakech market tourism" },
    { text: "Desfrute da vida noturna e da modernidade de **Dubai, Emirados Árabes Unidos**.", search: "Dubai cityscape tourism" },
    { text: "Conheça a arte e os museus de **Florença, Itália**.", search: "Florence Italy art" },
    { text: "Aventure-se nas paisagens lunares do **Vale da Lua no Chile**.", search: "Valle de la Luna Chile nature" },
    { text: "Descubra a cultura maia em **Chichén Itzá, México**.", search: "Chichen Itza Mexico ruins" },
    { text: "Relaxe nas águas termais de **Pamukkale, Turquia**.", search: "Pamukkale Turkey hot springs" },
    { text: "Visite a Catedral de São Basílio na **Praça Vermelha em Moscou, Rússia**.", search: "St Basil's Cathedral Moscow" },
    { text: "Explore a beleza natural do **Parque Nacional de Banff, Canadá**.", search: "Banff National Park Canada" },
    { text: "Caminhe pelas ruas medievais de **Edimburgo, Escócia**.", search: "Edinburgh Scotland castle" },
    { text: "Descubra a arte e os cafés de **Amsterdã, Holanda**.", search: "Amsterdam canals tourism" },
    { text: "Aventure-se na natureza selvagem da **Patagônia, Argentina/Chile**.", search: "Patagonia nature trekking" },
    { text: "Visite a cidade perdida de **Petra, Jordânia**.", search: "Petra Jordan ancient city" },
    { text: "Explore a riqueza cultural de **Berlim, Alemanha**.", search: "Berlin Brandenburg Gate" },
    { text: "Relaxe nas praias de **Maldivas**.", search: "Maldives beach resorts" },
    { text: "Conheça os arranha-céus e a culinária de **Singapura**.", search: "Singapore skyline food" },
    { text: "Descubra os mistérios das **Ilhas Galápagos, Equador**.", search: "Galapagos Islands wildlife" },
    { text: "Aventure-se nas montanhas do **Nepal e o Everest**.", search: "Everest base camp Nepal" },
    { text: "Visite os mercados flutuantes de **Bangkok, Tailândia**.", search: "Bangkok floating market" },
    { text: "Explore o charme colonial de **Cartagena, Colômbia**.", search: "Cartagena Colombia old city" },
    { text: "Relaxe nas praias douradas de **Maui, Havaí, EUA**.", search: "Maui Hawaii beach" },
    { text: "Conheça o centro histórico de **Viena, Áustria**.", search: "Vienna Austria architecture" },
    { text: "Descubra a beleza natural da **Islândia** e suas auroras boreais.", search: "Iceland Northern Lights" },
    { text: "Aventure-se na selva e nas ruínas de **Tikal, Guatemala**.", search: "Tikal Guatemala Mayan ruins" },
    { text: "Visite a Ponte da Torre em **Londres, Reino Unido**.", search: "Tower Bridge London" },
    { text: "Explore as vinícolas da **Toscana, Itália**.", search: "Tuscany Italy vineyards" },
    { text: "Relaxe nas termas de **Budapeste, Hungria**.", search: "Budapest thermal baths" },
    { text: "Conheça os templos de **Kyoto, Japão**.", search: "Kyoto Japan temples" },
    { text: "Descubra os desertos e as cidades antigas do **Peru**.", search: "Peru desert Nazca Lines" },
    { text: "Aventure-se nas paisagens costeiras da **África do Sul**.", search: "Cape Town South Africa" },
    { text: "Visite o vibrante bairro da **Boêmia em Praga, República Tcheca**.", search: "Prague Old Town Square" },
    { text: "Explore a modernidade de **Seul, Coreia do Sul**.", search: "Seoul city nightlife" },
    { text: "Relaxe nas praias de **Bora Bora, Polinésia Francesa**.", search: "Bora Bora beach resorts" },
    { text: "Conheça a arte de rua em **Lisboa, Portugal**.", search: "Lisbon street art" },
    { text: "Descubra a vida selvagem do **Costa Rica**.", search: "Costa Rica rainforest wildlife" },
    { text: "Aventure-se nos desertos da **Namíbia**.", search: "Namib desert Namibia" },
    { text: "Visite as Cataratas do Niágara, **Canadá/EUA**.", search: "Niagara Falls tourism" },
    { text: "Explore a cultura e a história de **Dublin, Irlanda**.", search: "Dublin Ireland castle" },
    { text: "Relaxe nas ilhas de **Fiji**.", search: "Fiji islands beach" },
    { text: "Conheça a Opera House em **Sydney, Austrália**.", search: "Sydney Opera House" },
    { text: "Descubra os vulcões e as paisagens lunares do **Chile**.", search: "Chile Atacama Desert" },
    { text: "Aventure-se nas montanhas dos **Alpes Suíços**.", search: "Swiss Alps mountains" },
    { text: "Visite a cidade dourada de **Durban, África do Sul**.", search: "Durban beachfront" },
    { text: "Explore os museus e a cultura de **São Petersburgo, Rússia**.", search: "St Petersburg Russia palace" },
    { text: "Relaxe nas praias de **Mykonos, Grécia**.", search: "Mykonos Greece beach" },
    { text: "Conheça a grandiosidade de **São Francisco, EUA** e a Ponte Golden Gate.", search: "Golden Gate Bridge San Francisco" },
    { text: "Descubra a beleza natural da **Croácia** e seus parques nacionais.", search: "Plitvice Lakes Croatia" },
    { text: "Aventure-se na cultura vibrante de **Buenos Aires, Argentina**.", search: "Buenos Aires Tango" },
    { text: "Visite o impressionante **Burj Khalifa em Dubai, Emirados Árabes Unidos**.", search: "Burj Khalifa Dubai" },
    { text: "Explore os templos antigos de **Bagan, Mianmar**.", search: "Bagan Myanmar temples" },
    { text: "Relaxe nas ilhas de **Zanzibar, Tanzânia**.", search: "Zanzibar beach" },
    { text: "Conheça os festivais e a música de **Nova Orleans, EUA**.", search: "New Orleans jazz" },
    { text: "Descubra as paisagens deslumbrantes da **Nova Zelândia**.", search: "New Zealand Lord of the Rings scenery" },
    { text: "Aventure-se nas florestas tropicais da **Tailândia**.", search: "Thailand rainforest" },
    { text: "Visite o charmoso centro histórico de **Colônia, Alemanha**.", search: "Cologne Cathedral Germany" },
    { text: "Explore a arte e a história de **Sevilha, Espanha**.", search: "Seville Spain Plaza de España" },
    { text: "Relaxe nas praias do **Caribe**.", search: "Caribbean beach resorts" },
    { text: "Conheça os museus de **Washington D.C., EUA**.", search: "Washington DC monuments" },
    { text: "Descubra a cultura viking na **Dinamarca**.", search: "Copenhagen Nyhavn" },
    { text: "Aventure-se no deserto do **Saara no Marrocos**.", search: "Sahara Desert Morocco" },
    { text: "Visite a cidade mística de **Jerusalém**.", search: "Jerusalem Old City" },
    { text: "Explore a vida selvagem da **Amazônia**.", search: "Amazon rainforest wildlife" },
    { text: "Relaxe nas praias de **Cancún, México**.", search: "Cancun beach resorts" },
    { text: "Conheça a grandiosidade de **São Paulo, Brasil** e seus arranha-céus.", search: "Sao Paulo city skyline" },
    { text: "Descubra os canais de **Bruges, Bélgica**.", search: "Bruges Belgium canals" },
    { text: "Aventure-se nas paisagens vulcânicas do **Parque Nacional de Yellowstone, EUA**.", search: "Yellowstone National Park geysers" },
    { text: "Visite as florestas de bambu no **Japão**.", search: "Arashiyama Bamboo Grove Kyoto" },
    { text: "Explore a história da **Atenas antiga, Grécia**.", search: "Athens ancient ruins" },
    { text: "Relaxe nas praias de **Capri, Itália**.", search: "Capri Italy island" },
    { text: "Conheça o Muro das Lamentações em **Israel**.", search: "Western Wall Jerusalem" },
    { text: "Descubra a cultura vibrante de **Havana, Cuba**.", search: "Havana Cuba old cars" },
    { text: "Aventure-se na selva da **Índia** e seus tigres.", search: "India tiger safari" },
    { text: "Visite os coloridos edifícios de **Estocolmo, Suécia**.", search: "Stockholm Gamla Stan" },
    { text: "Explore os lagos e montanhas da **Suíça**.", search: "Swiss lakes mountains" },
    { text: "Relaxe nas praias de **Barcelona, Espanha**.", search: "Barcelona beach city" },
    { text: "Conheça os vulcões ativos da **Indonésia**.", search: "Indonesia volcanoes" },
    { text: "Descubra a história e os castelos da **Alemanha**.", search: "Neuschwanstein Castle Germany" },
    { text: "Aventure-se nas dunas do **Deserto do Saara**.", search: "Sahara Desert dunes" },
    { text: "Visite o famoso **Big Ben em Londres, Reino Unido**.", search: "Big Ben London landmark" },
    { text: "Explore os palácios de **São Petersburgo, Rússia**.", search: "St Petersburg Russia palaces" },
    { text: "Relaxe nas praias de **Phuket, Tailândia**.", search: "Phuket beach resorts" },
    { text: "Conheça a arte de rua de **Melbourne, Austrália**.", search: "Melbourne street art" },
    { text: "Descubra as paisagens deslumbrantes da **Escócia**.", search: "Scottish Highlands scenery" },
    { text: "Aventure-se nos mercados de rua de **Hong Kong**.", search: "Hong Kong street market" },
    { text: "Visite as pirâmides de **Teotihuacan, México**.", search: "Teotihuacan Mexico pyramids" },
    { text: "Explore as praias de **Grécia**.", search: "Greece islands beach" },
    { text: "Relaxe nas águas claras das **Filipinas**.", search: "El Nido Palawan Philippines" },
    { text: "Conheça a vida selvagem da **África do Sul**.", search: "South Africa wildlife safari" },
    { text: "Descubra os templos antigos de **Japão**.", search: "Japan ancient temples" },
    { text: "Aventure-se nas paisagens geladas da **Antártida**.", search: "Antarctica iceberg" },
    { text: "Visite a cidade histórica de **Kyoto, Japão**.", search: "Kyoto traditional Japan" },
    { text: "Explore os mercados vibrantes de **Índia**.", search: "India street market" },
    { text: "Relaxe nas praias de **Brasil**.", search: "Brazil beaches tourism" },
    { text: "Conheça a vida selvagem de **Canadá**.", search: "Canada wildlife nature" },
    { text: "Descubra a cultura de **Coreia do Sul**.", search: "South Korea Seoul culture" },
    { text: "Aventure-se nas montanhas de **Nepal**.", search: "Nepal Himalayas trekking" },
    { text: "Visite as ilhas paradisíacas de **Tailândia**.", search: "Thailand islands beach" },
    { text: "Explore a natureza exuberante de **Nova Zelândia**.", search: "New Zealand nature landscapes" }
  ];

  /**
   * Função para buscar e exibir uma imagem do local usando a Pexels API.
   * @param {string} query O termo de busca para a imagem.
   */
  async function fetchAndDisplayImage(query) {
    if (!PEXELS_API_KEY || PEXELS_API_KEY === 'SUA_CHAVE_AQUI') {
        console.error("ERRO PEXELS API: Por favor, insira sua chave de API da Pexels em 'PEXELS_API_KEY' no scripts.js.");
        suggestionsContainer.innerHTML += '<p style="color: red; margin-top: 10px;">Erro: Chave da Pexels API não configurada!</p>';
        return;
    }

    try {
      const response = await fetch(`${PEXELS_API_URL}?query=${encodeURIComponent(query)}&per_page=1`, {
        headers: {
          Authorization: PEXELS_API_KEY
        }
      });
      
      if (!response.ok) {
        // Lidar com erros HTTP específicos da API (ex: 401 Unauthorized, 429 Too Many Requests)
        const errorText = await response.text();
        let errorMessage = `Erro ao buscar imagem para "${query}": ${response.status} ${response.statusText}.`;
        if (response.status === 401) {
            errorMessage += " Verifique sua chave de API da Pexels.";
        } else if (response.status === 429) {
            errorMessage += " Limite de requisições excedido. Tente novamente mais tarde.";
        }
        console.error(errorMessage, errorText);
        suggestionsContainer.innerHTML += `<p style="color: red; margin-top: 10px;">${errorMessage}</p>`;
        return;
      }

      const data = await response.json();

      if (data.photos && data.photos.length > 0) {
        const imageUrl = data.photos[0].src.medium; 
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = `Imagem de turismo de ${query}`;
        imgElement.classList.add('suggestion-image'); 
        suggestionsContainer.appendChild(imgElement);

        updateContainerHeight(); 

      } else {
        console.warn(`Nenhuma imagem de turismo encontrada na Pexels para: "${query}"`);
        suggestionsContainer.innerHTML += `<p style="color: #666; margin-top: 10px;">Nenhuma imagem de turismo encontrada para "${query}".</p>`;
        updateContainerHeight(); // Ajusta a altura mesmo sem imagem
      }
    } catch (error) {
      console.error('Erro na requisição Pexels API (rede ou parse):', error);
      suggestionsContainer.innerHTML += `<p style="color: red; margin-top: 10px;">Erro de conexão com a API da Pexels.</p>`;
      updateContainerHeight(); // Ajusta a altura mesmo com erro
    }
  }

  /**
   * Função para exibir sugestões de viagem aleatórias.
   */
  function displayTravelSuggestions() {
    suggestionsContainer.innerHTML = ''; // Limpa sugestões anteriores

    const randomIndex = Math.floor(Math.random() * travelSuggestions.length);
    const selectedSuggestion = travelSuggestions[randomIndex];
    let suggestionText = selectedSuggestion.text;

    // Garante que o REGEX de substituição para negrito seja aplicado corretamente
    // O problema anterior dos ** pode ter sido devido a sobrescrita posterior
    suggestionText = suggestionText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    const suggestionElement = document.createElement('p');
    // Certifique-se de que o innerHTML é o último a ser setado para o texto da sugestão
    suggestionElement.innerHTML = `**Sugestão de Viagem:** ${suggestionText}`;

    suggestionsContainer.appendChild(suggestionElement);

    fetchAndDisplayImage(selectedSuggestion.search);
  }

  /**
   * Calcula a altura total necessária do container e a aplica.
   */
  function updateContainerHeight() {
      // Pequeno atraso para garantir que todos os elementos foram renderizados
      setTimeout(() => {
        container.style.height = 'auto'; 
        const currentHeight = container.scrollHeight;
        container.style.height = `${currentHeight}px`;
      }, 50); // Reduzido o atraso, 50ms deve ser suficiente
  }

  function handleGenerateQrCode() {
    const inputValue = qrCodeInput.value.trim();
    if (!inputValue) {
        container.classList.remove('active');
        container.style.height = '260px'; // Volta para a altura inicial
        qrCodeBtn.innerText = 'Gerar QR Code';
        suggestionsContainer.innerHTML = ''; // Limpa as sugestões
        return; 
    }

    // Resetar o estado do container antes de iniciar a geração
    container.classList.remove('active');
    container.style.height = '260px'; 
    suggestionsContainer.innerHTML = ''; // Limpa conteúdo anterior rapidamente para evitar resíduos

    qrCodeBtn.innerText = 'Gerando QR Code ...';
    qrCodeImg.src = `${QR_CODE_API}${encodeURIComponent(inputValue)}`;

    // Lógica para quando a imagem do QR Code carregar
    qrCodeImg.onload = () => {
      container.classList.add('active');
      qrCodeBtn.innerText = 'Código Criado!';
      displayTravelSuggestions(); // Exibe a sugestão e busca a imagem
      // updateContainerHeight é chamado dentro de fetchAndDisplayImage
      // ou após o setTimeout em displayTravelSuggestions se a imagem não for encontrada
    };

    // Lógica para quando a imagem do QR Code falhar
    qrCodeImg.onerror = () => {
      qrCodeBtn.innerText = 'Erro ao gerar QR Code!';
      suggestionsContainer.innerHTML = '<p style="color: red;">Não foi possível carregar o QR Code. Tente novamente.</p>';
      container.classList.remove('active'); 
      container.style.height = '260px'; // Garante que a altura volte ao normal em caso de erro
      // Opcional: tentar buscar a sugestão mesmo sem QR code
      // displayTravelSuggestions();
      // setTimeout(updateContainerHeight, 100); 
    };
  }

  function handleInputKeydown(e) {
    if (e.code === 'Enter') {
      e.preventDefault();
      handleGenerateQrCode();
    }
  }

  function handleInputKeyup() {
    if (!qrCodeInput.value.trim()) {
      container.classList.remove('active');
      container.style.height = '260px'; // Volta para a altura inicial
      qrCodeBtn.innerText = 'Gerar QR Code';
      suggestionsContainer.innerHTML = ''; // Limpa as sugestões
    }
  }

  // Adiciona os ouvintes de evento
  qrCodeBtn.addEventListener('click', handleGenerateQrCode);
  qrCodeInput.addEventListener('keydown', handleInputKeydown);
  qrCodeInput.addEventListener('keyup', handleInputKeyup);
})();