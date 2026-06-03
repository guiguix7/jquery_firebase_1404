// Banco de dados
const ref = db.ref("funcionarios");

let idcapturado = null

$("#cancelar").hide()

function limpar() {
    $("#nome").val("");
    $("#email").val("");
    $("#cargo").val("");
}

$("#salvar").click(function () {
    let nome = $("#nome").val().toUpperCase();
    let email = $("#email").val().toLowerCase();
    let cargo = $("#cargo").val();

    if (nome === "" || email === "" || cargo === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (idcapturado) { // Atualizar
        ref.child(idcapturado).update({ nome, email, cargo })
        idcapturado = null
        $("#salvar").text("Salvar")
        $("#salvar").removeClass("btn-success").addClass("btn-primary")
        $("#cancelar").hide()
        $("#status").text("")
        alert("Funcionário atualizado com sucesso!");
    } else {
        ref.push({
            nome: nome,
            email: email,
            cargo: cargo,
            type: "funcionario"
        });
        alert("Funcionário salvo com sucesso!");
    }

    limpar();
})

ref.on("value", dados_tabela => {
    $("#lista").empty();

    $("#lista").append(`
    <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Email</th>
        <th>Cargo</th>
        <th colspan="2">Opções</th>
    </tr>`)

    dados_tabela.forEach(registro => {
        let reg = registro.val();
        let id = registro.key;

        $("#lista").append(`
        <tr>
            <td>${id}</td>
            <td>${reg.nome}</td>
            <td>${reg.email}</td>
            <td>${reg.cargo}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deletar('${id}')">
                    <i class="bi-trash"></i>
                </button>
            </td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editar('${id}', '${reg.nome}', '${reg.email}', '${reg.cargo}')">
                    <i class="bi bi-pencil"></i>
                </button>
            </td>
        </tr>
    `);
    });
});

function editar(id, nome, email) {
    $('#nome').val(nome)
    $('#email').val(email)

    idcapturado = id

    $('#salvar').text('Atualizar').removeClass('btn-primary').addClass('btn-success')

    $("#cancelar").show()

    $("#status").text("Editando registro...")
}

function deletar(id) {
    if (confirm("Tem certeza que deseja deletar este cliente?")) {
        ref.child(id).remove();
        alert("Cliente deletado com sucesso!");
    }
}

function cancelar() {
    limpar();
    idcapturado = null;
    $("#salvar").text("Salvar").removeClass("btn-success").addClass("btn-primary");
    $("#cancelar").hide();
    $("#status").text("");
}