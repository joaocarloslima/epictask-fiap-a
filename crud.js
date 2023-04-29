let titulo = document.querySelector('#titulo')
let descricao = document.querySelector('#descricao')
let categoria = document.querySelector('#categoria')


document.querySelector('#salvar').addEventListener("click", () => {
    let tarefa = {
        titulo: titulo.value,
        descricao: descricao.value,
        categoria: categoria.value
    }

    console.log(validar(tarefa))

    if (!validar(tarefa)) return

    document.querySelector("#tarefas").innerHTML += cadastrar(tarefa)
    const modal = bootstrap.Modal.getInstance(document.querySelector('#exampleModal'));    
    modal.hide();

})

function validar(tarefa){
    let valido = true
    valido = validarCampo(tarefa.titulo, titulo) && valido
    valido = validarCampo(tarefa.descricao, descricao) && valido
    return valido
}

function validarCampo (valor, campo){
    if (valor == "") {
        campo.classList.remove("is-valid")
        campo.classList.add("is-invalid")
        return false
    }else{
        campo.classList.remove("is-invalid")
        campo.classList.add("is-valid")
        return true
    }
}

function apagar(botao){
    botao.parentElement.parentElement.parentElement.remove()
}


function cadastrar(tarefa) {
    return `
            <div class="col-lg-3 col-md-6 col-12">
                <div class="card">
                    <div class="card-header">
                        ${tarefa.titulo}
                    </div>
                    <div class="card-body">
                        <p class="card-text">${tarefa.descricao}</p>
                        <p>
                            <span class="badge text-bg-warning">${tarefa.categoria}</span>
                        </p>
                        <a href="#" class="btn btn-success">
                            <i class="bi bi-check-lg"></i>
                        </a>
                        <a href="#" onClick="apagar(this)" class="btn btn-danger">
                            <i class="bi bi-trash"></i>
                        </a>
                    </div>
                </div> <!-- card -->
            </div> <!-- col -->
        `
}