// Arquivo: src/js/app.js

// Garante que o script só rode após o HTML estar completo
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona os elementos principais do DOM
    const form = document.getElementById('job-form');
    const jobListContainer = document.getElementById('job-list');

    // Função para carregar as vagas do localStorage (READ)
    function loadJobs() {
        console.log("Executando loadJobs...");
        const jobs = JSON.parse(localStorage.getItem('jobVacancies')) || [];
        console.log("Vagas encontradas no localStorage:", jobs);

        jobListContainer.innerHTML = ''; // Limpa o container antes de adicionar
        
        // Itera sobre as vagas e cria os cards
        jobs.forEach(job => {
            const card = document.createElement('card-news');
            // Define os atributos do Web Component
            card.setAttribute('id', job.id); // Passa o ID para o card
            card.setAttribute('nome-anunciante', job.anuncianteNome);
            card.setAttribute('foto-anunciante', job.anuncianteFoto);
            card.setAttribute('titulo', job.vagaTitulo);
            card.setAttribute('setor', job.vagaSetor);
            card.setAttribute('imagem-empresa', job.empresaImagem);
            card.setAttribute('descricao', job.vagaDescricao);
            
            // Adiciona o card criado ao container
            jobListContainer.appendChild(card);
        });
        console.log("Cards renderizados na tela.");
    }
    
    // Função para carregar dados da vaga no formulário para edição
    function starEdit(id) {
        console.log("Iniciando edição da vaga ID:", id);
        
        const jobs = JSON.parse(localStorage.getItem('jobVacancies')) || []; 
        
        // CORREÇÃO DE ROBUSTEZ: Garante que o ID de comparação seja numérico.
        const jobIdNumber = Number(id);

        // Encontra a vaga específica pelo ID
        // Uso de === (comparação estrita) requer que os tipos sejam iguais (Number)
        const jobToEdit = jobs.find(job => job.id === jobIdNumber);
        
        // Adicionando console.log para debugging da vaga encontrada
        console.log("Vaga encontrada para edição:", jobToEdit);


        if (!jobToEdit) {
            console.error("Vaga não encontrada!");
            alert("Erro: Vaga de ID " + id + " não encontrada no armazenamento local.");
            return;
        }
        
        // Preenche o formulário com os dados da vaga
        document.getElementById('anunciante-nome').value = jobToEdit.anuncianteNome;
        document.getElementById('anunciante-foto').value = jobToEdit.anuncianteFoto; 
        document.getElementById('vaga-titulo').value = jobToEdit.vagaTitulo;
        document.getElementById('vaga-setor').value = jobToEdit.vagaSetor;
        document.getElementById('empresa-imagem').value = jobToEdit.empresaImagem;
        document.getElementById('vaga-descricao').value = jobToEdit.vagaDescricao;

        // Marca o formulário com o ID da vaga que está sendo editada
        form.setAttribute('data-editing-id', id);
        
        // Muda o texto do botão
        form.querySelector('button[type="submit"]').textContent = 'Salvar Alterações'; 
        
        // Rola a tela para o formulário
        form.scrollIntoView({ behavior: 'smooth' });
    }

    // "Ouvinte" principal do formulário (CREATE e UPDATE)
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página
        console.log("Formulário enviado (submit).");

        // Verifica se está em modo de edição
        const editingId = form.getAttribute('data-editing-id');
        const jobs = JSON.parse(localStorage.getItem('jobVacancies')) || [];

        if (editingId) {
            // --- MODO UPDATE ---
            console.log("Modo: UPDATE");

            // 1. Encontrar o índice (posição) da vaga a ser atualizada
            // Garante que o ID de comparação seja numérico.
            const jobIndex = jobs.findIndex(job => job.id === Number(editingId));

            if (jobIndex !== -1) {
                // 2. Criar o objeto atualizado
                const updatedJob = {
                    id: Number(editingId), // Manter o ID original
                    anuncianteNome: document.getElementById('anunciante-nome').value,
                    anuncianteFoto: document.getElementById('anunciante-foto').value,
                    vagaTitulo: document.getElementById('vaga-titulo').value,
                    vagaSetor: document.getElementById('vaga-setor').value,
                    empresaImagem: document.getElementById('empresa-imagem').value,
                    vagaDescricao: document.getElementById('vaga-descricao').value,
                };

                // 3. Substituir a vaga antiga pela nova no array
                jobs[jobIndex] = updatedJob;
                console.log("Vaga substituída no array:", jobs);

                // 4. Salvar o array atualizado no localStorage
                localStorage.setItem('jobVacancies', JSON.stringify(jobs));
                alert('Vaga atualizada com sucesso!');

            } else {
                alert("Erro ao atualizar: vaga não encontrada.");
            }

            // 5. Limpar o estado de edição do formulário
            form.removeAttribute('data-editing-id');
            form.querySelector('button[type="submit"]').textContent = 'Publicar Vaga'; 

        } else {
            // --- MODO CREATE ---
            console.log("Modo: CREATE");

            // 1. Criar o objeto da nova vaga
            const newJob = {
                id: Date.now(), // ID único baseado no tempo
                anuncianteNome: document.getElementById('anunciante-nome').value,
                anuncianteFoto: document.getElementById('anunciante-foto').value,
                vagaTitulo: document.getElementById('vaga-titulo').value,
                vagaSetor: document.getElementById('vaga-setor').value,
                empresaImagem: document.getElementById('empresa-imagem').value,
                vagaDescricao: document.getElementById('vaga-descricao').value,
            };

            // 2. Adicionar a nova vaga ao array
            jobs.push(newJob);
            console.log("Nova vaga adicionada:", newJob);

            // 3. Salvar o array atualizado no localStorage
            localStorage.setItem('jobVacancies', JSON.stringify(jobs));
            alert('Vaga publicada com sucesso!');
        }

        // --- COMUM AOS DOIS MODOS ---
        
        form.reset(); // Limpa os campos do formulário
        loadJobs();   // Recarrega a lista de vagas na tela
        console.log("Formulário resetado e lista recarregada.");
    });

    
    // "Ouvinte" de eventos para o botão Editar
    // (Escuta o evento 'edit-job' que "borbulha" do CardNews.js)
    jobListContainer.addEventListener('edit-job', (event) => {
        // O ID vem dentro de 'event.detail.id'
        console.log("Evento 'edit-job' recebido com ID:", event.detail.id);
        
        // Chama a função para preencher o formulário
        starEdit(event.detail.id); 
    });
    

    // Carrega as vagas existentes assim que a página é iniciada
    loadJobs();
});
