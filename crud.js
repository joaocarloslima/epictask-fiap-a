let titulo = document.querySelector('#titulo')
let descricao = document.querySelector('#descricao')
let categoria = document.querySelector('#categoria')

let tarefas = []

window.addEventListener("load", () => {
    tarefas = JSON.parse(localStorage.getItem("tarefas")) || []
    atualizar()
})

document.querySelector('#salvar').addEventListener("click", () => {
    const modal = bootstrap.Modal.getInstance(document.querySelector('#exampleModal'));    
    
    let tarefa = {
        id: Date.now(),
        titulo: titulo.value,
        descricao: descricao.value,
        categoria: categoria.value,
        concluido: false
    }
    
    if (!validar(tarefa)) return
    tarefas.push(tarefa)
    atualizar()
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

function apagar(id){
    tarefas = tarefas.filter(tarefa => tarefa.id != id)
    atualizar()
}

function atualizar(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas))

    document.querySelector("#tarefas").innerHTML = ""
    tarefas.forEach(tarefa => {
        document.querySelector("#tarefas").innerHTML += cadastrar(tarefa)
    })
}

function concluir(id){
    // tarefas.forEach(tarefa => {
    //     if (tarefa.id == id) {
    //         tarefa.concluido = true
    //     }
    // })

    const tarefaEncontrada = tarefas.find(tarefa => tarefa.id === id);

    if (tarefaEncontrada) tarefaEncontrada.concluido = true;

    atualizar()
    
}

function cadastrar(tarefa) {
    const disabled = tarefa.concluido ? "disabled" : ""
    return `
            <div class="col-lg-3 col-md-6 col-12 mt-3">
                <div class="card">
                    <div class="card-header">
                        ${tarefa.titulo}
                    </div>
                    <div class="card-body">
                        <p class="card-text">${tarefa.descricao}</p>
                        <p>
                            <span class="badge text-bg-warning">${tarefa.categoria}</span>
                        </p>
                        <a href="#" onClick="concluir(${tarefa.id})" class="btn btn-success ${disabled}" disabled> 
                            <i class="bi bi-check-lg"></i>
                        </a>
                        <a href="#" onClick="apagar(${tarefa.id})" class="btn btn-danger">
                            <i class="bi bi-trash"></i>
                        </a>
                    </div>
                </div> <!-- card -->
            </div> <!-- col -->
        `
}