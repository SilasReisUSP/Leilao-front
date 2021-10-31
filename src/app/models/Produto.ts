//Classe Produto utilizada para armazenamento dos dados do cadastro-produto e envio para o back
export class Produto{
    id: string;
    nome: string;
    localizacao: string;
    valorInicial: string;
    dataInicio: string;
    dataFinal: string;
    fotoLeilao: File;
    status: Number;
  }