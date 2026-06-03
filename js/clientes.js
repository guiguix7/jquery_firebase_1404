// Banco de dados
const ref = db.ref("clientes");

let idcapturado = null

$("#cancelar").hide()

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

    if (nome === "" || email === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (idcapturado) {
        ref.child(idcapturado).update({ nome, email })
        idcapturado = null
        $("#salvar").text("Salvar")

        $("#cancelar").hide()

        $("#salvar").removeClass("btn-success").addClass("btn-primary")

        $("#status").text("")
        alert('Cliente Atualizado com Sucesso!')

    } else {
        ref.push({
            nome: nome,
            email: email,
            type: "cliente"
        });
        alert('Cliente Cadastrado com Sucesso!')
    }
    limpar()
})

// Tabela no site

ref.on("value", dados_tabela => {
    $("#lista").empty();

    $("#lista").append(`
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
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
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deletar('${id}')">
                        <i class="bi-trash"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editar('${id}', '${reg.nome}', '${reg.email}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            </tr>
        `);
    });
});

// Limpar os campos

function limpar() {
    $("#nome").val("");
    $("#email").val("");
}

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