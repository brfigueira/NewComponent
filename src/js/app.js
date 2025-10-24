document.addEventListener('DOMContentLoaded',()=>{
    const form = document.getElementById('job-form');
    const jobListContainer = document.getElementById('job-list');

    //Função para carregar as vagas do localStorage
    function loadJobs(){
        console.log("Executando loadJobs...");
        const jobs = JSON.parse(localStorage.getItem('jobVacancies')) || [];
        console.log("Vagas encontradas no localStorage:", jobs);

        jobListContainer.innerHTML = ''; // Limpa o container
        //Exibe as vagas mais recentes primeiro
        jobs.reverse().forEach(job => {
            const card = document.createElement('card-news');
            card.setAttribute('nome-anunciante', job.anuncianteNome);
            card.setAttribute('foto-anunciante', job.anuncianteFoto);
            card.setAttribute('titulo', job.vagaTitulo);
            card.setAttribute('setor', job.vagaSetor);
            card.setAttribute('imagem-empresa', job.empresaImagem);
            card.setAttribute('descricao', job.vagaDescricao);
             jobListContainer.appendChild(card);
        });
        console.log("Cards renderizados na tela.");
    }
    // Função para salvar uma nova vaga
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("Formulário enviado (submit).");

        const newJob = {
            anuncianteNome: document.getElementById
            ('anunciante-nome').value,
            anuncianteFoto: document.getElementById
            ('anunciante-foto').value,
            vagaTitulo: document.getElementById
            ('vaga-titulo').value,
            vagaSetor: document.getElementById
            ('vaga-setor').value,
            empresaImagem: document.getElementById
            ('empresa-imagem').value,
            vagaDescricao: document.getElementById
            ('vaga-descricao').value,
        };
        // --- PONTO DE DIAGNÓSTICO MAIS IMPORTANTE ---
        console.log("1. DADOS CAPTURADOS DO FORMULÁRIO:", newJob);
        // ---------------------------------------------
        // 1. READ: Lê as vagas existentes
        const jobs = JSON.parse(localStorage.getItem
            ('jobVacancies')) || [];
        console.log("2. VAGAS ANTIGAS LIDAS:", jobs);

        // 2. CREATE: Adiciona a nova vaga
        jobs.push(newJob);

        // Salva de volta no localStorage
        localStorage.setItem('jobVacancies', JSON.stringify(jobs));
        console.log("3. VAGAS NOVAS SALVAS NO LOCALSTORAGE.");
        // Recarrega e exibe a lista de vagas
        loadJobs();

        // Limpa os campos do formulário (método mais eficiente)
        form.reset();
        console.log("4. Formulário resetado.");

        alert('Vaga publicada com sucesso!');
    });

    // Carrega as vagas ao iniciar
    loadJobs();
});