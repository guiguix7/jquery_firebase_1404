const ref = db.ref("categorias");

$("#salvar").click(function () {
    let nome = $("#nome").val();
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
    limpar();
    alert("Categoria salva com sucesso!");
})
