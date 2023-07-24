## Descrição do Pipeline

name: CI/CD Workflow

on:
  push:
    branches: 
      - master  # substitua por sua branch de deploy

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Use Node.js
      uses: actions/setup-node@v1
      with:
        node-version: 14.x

    - name: Install Dependencies
      run: npm ci

    - name: Build
      run: npm run build --if-present

    - name: Deploy to S3
      uses: jakejarvis/s3-sync-action@master
      with:
        args: --acl public-read --follow-symlinks --delete
      env:
        AWS_S3_BUCKET: cadastro-produtor-rural
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_REGION: ${{ secrets.AWS_REGION }}
        SOURCE_DIR: 'dist/cadastro-produtor-rural'


---


- `on: push: branches: - main`: Este bloco especifica quando o fluxo de trabalho deve ser acionado. Neste caso, ele será acionado sempre que um novo commit for enviado para a branch "main".

- `jobs: build: runs-on: ubuntu-latest`: Esta seção define o trabalho "build" que será executado em um runner com a última versão do sistema operacional Ubuntu.

- `- name: Checkout code uses: actions/checkout@v2`: Este passo utiliza a ação `actions/checkout@v2` para fazer checkout do código do seu repositório no runner do GitHub Actions.

Quando essa etapa é executada, o GitHub Actions cria um clone do seu repositório no ambiente de execução (também conhecido como "runner"). Isso é semelhante a executar o comando git clone em seu computador local para obter uma cópia do repositório.

Depois que o checkout do código for feito, o código do seu repositório estará disponível no runner e poderá ser usado pelas etapas subsequentes no fluxo de trabalho. Por exemplo, se a próxima etapa for construir o código, o processo de construção pode referenciar os arquivos do código fonte que foram 'baixados' durante essa etapa de checkout.

- `- name: Use Node.js uses: actions/setup-node@v1 with: node-version: 14.x`: Este passo utiliza a ação `actions/setup-node@v1` para configurar uma versão específica do Node.js (14.x) no runner.

- `- name: Install Dependencies run: ...`: Este passo executa comandos para navegar até o diretório do projeto, listar os arquivos presentes e, em seguida, instalar as dependências do projeto usando `npm ci`.

Aqui estão os detalhes do comando npm ci:

npm ci é um comando do gerenciador de pacotes npm (Node Package Manager), que é a ferramenta padrão para gerenciamento de pacotes em projetos Node.js.

Este comando é usado para instalar as dependências do projeto. Ele espera encontrar um arquivo package-lock.json ou npm-shrinkwrap.json no diretório atual.

npm ci é semelhante ao npm install, mas é projetado para ser usado em ambientes de integração contínua (CI). Ele é mais rigoroso e pode proporcionar builds mais consistentes do que o npm install.

Ao contrário do npm install, que pode atualizar o package-lock.json, o npm ci sempre instala as versões exatas das dependências como especificado no package-lock.json. Isso garante que o mesmo código seja testado de maneira consistente em todas as execuções.

Além disso, npm ci é mais rápido do que npm install em ambientes de CI porque pode evitar algumas verificações pesadas que o npm install realiza.

Então, em resumo, essa etapa está instalando as dependências do seu projeto Node.js usando o comando npm ci. Isso é crucial para as etapas subsequentes que podem precisar dessas dependências para executar testes, criar builds ou executar o seu código.

- `- name: Build run: ...`: Este passo também navega até o diretório do projeto e executa o comando `npm run build` para criar uma versão de produção do seu aplicativo.

Aqui, o comando shell npm run build --if-present está sendo executado no runner.

Aqui estão os detalhes desse comando:

npm run: O npm run é um comando que permite executar scripts definidos no arquivo package.json do seu projeto. Esses scripts podem incluir coisas como iniciar o servidor de desenvolvimento, criar uma versão de produção do aplicativo, executar testes, entre outros.

build: O build é um dos scripts padrão que pode ser definido no arquivo package.json. Quando você executa npm run build, o npm procura no arquivo package.json um script chamado "build" e o executa.

