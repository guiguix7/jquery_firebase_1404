// Banco de dados
const ref = db.ref("categorias");

let idcapturado = null

$("#cancelar").hide()

function limpar() {
    $("#nome").val("");
    $("#info").val("");
}

$("#salvar").click(function () {
    let nome = $("#nome").val().toUpperCase();
    let text = $("#info").val();

    if (nome === "" || text === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (idcapturado) {//Atualizar
        ref.child(idcapturado).update({ nome, info: text })
        idcapturado = null
        $("#salvar").text("Salvar")

        $("#cancelar").hide()

        $("#salvar").removeClass("btn-success").addClass("btn-primary")

        $("#status").text("")

        alert("Categoria atualizada com sucesso!");

    } else {//Criar novo
        ref.push({
            nome: nome,
            type: "categoria",
            info: text
        });
        alert("Categoria salva com sucesso!");
    }

    limpar();
})

ref.on("value", dados_tabela => {
    $("#lista").empty();

    $("#lista").append(`
    <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Informações</th>
        <th colspan="2">Opções</th>
    </tr>`)

    dados_tabela.forEach(registro => {
        let reg = registro.val();
        let id = registro.key;

        $("#lista").append(`
        <tr>
            <td>${id}</td>
            <td>${reg.nome}</td>
            <td>${reg.info}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deletar('${id}')">
                    <i class="bi-trash"></i>
                </button>
            </td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editar('${id}', '${reg.nome}', '${reg.info}')">
                    <i class="bi bi-pencil"></i>
                </button>
            </td>
        </tr>
    `);
    });
});

function editar(id, nome, info) {
    $('#nome').val(nome)
    $('#info').val(info)

    idcapturado = id

    $('#salvar').text('Atualizar').removeClass('btn-primary').addClass('btn-success')

    $("#cancelar").show()

    $("#status").text("Editando registro...")
}