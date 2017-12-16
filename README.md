# Scriptme
**Scriptme** é um aplicativo criado para substituir os rascunhos em papel que geralmente se leva para o púlpito em pregações (igreja) ou discursos em geral. Os tópicos ficam distribuidos em páginas diferentes, facilitando a leitura ao vivo.

É possível salvar ou carregar um **"script"** na "núvem" e, futuramente, **Scriptme** possibilitará distribuir os scripts para outras pessoas, armazenar em "librarys" (pacotes com vários scripts) e baixar de outras pessoas (como uma rede social).

Adicionar áudio, vídeo e imagens (como um PowerPoint), além da possíbilidade de projetar em tempo real em telão (ou outra midia), é uma das features que o **Scriptme** terá em breve.

**Para testar** acesse o site http://scriptme.tk com seu **smartphone**

Ou copie para seu computador local (com PHP instalado) e digite no terminal:

```
cd /diretorio/local/scritpme
php -S 0.0.0.0:80
```

Abra seu navegador e digite ```localhost``` ou acesse através do seu **smartphone** (preferencial) o seu computador (se estiver na mesma rede), digitando o **IP** (ex. ```http://192.168.0.120```).

---
![Screenshot 1](https://github.com/pedra/scriptme/raw/master/img/demo.jpg)


É possível fazer a navegação puxando a tela com o dedo (touch) para a direita (back) ou esquerda (next), além dos botão de navegação no topo da tela.


**Obs:** atualmente o sistema salva no arquivo ```/libs/page.scpt``` e, quando carrega, o faz de outro arquivo ```/libs/page_example.scpt```, para evitar sobrescrever os dados acidentalmente. Se desejar, modifique isso no arquivo ```/upload.php```.

---

**Att:** em desenvolvimento. Os recursos podem não funcionar corretamente e até provocar danos em seus "devices".
Teste por sua conta e risco!

Ajude a desenvolver - entre em contato pelo email prbr@ymail.com

**Att-2:** em breve será portado para Cordova e feito um "build" para Androi (apk), disponibilizado aqui.
