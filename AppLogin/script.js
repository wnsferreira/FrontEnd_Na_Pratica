var storage = window.sessionStorage;
storage.setItem('thais.viana@prof.infnet.edu.br', 'a12345');
storage.setItem('thiago.santos@al.infnet.edu.br', 'a12345');
storage.setItem('gabrielle.rolim@al.infnet.edu.br', 'a12345');

function validaLogin() {
    let loginEmail = document.getElementById("email").value
    let loginSenha = document.getElementById("senha").value

    let resultado = storage.getItem(loginEmail);
    if (resultado == null) {
        document.getElementById("erros").innerText = "Usuário não encontrado."
    } else {
        if (loginSenha == resultado) {
            console.log("Login feito com sucesso")
            document.getElementsByClassName("home")[0].style.visibility = "visible"
            document.getElementsByClassName("deslogado")[0].style.display = "none"
        } else {
            document.getElementById("erros").innerText = "Senha ou usuário incorreto!"
        }
    }
}

function mostrarCadastro() {
    document.getElementsByClassName("cadastroUsuario")[0].style.visibility = "visible"
    document.getElementsByClassName("login")[0].style.visibility = "hidden"
}

function esconderCadastro() {
    document.getElementsByClassName("cadastroUsuario")[0].style.visibility = "hidden"
    document.getElementsByClassName("login")[0].style.visibility = "visible"
}

function cadastrarUsuario() {
    let emailCadastro = document.getElementById("emailcadastro").value
    let senhaCadastro = document.getElementById("senhacadastro").value
    if (emailCadastro && senhaCadastro) {
        storage.setItem(emailCadastro, senhaCadastro);
        window.alert("Usuário cadastrado com sucesso!")
        esconderCadastro()
    }
}

// parte 1: login
// 0. criar um storage com os primeiros usuários
// 1. pegar o email e senha 
// 2. conferir se existe na nossa base local.
// 3. se verdadedadei mostrar home de oi 
// 4. se falso voltar pro login com mensagem de senha e usuario incorreto.

// parte 2: cadastro
// 0. mostra o formulario de cadastro
// 1. pega o email e senha cadastro
// 2. set item na nossa base local desse email e senha cadastro
// 3. mostra o login de vota
// 4. o usuário é capaz de se logar com o email novo