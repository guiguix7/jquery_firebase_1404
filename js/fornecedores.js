// Banco de dados
const ref = db.ref("fornecedores");

$("#salvar").click(function () {
    let nome = $("#nome").val().toUpperCase();
    let email = $("#email").val().toLowerCase();
    let cnpj = $("#CNPJ").val();
    let estado = $("input[name='estado']:checked").val().toUpperCase();

    if (nome === "" || email === "" || cnpj === "" || estado === "") {
        alert("Preencha todos os campos!");
        return;
    }

    ref.push({
        type: "fornecedor",
        nome: nome,
        email: email,
        cnpj: cnpj,
        estado: estado
    });
    function limpar() {
        $("#nome").val("");
        $("#email").val("");
        $("#CNPJ").val("");
        $("input[name='estado']").prop("checked", false);
    }

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
                    <button class="btn btn-danger btn-sm">
                        <i class="bi-trash"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-warning btn-sm">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            </tr>
        `);
        });
    });

    // Limpar os campos

    limpar();
    alert("Fornecedor salvo com sucesso!");
})
