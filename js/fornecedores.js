const ref = db.ref("fornecedores");

$("#salvar").click(function () {
    let nome = $("#nome").val();
    let email = $("#email").val();
    let cnpj = $("#CNPJ").val();
    let estado = $("#estado").val();

    if (nome === "" || email === "" || cnpj === "" || estado === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (estado === "sp") {
        estado = "São Paulo";
    } else if (estado === "rj") {
        estado = "Rio de Janeiro";
    } else if (estado === "mg") {
        estado = "Minas Gerais";
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
        $("#estado").val("");
    }
    limpar();
    alert("Fornecedor salvo com sucesso!");
})