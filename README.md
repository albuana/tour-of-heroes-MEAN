<h2 align="center"> 
	 tour-of-heroes-angular 💻 DONE ✅
</h2>

<h2>MEAN Stack</h2>
<p>MEAN é um stack tecnológico que combina as componentes usadas nos dois exercícios anteriores para possibilitar o desenvolvimento de aplicações web.</p>
<p>Para completar a compreensão da componente do back-end, pode ser lido a <a href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms">parte 6 do tutorial</a> da MDN. A relevância deste tutorial não é aprenderem a criar forms, mas sim perceberem o que falta sobre a REST API que é criada em Express (perceber como se recebem pedidos para criação ou alteração de dados).</p>
<p>O conhecimento adquirido sobre Angular deverá ser suficiente para programarem o front-end. A única alteração que é necessário fazer relativamente ao tutorial, é passarem a usar a REST API servida no backend em vez da&nbsp;angular-in-memory-web-api que foi utilizada para simular um servidor.</p>
<h2>Preparação do Exercício</h2>
<ol>
<li>Completar o tutorial Local Library até ao final da parte 6</li>
</ol>
<h2>Exercício&nbsp;</h2>
<ul>
<li>1ª parte: Ligar o frontend "Tour of Heroes" construído no exercício 3, com o backend construído no exercício 4.
<ul>
<li>Remover o servidor "falso" do front-end: retirar do código angular o módulo in-memory-web-api e tudo o que fizesse uso desse código. Remover igualmente os ficheiros mock-heroes e mock-pets, caso ainda sejam usados.</li>
<li>Nos ficheiros hero.service.ts e pet.service.ts atualizar o url das chamadas para apontar para o endereço onde está o servidor node que desenvolveram no exercício 4</li>
<li><span style="font-size: 1rem;">Problema: </span><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" style="font-size: 1rem;">CORS</a><span style="font-size: 1rem;">: Cross-Origin Resource Sharing</span></li>
<ul>
<li>Quando testarem a ligação poderão reparar que o browser diz que não consegue processar respostas do vosso servidor node.</li>
<li>Os browsers têm mecanismos de defesa que tentam prevenir que uma página recebida de um endereço faça pedidos a outros endereços. (localhost:3000 e localhost:4200 são servidores diferentes da perspectiva do browser)&nbsp;</li>
<li>Para o vosso desenvolvimento podem ultrapassar esta questão no cliente ou no servidor:
<ul>
<li>No cliente: a solução é configurar um proxy para o Angular
<ul>
<li>Criar um ficheiro src/proxy.conf.json com o seguinte conteúdo
<ul>
<li>{<br>&nbsp; &nbsp; "/api/*": {<br>&nbsp; &nbsp; &nbsp; &nbsp; "target": "http://localhost:3000",<br>&nbsp; &nbsp; &nbsp; &nbsp; "secure": false,<br>&nbsp; &nbsp; &nbsp; &nbsp; "logLevel": "debug"<br>&nbsp; &nbsp; }<br>}</li>
<li>Este ficheiro redireciona todos os pedidos que façam na aplicação angular que comecem com /api para o endereço localhost:3000 (que deverá ser onde está a correr o servidor node). Adaptem o conteúdo do ficheiro se o servidor node estiver a correr noutro porto e se os vossos pedidos não começarem por /api</li>
</ul>
</li>
<li>Adicionar a proxyConfig ao angular.json
<ul>
<li>Abrir o ficheiro angular.json, encontrar a zona onde se definem as opções "options" para o modo "serve" e alterar da seguinte forma
<ul>
<li>"architect": {<br>&nbsp; &nbsp; "serve": {<br>&nbsp; &nbsp; &nbsp; &nbsp; "builder": "@angular-devkit/build-angular:dev-server",<br>&nbsp; &nbsp; &nbsp; &nbsp; "options": {<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "browserTarget": "your-application-name:build",<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "proxyConfig": "src/proxy.conf.json"<br>&nbsp; &nbsp; &nbsp; &nbsp; },</li>
</ul>
</li>
<li>Executar o servidor da mesma forma "ng serve --open". Se alterarem alguma coisa à configuração do proxy é necessário reiniciar o servidor.</li>
</ul>
</li>
</ul>
</li>
<li>No servidor: usar <a href="https://expressjs.com/en/resources/middleware/cors.html">middleware express para gerir cors</a>
<ul>
<li>Instalar o módulo: npm install cors</li>
<li>Usar o módulo no código<br>
<ul>
<li>var cors = require('cors')<br>var app = express()<br>app.use(cors())</li>
</ul>
</li>
<li>Do modo exemplificado acima todos os pedidos serão aceites, mas podem configurar a chamada ao cors() para se aplicar apenas a endereços específicos</li>
</ul>
</li>
</ul>
</li>
</ul>
<li>Atenção: Se os modelos no backend e frontend forem construídos com os mesmos campos (e nomes) a transição será pacífica. Mas há um pormenor que terá de ser adaptado ou tratado de outra forma: os identificadores dos objetos no MongoDB chamam-se _id (e não id como estava na solução Angular) e o seu tipo não é um número.</li>
<li><span style="font-size: 1rem;">Atenção que vão passar a ter 3 servidores a correr (1 servidor de base de dados, um servidor node a servir o back-end e um servidor angular). Provavelmente, os três servidores estarão a correr na mesma máquina, sendo distinguidos pelo porto em que escutam. Por isso, tenham atenção quando chamam um servidor para não se enganarem no porto.</span></li>
</ul>
</li>
<li><span style="font-size: 1rem;">2ª parte: Modificar o hero-details para passar a pedir uma foto do hero e passar a apresentar essa foto quando ela existe. A foto deve passar a ser guardada no backend (pode ser guardada na bd ou no sistema de ficheiros)</span></li>
<ul>
<li><span style="font-size: 1rem;">Há várias maneiras de enviar uma foto do cliente para o servidor. Vou mencionar duas:</span></li>
<ul>
<li><span style="font-size: 1rem;">Converter a imagem para base64 e tratá-la como um campo normal do modelo</span>
<ul>
<li><span style="font-size: 1rem;"><span style="font-size: 1rem;">No HTML incluir um campo input do tipo file. Quando esse campo é atualizado usar o event handler para aceder ao que foi carregado&nbsp;<br></span></span>
<div><span>const</span><span> </span>file<span> </span><span>=</span><span> (</span>event<span>.</span>target<span> </span><span>as</span><span> </span><span>HTMLInputElement</span><span>)</span><span>.</span>files<span>[</span><span>0</span><span>]</span><span>;</span><br>e depois criar um objeto reader para ler a image para base 64<br>const Reader = new FileReader();<br>reader.readAsDataURL(file);<br>Não esquecer usar o callback deste método para atribuir o resultado a uma propriedade do hero<br>this.hero.image = reader.result as string;</div>
</li>
<li>Nesta solução a imagem fica guardada na base de dados</li>
</ul>
</li>
<li>Usar o módulo multer no express para receber a imagem&nbsp;</li>
<ul>
<li>Podem consultar um tutorial/exemplo em&nbsp;<a href="https://saikiran1298.medium.com/uploading-an-image-using-multer-in-nodejs-and-angular-project-4d32b60e602e%20">https://saikiran1298.medium.com/uploading-an-image-using-multer-in-nodejs-and-angular-project-4d32b60e602e&nbsp;</a></li>
<li>Nesta solução a imagem fica no sistema de ficheiros do servidor de backend e a base de dados guarda a sua localização. Devem garantir que o URL onde a imagem é guardada é público (i.e. que o cliente depois consegue ter acesso a esse ULR - um projeto node tipicamente cria logo uma zona para armazenar recursos públicos, que é o onde devem guardar a imagem)</li>
</ul>
</ul>
</ul>
</ul>

## Como correr o exercicio?
- Abrir um terminal na pasta ```backend/``` e executar o comando npm install;
- Nessa mesma pasta fazer npm run tp5;
- Abrir um terminal na pasta ```frontend/``` e executar o comando npm install;
- Nessa mesma pasta fazer ng serve;
- Abrir o browser o http://localhost:4200/ indicado pela consola.
