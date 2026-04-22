const ref = db.ref("fornecedores");

$("#salvar").click(function () {
    let nome = $("#nome").val();
    let email = $("#email").val();
    let cnpj = $("#CNPJ").val();
    let estado = $("input[name='estado']:checked").val();

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
    limpar();
    alert("Fornecedor salvo com sucesso!");
})