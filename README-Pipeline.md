### Criando usuário no IAM e configurando as permissões para gravação no S3

Para criar um usuário na AWS e fornecer permissões para gravar no S3, você pode usar o serviço IAM (Identity and Access Management) da AWS. Aqui estão as etapas para fazer isso:

1. Faça login no console de gerenciamento da AWS e navegue até o serviço IAM.

2. No painel de navegação esquerdo, clique em "Users" (Usuários).

3. Clique no botão "Add user" (Adicionar usuário).

4. Insira um nome de usuário e selecione a opção "Programmatic access" (Acesso programático) e clique em "Next: Permissions" (Próximo: Permissões).

5. Na página de permissões, você tem várias opções. Para dar a este usuário acesso ao S3, você pode:

   - Anexar políticas diretamente: Pesquise por "S3" e selecione a política chamada "AmazonS3FullAccess" se desejar conceder acesso total ao S3 para esse usuário. Se desejar conceder apenas acesso de gravação, talvez seja necessário criar uma política personalizada.

   - Adicionar o usuário a um grupo: Se você já tem um grupo com as políticas do S3 anexadas, pode adicionar o usuário a esse grupo.

6. Clique em "Next: Tags" (Próximo: Tags). Aqui, você pode adicionar tags ao usuário se desejar, mas isso é opcional. Clique em "Next: Review" (Próximo: Revisar).

7. Revise as configurações do usuário. Se tudo estiver correto, clique em "Create user" (Criar usuário).

8. Na página final, você verá os detalhes de "Access key ID" e "Secret access key" para o usuário. Certifique-se de anotar esses valores ou baixar o arquivo .csv, pois você não poderá recuperar a chave de acesso secreta novamente.

Depois de seguir estas etapas, você terá um usuário IAM com as permissões adequadas para gravar no S3. Você pode usar a ID da chave de acesso e a chave de acesso secreta desse usuário para autenticar o usuário no S3. Lembre-se de tratar essas chaves como informações sensíveis e não as compartilhe ou publique. 

Importante: essa configuração fornece permissão completa de S3 ao usuário. Em um ambiente de produção, você deve criar uma política que conceda apenas as permissões mínimas necessárias ao usuário para reduzir o risco de segurança.

### Configurando as chaves aws como variáveis de ambiente

As variáveis de ambiente na AWS, como `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` e `AWS_REGION`, são geralmente armazenadas como segredos em seu repositório do GitHub. Aqui estão os passos para configurar essas variáveis no GitHub Actions:

1. Navegue até o repositório GitHub onde você deseja configurar as variáveis de ambiente.

2. Clique na guia "Settings" (Configurações).

3. No menu à esquerda, clique em "Secrets" (Segredos).

4. Clique no botão "New repository secret" (Novo segredo do repositório).

5. Insira o nome do segredo no campo "Name" (Nome). O nome do segredo deve corresponder à variável de ambiente que você está tentando definir, por exemplo, `AWS_ACCESS_KEY_ID`.

6. Insira o valor correspondente no campo "Value" (Valor). Certifique-se de que este valor seja a chave de acesso da AWS para `AWS_ACCESS_KEY_ID` ou a chave de acesso secreta da AWS para `AWS_SECRET_ACCESS_KEY`. Para a `AWS_REGION`, o valor será a região AWS desejada, como `us-east-1`.

7. Clique no botão "Add secret" (Adicionar segredo) para salvar a variável.

Repita esses passos para cada uma das variáveis de ambiente necessárias (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`).

Agora, quando você definir essas variáveis em seu arquivo de configuração do GitHub Actions (como `AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}`), o GitHub substituirá automaticamente `secrets.AWS_ACCESS_KEY_ID` pelo valor do segredo que você definiu. Este valor estará disponível para as etapas do seu workflow como uma variável de ambiente, mas o valor real da chave será ocultado nos logs para manter a segurança.

Lembre-se, nunca compartilhe suas chaves de acesso AWS publicamente, e não as inclua diretamente nos seus arquivos de script ou de configuração. Sempre use segredos ou outras formas seguras de gerenciamento de segredos para lidar com essas informações sensíveis.



### Descrição da Configuração do Bucket S3

Para tornar seu bucket do S3 hospedado na web, siga as etapas abaixo:

**Nota:** Antes de começar, certifique-se de que você já carregou seu conteúdo estático para o bucket do S3.

1. Faça login na AWS Management Console e abra o serviço Amazon S3.

2. Na lista de buckets, escolha o bucket que você deseja usar para hospedar um site estático.

3. Escolha a guia "Propriedades".

4. Role para baixo até "Configurações de hospedagem de site estático" e clique em "Editar".

5. Marque a opção "Habilitar" para ativar a hospedagem de site estático.

6. No campo "Documento de índice", insira o nome do arquivo HTML que você deseja usar como página inicial para seu site (normalmente, este arquivo é chamado `index.html`).

7. (Opcional) No campo "Documento de erro", insira o nome do arquivo HTML que você deseja usar quando um erro 4xx é retornado (por exemplo, `error.html`).

8. (Opcional) Se quiser, você pode inserir um caminho de Redirecionamento para o bucket no campo correspondente.

9. Clique em "Salvar mudanças".

Depois de habilitar a hospedagem de site estático, você pode acessar o site usando a URL do endpoint do site. O formato do URL do endpoint do site é http://nome_do_bucket.s3-website-região.amazonaws.com. Por exemplo, se o nome do seu bucket é `meu-site-exemplo` e ele está na região `us-west-2`, o URL do site seria `http://meu-site-exemplo.s3-website-us-west-2.amazonaws.com`.

Lembre-se de que se você quiser que seu conteúdo seja acessível publicamente, você precisa definir as permissões de bucket e/ou objeto corretamente. Você pode usar a política de bucket ou as ACLs do objeto para fazer isso.



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


- `env`:: Esta seção define as variáveis de ambiente para a ação.

  - `AWS_S3_BUCKET`: cadastro-produtor-rural: Aqui você define a variável de ambiente AWS_S3_BUCKET para o nome do seu bucket S3, que é "cadastro-produtor-rural".

  - `AWS_ACCESS_KEY_ID `: ${{ secrets.AWS_ACCESS_KEY_ID }}: Aqui você define a variável de ambiente AWS_ACCESS_KEY_ID para o valor da chave de acesso da AWS, que é armazenada como um segredo em seu repositório do GitHub. O valor real dessa chave é ocultado e seguro.

  - `AWS_SECRET_ACCESS_KEY `: ${{ secrets.AWS_SECRET_ACCESS_KEY }}: Aqui você define a variável de ambiente AWS_SECRET_ACCESS_KEY para o valor da chave de acesso secreta da AWS, que é armazenada como um segredo em seu repositório do GitHub. O valor real dessa chave é ocultado e seguro.

  - `AWS_REGION`: ${{ secrets.AWS_REGION }}: Aqui você define a variável de ambiente AWS_REGION para o valor da região da AWS, que é armazenada como um segredo em seu repositório do GitHub. O valor real dessa região é ocultado e seguro.

  - `SOURCE_DIR`: 'dist/cadastro-produtor-rural': Aqui você define a variável de ambiente SOURCE_DIR para o caminho do diretório que você deseja sincronizar com o bucket S3. Nesse caso, o diretório é 'dist/cadastro-produtor-rural'.

### Resumo

No geral, este fluxo de trabalho faz checkout do seu código, configura o Node.js, instala dependências, cria um build de produção, lista alguns detalhes do sistema de arquivos e, em seguida, implanta o código no AWS S3.