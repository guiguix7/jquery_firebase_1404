// Banco de dados
const ref = db.ref("categorias");

$("#salvar").click(function () {
    let nome = $("#nome").val().toUpperCase();
    let text = $("#info").val();

    if (nome === "" || text === "") {
        alert("Preencha todos os campos!");
        return;
    }

    ref.push({
        nome: nome,
        type: "categoria",
        info: text
    });
    function limpar() {
        $("#nome").val("");
        $("#info").val("");
    }

    // Tabela no site

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
    alert("Categoria salva com sucesso!");
})
