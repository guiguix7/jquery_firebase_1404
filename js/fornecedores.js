// Banco de dados
const ref = db.ref("fornecedores");

idcapturado = null

$("#cancelar").hide()

function limpar() {
    $("#nome").val("");
    $("#email").val("");
    $("#CNPJ").val("");
    $("input[name='estado']").prop("checked", false);
}

$("#cancelar").click(function () {
    limpar();
    idcapturado = null;
    $("#salvar").text("Salvar").removeClass("btn-success").addClass("btn-primary");
    $("#cancelar").hide();
    $("#status").text("");
})

$("#salvar").click(function () {
    let nome = $("#nome").val().toUpperCase();
    let email = $("#email").val().toLowerCase();
    let cnpj = $("#CNPJ").val();
    let estado = $("input[name='estado']:checked").val().toUpperCase();

    if (nome === "" || email === "" || cnpj === "" || estado === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (idcapturado) {//Editar
        ref.child(idcapturado).update({ nome, email, cnpj, estado })
        idcapturado = null
        $("#salvar").text("Salvar")

        $("#cancelar").hide()

        $("#salvar").removeClass("btn-success").addClass("btn-primary")

        $("#status").text("")

        alert("Fornecedor atualizado com sucesso!");

    } else {//Salvar
        ref.push({
            type: "fornecedor",
            nome: nome,
            email: email,
            cnpj: cnpj,
            estado: estado
        });
        alert("Fornecedor salvo com sucesso!");
    }

    // Limpar os campos

    limpar();
})

ref.on("value", dados_tabela => {
    $("#lista").empty();

    $("#lista").append(`
    <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Email</th>
        <th>CNPJ</th>
        <th>Estado</th>
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
            <td>${reg.cnpj}</td>
            <td>${reg.estado}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deletar('${id}')">
                    <i class="bi-trash"></i>
                </button>
            </td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editar('${id}', '${reg.nome}', '${reg.email}', '${reg.cnpj}', '${reg.estado}')">
                     <i class="bi bi-pencil"></i>
                </button>
            </td>
        </tr>
    `);
    });
});

function editar(id, nome, email, cnpj, estado) {
    $('#nome').val(nome)
    $('#email').val(email)
    $('#CNPJ').val(cnpj)
    $("input[name='estado'][value='" + estado.toLowerCase() + "']").prop("checked", true)

    idcapturado = id

    $('#salvar').text('Atualizar').removeClass('btn-primary').addClass('btn-success')

    $("#cancelar").show()

    $("#status").text("Editando registro...")
}

function deletar(id) {
    if (confirm("Tem certeza que deseja deletar este fornecedor?")) {
        ref.child(id).remove();
        alert("Fornecedor deletado com sucesso!");
    }
}
function cancelar() {
    limpar();
    idcapturado = null;
    $("#salvar").text("Salvar").removeClass("btn-success").addClass("btn-primary");
    $("#cancelar").hide();
    $("#status").text("");
}