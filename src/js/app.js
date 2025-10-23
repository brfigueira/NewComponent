document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('job-form');
    const jobListContainer = document.getElementById('job-list');

    // Função para carregar vagas do localStorage
    function loadJobs() {
        const jobs = JSON.parse(localStorage.getItem('jobVacancies')) || [];
        jobListContainer.innerHTML = ''; // Limpa o container
        
        // Exibe as vagas mais recentes primeiro
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
    }

    // Função para salvar uma nova vaga
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const newJob = {
            anuncianteNome: document.getElementById('anunciante-nome').value,
            anuncianteFoto: document.getElementById('anunciante-foto').value,
            vagaTitulo: document.getElementById('vaga-titulo').value,
            vagaSetor: document.getElementById('vaga-setor').value,
            empresaImagem: document.getElementById('empresa-imagem').value,
            vagaDescricao: document.getElementById('vaga-descricao').value,
        };

        // 1. READ: Lê as vagas existentes
        const jobs = JSON.parse(localStorage.getItem('jobVacancies')) || [];
        
        // 2. CREATE: Adiciona a nova vaga
        jobs.push(newJob);

        // Salva de volta no localStorage
        localStorage.setItem('jobVacancies', JSON.stringify(jobs));

        // Recarrega e exibe a lista de vagas
        loadJobs();

        // Limpa os campos do formulário, mantendo os dados do anunciante
        document.getElementById('vaga-titulo').value = '';
        document.getElementById('vaga-setor').value = '';
        document.getElementById('empresa-imagem').value = 'https://via.placeholder.com/180x180?text=Logo+Empresa';
        document.getElementById('vaga-descricao').value = '';
        alert('Vaga publicada com sucesso!');
    });

    // Carrega as vagas ao iniciar
    loadJobs();
});