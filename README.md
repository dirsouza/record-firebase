# Record-Firebase
Projeto que usa os recursos functions e firestore da Google.

## Descrição
O projeto consiste em um sistema de cadastro de nomes. O sistema também lista todos os nomes cadastrados. Também é possível buscar por um nome específico com base no ID do registro.

## Arquitetura
O projeto foi desenvolvido com base na arquitetura hexagonal, código limpo e princípios do SOLID.\
Isso implica em uma abordagem organizada e modular, com ênfase na separação de responsabilidade e na facilidade de manutenção e extensibilidade do código.

## Tecnologias
- Node.js (v20)
- Typescript (v4)
- Express (v4)
- Zod (v3)
- Vitest (v1)
- Firebase (v11)
- Functions (v4)

## Como instalar as dependências
Para instalar as dependências do projeto, navegue até a pasta **_functions/_** e execute o comando abaixo:
> _Obs: A partir desse momento, todos os comando devem ser executados dentro da pasta **_functions/_**._ 

* Comando instala as dependências mantendo as versoẽs de desenvolvimento
  ```bash
  npm ci
  ```
* Comando instala as dependências atualizando as versões
  ```bash
  npm install
  ```

## Como executar o projeto
* Para executar o projeto via emulador, execute o comando abaixo:
  ```bash
  npm run serve
  ```
  
## Como executar os testes
Para executar os testes, execute o comando abaixo:
* Testes sem criar a pasta de cobertura
  ```bash
  npm run test
  ```
* Testes criando a pasta de cobertura
  ```bash
  npm run test:cov
  ```

## Como testar os endpoints
* **Local**:
  * Endpoint de cadastro:
    ```bash
    curl -X POST -H "Content-Type: application/json"\
      -d '{"name": "<Nome>"}'\
      http://localhost:5001/opencircleworking/us-central1/api/records
    ```
  * Endpoint de busca geral:
    ```bash
    curl -X GET http://localhost:5001/opencircleworking/us-central1/api/records
    ```
  * Endpoint de busca por ID:
    ```bash
    curl -X GET http://localhost:5001/opencircleworking/us-central1/api/records/{ID}
    ```
* **Web**:
    * Endpoint de cadastro:
      ```bash
      curl -X POST -H "Content-Type: application/json"\
        -d '{"name": "<Nome>"}'\
        https://us-central1-opencircleworking.cloudfunctions.net/api/records
      ```
    * Endpoint de busca geral:
      ```bash
      curl -X GET https://us-central1-opencircleworking.cloudfunctions.net/api/records
      ```
    * Endpoint de busca por ID:
      ```bash
      curl -X GET https://us-central1-opencircleworking.cloudfunctions.net/api/records/{ID}
      ```