--if-present: Este é um sinalizador opcional que faz com que o comando npm run build não falhe se não houver script "build" definido no arquivo package.json. Em vez disso, o npm simplesmente não faz nada. Sem o --if-present, se não houver script "build", o comando npm run build resultará em erro.

Portanto, essa etapa do fluxo de trabalho está usando o comando npm run build --if-present para criar uma versão de produção do aplicativo. Isso é muitas vezes necessário em aplicativos JavaScript modernos, onde o código-fonte é transformado (por exemplo, transpilado, minificado) para produzir um "bundle" final que pode ser executado no navegador. Este passo é especialmente importante para o processo de implantação, pois normalmente é o código de produção construído que é implantado em seu servidor de produção.

Claro, aqui está uma explicação detalhada dessa etapa:

- `- name: Deploy to S3`: O nome desta etapa é "Deploy to S3". Sua função é implementar o código do seu aplicativo no S3, um serviço de armazenamento de objetos oferecido pela Amazon Web Services (AWS).

- `uses: jakejarvis/s3-sync-action@master`: Esta linha indica que a etapa está usando uma ação do GitHub Actions chamada `s3-sync-action`, criada pelo usuário `jakejarvis`. Esta ação sincroniza seu diretório de trabalho ou build com um bucket S3 especificado, efetivamente fazendo o deploy do seu aplicativo para o S3. O termo `@master` indica que você está usando a versão mais recente desta ação na branch `master`.

- `with:`: Esta é uma palavra-chave no YAML que permite definir alguns parâmetros adicionais que você deseja passar para a ação `s3-sync-action`.

- `args: --acl public-read --follow-symlinks --delete`: Aqui estão os argumentos que você está passando para a ação. Esses argumentos alteram o comportamento da ação `s3-sync-action`:

  - `--acl public-read`: Este argumento configura a Lista de Controle de Acesso (ACL) para todos os objetos carregados como `public-read`, o que significa que qualquer pessoa na internet pode ler os objetos, mas não pode escrever ou modificar.

  - `--follow-symlinks`: Este argumento faz com que a ação siga os links simbólicos no diretório de origem.

  - `--delete`: Este argumento faz com que a ação delete os objetos no bucket S3 que não existem no diretório de origem. Isso é útil para manter seu bucket S3 em sincronia com seu diretório de origem.

Portanto, essa etapa está usando a ação `s3-sync-action` para fazer o deploy do seu aplicativo para o S3 com configurações específicas, como tornar os objetos publicamente legíveis, seguir links simbólicos e deletar objetos não presentes no diretório de origem.


env:: Esta seção define as variáveis de ambiente para a ação.

AWS_S3_BUCKET: cadastro-produtor-rural: Aqui você define a variável de ambiente AWS_S3_BUCKET para o nome do seu bucket S3, que é "cadastro-produtor-rural".

AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}: Aqui você define a variável de ambiente AWS_ACCESS_KEY_ID para o valor da chave de acesso da AWS, que é armazenada como um segredo em seu repositório do GitHub. O valor real dessa chave é ocultado e seguro.

AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}: Aqui você define a variável de ambiente AWS_SECRET_ACCESS_KEY para o valor da chave de acesso secreta da AWS, que é armazenada como um segredo em seu repositório do GitHub. O valor real dessa chave é ocultado e seguro.

AWS_REGION: ${{ secrets.AWS_REGION }}: Aqui você define a variável de ambiente AWS_REGION para o valor da região da AWS, que é armazenada como um segredo em seu repositório do GitHub. O valor real dessa região é ocultado e seguro.

SOURCE_DIR: 'dist/cadastro-produtor-rural': Aqui você define a variável de ambiente SOURCE_DIR para o caminho do diretório que você deseja sincronizar com o bucket S3. Nesse caso, o diretório é 'dist/cadastro-produtor-rural'.

### Resumo

No geral, este fluxo de trabalho faz checkout do seu código, configura o Node.js, instala dependências, cria um build de produção, lista alguns detalhes do sistema de arquivos e, em seguida, implanta o código no AWS S3.