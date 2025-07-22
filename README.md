#App

Gympass style app

##RFs (Requisitos funcionais: funcionalidades da aplicação o que o usuario pode fazer)

- [x] Deve ser possível cadastrar um usuário
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuario logado
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [x] Deve ser possível o usuário obter seu histórico de check-ins
- [x] Deve ser possível o usuário buscar academias próximas ate 10km
- [x] Deve ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível o usuário realizar check-in em uma academia
- [x] Deve ser possível validar o check-in de um usuário
- [x] Deve ser possivel cadastrar uma academia



##RNs (Regras de negócio: o que o sistema deve fazer baseado nos requisitos funcionais)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [x] O check-in só pode ser validado até 20 minutos após ser criado
- [x] O check-in só pode ser validado por administradores
- [x] A academia só pode ser cadastrada por administradores



##RNFs (Requisitos não funcionais: funcionalidades que não são visiveis para o usuario)

-[x] A senha do usuário precisa estar criptografada
-[x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
-[x] Todas listas de dados precisam estar paginadas com 20 itens por página
-[x] O usuário deve ser identificado por um JWT (JSON Web Token)