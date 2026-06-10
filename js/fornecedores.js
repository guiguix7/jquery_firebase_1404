// Banco de dados
const ref = db.ref("vendedores");

let idcapturado = null;

$("#cancelar").hide();

function limpar() {
    $("#nome").val("");
    $("#salario").val("");
    $("#cargo").val("");
}

$("#cancelar").click(function () {
    limpar();
    idcapturado = null;
    $("#salvar").text("Salvar").removeClass("btn-success").addClass("btn-primary");
    $("#cancelar").hide();
    $("#status").text("");
})

$("#salvar").click(function () {
    let nome = $("#nome").val().trim().toUpperCase();
    let salario = parseFloat($("#salario").val());
    let cargo = $("#cargo").val().trim();

    if (nome === "" || isNaN(salario) || salario < 0 || cargo === "") {
        alert("Preencha nome, salário e cargo corretamente!");
        return;
    }

    if (idcapturado) {
        ref.child(idcapturado).update({ nome, salario, cargo, type: "vendedor" });
        alert("Vendedor atualizado com sucesso!");
    } else {
        ref.push({ nome, salario, cargo, type: "vendedor" });
        alert("Vendedor salvo com sucesso!");
    }

    idcapturado = null;
    $("#salvar").text("Salvar").removeClass("btn-success").addClass("btn-primary");
    $("#cancelar").hide();
    $("#status").text("");

    limpar();
});

ref.on("value", dados_tabela => {
    $("#lista").empty();

    $("#lista").append(`
    <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Salário</th>
        <th>Cargo</th>
        <th colspan="2">Opções</th>
    </tr>`);

    dados_tabela.forEach(registro => {
        let reg = registro.val();
        let id = registro.key;

        $("#lista").append(`
        <tr>
            <td>${id}</td>
            <td>${reg.nome || ""}</td>
            <td>R$ ${Number(reg.salario || 0).toFixed(2)}</td>
            <td>${reg.cargo || ""}</td>
            <td><button class="btn btn-danger btn-sm" onclick="deletar('${id}')"><i class="bi-trash"></i></button></td>
            <td><button class="btn btn-warning btn-sm" onclick="editar('${id}', '${reg.nome || ""}', '${reg.salario || ""}', '${reg.cargo || ""}')"><i class="bi bi-pencil"></i></button></td>
        </tr>`);
    });
});

function editar(id, nome, salario, cargo) {
    $('#nome').val(nome);
    $('#salario').val(salario);
    $('#cargo').val(cargo);

    idcapturado = id;

    $('#salvar').text('Atualizar').removeClass('btn-primary').addClass('btn-success');
    $("#cancelar").show();
    $("#status").text("Editando registro...");
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